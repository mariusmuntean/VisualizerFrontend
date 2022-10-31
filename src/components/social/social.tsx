import { Alert, Button, Col, Input, InputNumber, List, notification, Row, Spin } from 'antd'
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons'
import { useEffect, useMemo } from 'react'
import { VisNetwork } from './vis-network'
import { Data, Options, Node } from 'vis-network'

import { MentionRelationshipType, useGetMentionsQuery, useGetUserCountQuery } from '../../generated/graphql'
import { useNumberUrlState, useUrlState } from '../hooks/urlState'

export const Social = () => {
    const [authorUsername, setAuthorUserName] = useUrlState('authorUsername', undefined)
    const [mentionedUsername, setMentionedUserName] = useUrlState('mentionedUsername', undefined)
    const [minHops, setMinHops] = useNumberUrlState('minHops', 1)
    const [maxHops, setMaxHops] = useNumberUrlState('maxHops', 5)
    const [limit, setLimit] = useNumberUrlState('limit', 550)

    const userCountResult = useGetUserCountQuery({ fetchPolicy: 'network-only' })
    const mentionsResult = useGetMentionsQuery({ variables: { filter: { amount: limit } }, fetchPolicy: 'no-cache' })

    useEffect(() => {
        mentionsResult.refetch({
            filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: limit, minHops: minHops, maxHops: maxHops },
        })
    }, [authorUsername, mentionedUsername, minHops, maxHops, limit])

    const reload = async () => {
        await mentionsResult.refetch({
            filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: limit, minHops: minHops, maxHops: maxHops },
        })
    }

    const graphData = useMemo(() => {
        if (!mentionsResult.data?.graphResult?.mentions) {
            return undefined
        }

        const newGraphData: Data = {
            nodes:
                mentionsResult.data.graphResult.mentions.nodes?.map((userNode) => ({
                    id: userNode?.userId,
                    label: userNode?.userName ?? '',
                    title: userNode?.userName ?? '',
                    color: userNode?.userName === authorUsername ? '#4285F4' : userNode?.userName === mentionedUsername ? '#34A853' : undefined,
                })) ?? [],
            edges:
                mentionsResult.data.graphResult.mentions.edges
                    ?.filter((relationship) => relationship?.relationshipType === MentionRelationshipType.Mentioned)
                    ?.map((relationship) => ({
                        from: relationship?.fromUserId,
                        to: relationship?.toUserId,
                        color: relationship?.relationshipType === MentionRelationshipType.Mentioned ? 'red' : 'blue',
                    })) ?? [],
        }

        return newGraphData
    }, [mentionsResult.data?.graphResult?.mentions])

    const options = useMemo<Options>(() => {
        return {
            autoResize: true,
            physics: { stabilization: { enabled: false } },
            layout: {
                improvedLayout: false,
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
        if (userId && mentionsResult?.data?.graphResult?.mentions?.nodes) {
            const node = mentionsResult?.data?.graphResult?.mentions?.nodes.find((node) => node?.userId === userId)
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
                <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <Input addonBefore="Mentioned" defaultValue={undefined} value={mentionedUsername} allowClear onChange={(e) => setMentionedUserName(e.target.value)} size="large" />
                </Col>
                <Col span={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <InputNumber min={1} max={100000} size="middle" addonBefore={'Limit'} value={limit} onChange={(newVal) => setLimit(newVal)}></InputNumber>
                </Col>
                <Col span={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                    <Button onClick={reload} icon={<ReloadOutlined />}>
                        Reload
                    </Button>
                </Col>
            </Row>
            <Row style={{ height: 'auto' }} justify="center" align="middle" gutter={[10, 20]}>
                <Col>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
                        <span>{`Total user count: ${userCountResult?.data?.graphResult?.userCount}`}</span>
                        <span>{`Query duration: ${mentionsResult.data?.graphResult?.mentions?.statistics?.queryInternalExecutionTime}`}</span>
                    </div>
                </Col>
            </Row>
            <Row style={{ height: '100%' }} justify="center" align="middle" gutter={[10, 20]}>
                <Col span={20}>
                    {mentionsResult.error && <Alert type="error" message={mentionsResult.error?.graphQLErrors.map((gqlErr) => gqlErr.message)} closable />}
                    {mentionsResult.loading && <Spin></Spin>}

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
