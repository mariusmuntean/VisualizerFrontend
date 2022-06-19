import { Alert, Spin } from 'antd'
import { useState } from 'react'
import { VisNetwork } from './vis-network'

import { useGetGraphResultsQuery } from '../../generated/graphql'
import { Data, Options } from 'vis-network'

export const Social = () => {
    const [authorUsername, setAuthorUserName] = useState<string | undefined>(undefined)
    const [mentionedUsername, setMentionedUserName] = useState<string | undefined>(undefined)

    const result = useGetGraphResultsQuery({ variables: { amount: 250 } })

    if (result.error) {
        return <Alert type="error" message={result.error.message} />
    }

    if (result.loading) {
        return <Spin></Spin>
    }

    if (result.data?.graphResult?.graphResults) {
        const graphData: Data = {
            nodes:
                result.data.graphResult.graphResults.nodes?.map((userNode) => ({ id: userNode?.userId, label: userNode?.userName ?? '', title: userNode?.userName ?? '' })) ?? [],
            edges: result.data.graphResult.graphResults.edges?.map((relationship) => ({ from: relationship?.fromUserId, to: relationship?.toUserId })) ?? [],
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

        return <VisNetwork data={graphData} options={options} style={{ height: '64em' }} />
    }

    return <div>social</div>
}
