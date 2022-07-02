import { Alert, Button, Col, Input, InputNumber, List, notification, Row, Spin } from 'antd'
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { VisNetwork } from './vis-network'
import { Data, Options, Node } from 'vis-network'

import { MentionRelationshipType, useGetMentionsQuery } from '../../generated/graphql'

export const Social = () => {
    const [authorUsername, setAuthorUserName] = useState<string | undefined>(undefined)
    const [mentionedUsername, setMentionedUserName] = useState<string | undefined>(undefined)
    const [minHops, setMinHops] = useState<number>(1)
    const [maxHops, setMaxHops] = useState<number>(5)

    const result = useGetMentionsQuery({ variables: { filter: { amount: 550 } }, fetchPolicy: 'no-cache' })

    useEffect(() => {
        result.refetch({
            filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: 2000, minHops: minHops, maxHops: maxHops },
        })
    }, [authorUsername, mentionedUsername, minHops, maxHops])

    const reload = async () => {
        await result.refetch({
            filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: 2000, minHops: minHops, maxHops: maxHops },
        })
    }

    const graphData = useMemo(() => {
        if (!result.data?.graphResult?.mentions) {
            return undefined
        }

        const newGraphData: Data = {
            nodes:
                result.data.graphResult.mentions.nodes?.map((userNode) => ({
                    id: userNode?.userId,
                    label: userNode?.userName ?? '',
                    title: userNode?.userName ?? '',
                    color: userNode?.userName === authorUsername ? '#4285F4' : userNode?.userName === mentionedUsername ? '#34A853' : undefined,
                })) ?? [],
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
            autoResize: true,
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

    const onNodeSelect = async (params: any) => {
        const userId = (params.nodes as Node[])?.[0]
        if (userId && result?.data?.graphResult?.mentions?.nodes) {
            const node = result?.data?.graphResult?.mentions?.nodes.find((node) => node?.userId === userId)
            if (node) {
                await navigator.clipboard.writeText(node.userName!)
                notification.info({ message: 'Copied ' + node.userName + ' to clipboard', duration: 3 })
            }
        }
    }

    return (
        <>
            <Row justify="center" align="middle" gutter={[10, 20]}>
                <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <Input addonBefore="Author" defaultValue={undefined} value={authorUsername} allowClear onChange={(e) => setAuthorUserName(e.target.value)} size="large" />
                </Col>
                <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.1em' }}>
                        <ArrowRightOutlined />
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.2em' }}>
                            <InputNumber min={1} max={100} size="small" addonBefore={'MinHops'} value={minHops} onChange={(newVal) => setMinHops(newVal)}></InputNumber>
                            <InputNumber min={1} max={100} size="small" addonBefore={'MaxHops'} value={maxHops} onChange={(newVal) => setMaxHops(newVal)}></InputNumber>
                        </div>
                    </div>
                </Col>
                <Col span={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <Input
                        addonBefore="Mentioned"
                        defaultValue={undefined}
                        value={mentionedUsername}
                        allowClear
                        onChange={(e) => setMentionedUserName(e.target.value)}
                        size="large"
                    />
                    <Button onClick={reload} icon={<ReloadOutlined />}>
                        Reload
                    </Button>
                </Col>
            </Row>
            <Row style={{ height: 'auto' }} justify="center" align="middle" gutter={[10, 20]}>
                <Col>
                    <span>{result.data?.graphResult?.mentions?.statistics?.queryInternalExecutionTime}</span>
                </Col>
            </Row>
            <Row style={{ height: '100%' }} justify="center" align="middle" gutter={[10, 20]}>
                <Col span={20}>
                    {result.error && <Alert type="error" message={result.error?.graphQLErrors.map((gqlErr) => gqlErr.message)} closable />}
                    {result.loading && <Spin></Spin>}

                    {graphData && <VisNetwork data={graphData} options={options} onNodeSelect={onNodeSelect} style={{ height: '80vh' }} />}
                </Col>
                <Col span={4}>
                    <List
                        bordered
                        size="small"
                        dataSource={(graphData?.nodes as Node[]) || []}
                        pagination={{
                            defaultPageSize: 10,
                            hideOnSinglePage: true,
                            pageSizeOptions: [5, 10, 20, 50, 100],
                            size: 'small',
                            showTotal: (total: number, range: [number, number]) => `Total ${total}`,
                        }}
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
