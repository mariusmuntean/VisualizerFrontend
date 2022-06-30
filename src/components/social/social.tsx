import { Alert, Button, Col, Input, InputNumber, List, Row, Spin } from 'antd'
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { VisNetwork } from './vis-network'
import { Data, Options, Node } from 'vis-network'

import { MentionRelationshipType, useGetGraphResultsQuery, useGetMentionsQuery } from '../../generated/graphql'

export const Social = () => {
    const [authorUsername, setAuthorUserName] = useState<string | undefined>(undefined)
    const [mentionedUsername, setMentionedUserName] = useState<string | undefined>(undefined)
    const [maxHops, setMaxHops] = useState<number>(5)

    const result = useGetMentionsQuery({ variables: { filter: { amount: 550 } }, fetchPolicy: 'no-cache' })

    useEffect(() => {
        result.refetch({
            filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: 1000, minHops: 1, maxHops: maxHops },
        })
    }, [authorUsername, mentionedUsername, maxHops])

    const reload = async () => {
        await result.refetch({
            filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: 1000, minHops: 1, maxHops: maxHops },
        })
    }

    const graphData = useMemo(() => {
        if (!result.data?.graphResult?.mentions) {
            return undefined
        }

        const newGraphData: Data = {
            nodes: result.data.graphResult.mentions.nodes?.map((userNode) => ({ id: userNode?.userId, label: userNode?.userName ?? '', title: userNode?.userName ?? '' })) ?? [],
            edges:
                result.data.graphResult.mentions.edges
                    ?.filter((relationship) => relationship?.relationshipType === MentionRelationshipType.Mentioned)
                    ?.map((relationship) => ({
                        from: relationship?.fromUserId,
                        to: relationship?.toUserId,
                        color: relationship?.relationshipType === MentionRelationshipType.Mentioned ? 'red' : 'blue',
                    })) ?? [],
        }

        return newGraphData
    }, [result.data?.graphResult?.mentions])

    const options = useMemo<Options>(() => {
        return {
            autoResize: false,
            physics: { stabilization: { enabled: false } },
            layout: {
                improvedLayout: true,
            },
            edges: {
                smooth: false,
                color: '#000000',
                width: 0.5,
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5,
                    },
                },
            },
        }
    }, [])

    return (
        <>
            <Row justify="center" align="middle">
                <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <Input addonBefore="Author" defaultValue={undefined} value={authorUsername} onChange={(e) => setAuthorUserName(e.target.value)} size="large" />
                    <div style={{ width: '22em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.1em' }}>
                        <ArrowRightOutlined />
                        <InputNumber min={1} max={100} size="small" addonBefore={'Hops'} value={maxHops} onChange={(newVal) => setMaxHops(newVal)}></InputNumber>
                    </div>
                    <Input addonBefore="Mentioned" defaultValue={undefined} value={mentionedUsername} onChange={(e) => setMentionedUserName(e.target.value)} size="large" />
                    <Button onClick={reload} icon={<ReloadOutlined />}>
                        Reload
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={20}>
                    {result.error && <Alert type="error" message={result.error?.message} />}
                    {result.loading && <Spin></Spin>}

                    {graphData && <VisNetwork data={graphData} options={options} style={{ height: '64em' }} />}
                </Col>
                <Col span={4}>
                    <List
                        bordered
                        size="small"
                        dataSource={(graphData?.nodes as Node[]) || []}
                        pagination={{ pageSize: 10 }}
                        header={
                            <div>
                                <b>Users</b>
                            </div>
                        }
                        renderItem={(item) => <List.Item>{item.label}</List.Item>}
                    ></List>
                </Col>
            </Row>
        </>
    )
}
