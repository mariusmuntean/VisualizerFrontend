import { Alert, Button, Col, Input, Row, Spin } from 'antd'
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { VisNetwork } from './vis-network'

import { MentionRelationshipType, useGetGraphResultsQuery, useGetMentionsQuery } from '../../generated/graphql'
import { Data, Options } from 'vis-network'

export const Social = () => {
    const [authorUsername, setAuthorUserName] = useState<string | undefined>(undefined)
    const [mentionedUsername, setMentionedUserName] = useState<string | undefined>(undefined)

    const result = useGetMentionsQuery({ variables: { filter: { amount: 550 } }, fetchPolicy: 'no-cache' })

    useEffect(() => {
        result.refetch({ filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: 1000 } })
    }, [authorUsername, mentionedUsername])

    const reload = () => {
        result.refetch({ filter: { authorUserName: authorUsername, mentionedUserNames: mentionedUsername ? [mentionedUsername] : undefined, amount: 1000 } })
    }

    if (result.error) {
        return <Alert type="error" message={result.error.message} />
    }

    if (result.loading) {
        return <Spin></Spin>
    }

    if (result.data?.graphResult?.mentions) {
        // ToDo: request users that initiated a discussion or that were mentioned in a discussion.

        const graphData: Data = {
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

        const options: Options = {
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

        return (
            <>
                <Row justify="center" align="middle">
                    <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                        <Input autoFocus addonBefore="Author" defaultValue={undefined} onChange={(e) => setAuthorUserName(e.target.value)} />
                        <ArrowRightOutlined />
                        <Input autoFocus addonBefore="Mentioned" defaultValue={undefined} onChange={(e) => setMentionedUserName(e.target.value)} />
                        <Button onClick={reload} icon={<ReloadOutlined />}>
                            Reload
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <VisNetwork data={graphData} options={options} style={{ height: '64em' }} />
                    </Col>
                </Row>
            </>
        )
    }

    return <div>social</div>
}
