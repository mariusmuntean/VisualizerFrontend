import { useEffect, useMemo, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { Button, Col, Row, Spin, Table } from 'antd'
import { DownloadOutlined, StopOutlined } from '@ant-design/icons'
import ReactWordcloud, { CallbacksProp, OptionsProp } from 'react-wordcloud'

import { useGetHashtagsQuery, useHastagAddedSubscription, useRankedHashtagsChangedSubscription, VisualizerQuery } from '../../generated/graphql'
import { HashtagSubscription } from './subscriptions'
import { startStreaming, stopStreaming } from '../../infrastructure/api/testApi'
import { ColumnType } from 'antd/lib/table'

interface Word {
    text: string
    value: number
}

export const LiveRankedHashtags = () => {
    const { loading: loadingHashtags, data: hashtagsData } = useGetHashtagsQuery({ variables: { amount: 50 } })
    const { loading: loadingRankedHashtagsChanged, data: rankedHashtagsChanged } = useRankedHashtagsChangedSubscription({ variables: { amount: 50 } })
    const [wordCloudData, setWordCloudData] = useState<Word[]>([])

    // ToDo: add buttons to start and stop streamming
    // ToDo: show ranked list of hashtag names and scores
    // ToDo: throttle the updates somehow. The wordcloud is to active.

    useEffect(() => {
        if (loadingHashtags) {
            return
        }

        // map hashtags to Word[]
        let words =
            hashtagsData?.hashtag?.topHashtags?.map((h) => {
                const w: Word = { text: h?.name!, value: h?.score }
                return w
            }) ?? []

        setWordCloudData(words)
    }, [hashtagsData?.hashtag?.topHashtags])

    useEffect(() => {
        if (loadingHashtags || loadingRankedHashtagsChanged || wordCloudData.length < 1) {
            return
        }

        // map hashtags to Word[]
        const newWords: Word[] =
            rankedHashtagsChanged?.rankedHashtagsChanged?.map((rh) => ({
                text: rh?.name!,
                value: rh?.score,
            })) ?? []
        setWordCloudData([...newWords])
    }, [rankedHashtagsChanged?.rankedHashtagsChanged])

    if (loadingHashtags) {
        return <Spin size="default"></Spin>
    }

    const options: OptionsProp = {
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        enableTooltip: true,
        deterministic: true,
        randomSeed: 'dgfwrhrh',
        fontFamily: 'impact',
        fontSizes: [12, 60],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 1,
        rotations: 1,
        rotationAngles: [0, 90],
        scale: 'log',
        spiral: 'archimedean',
        transitionDuration: 500,
        enableOptimizations: true,
    }
    const size: [number, number] = [1000, 700]

    const columns: ColumnType<Word>[] = [
        {
            title: 'Hashtag',
            render: (val, record) => record.text,
        },
        {
            title: 'Rank',
            render: (val, record) => record.value,
        },
    ]

    const wordcloudCallbacks: CallbacksProp = {
        getWordTooltip: (w: Word) => `hashtag appears ${w.value} time(s)`,
    }

    return (
        <>
            <Row>
                <Col span={6}></Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" danger icon={<DownloadOutlined />} size={'large'} onClick={startStreaming}>
                        Start Streaming
                    </Button>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" icon={<StopOutlined />} size={'large'} onClick={stopStreaming}>
                        Stop Streaming
                    </Button>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Row justify="center" align="top">
                <Col span={4}>
                    <Table
                        dataSource={[
                            ...wordCloudData.sort(function (a, b) {
                                return b.value - a.value
                            }),
                        ]}
                        columns={columns}
                        rowKey={(r) => r.text}
                    ></Table>
                </Col>
                <Col span={20} style={{ padding: '2em' }}>
                    <ReactWordcloud words={wordCloudData} options={options} callbacks={wordcloudCallbacks} />
                </Col>
            </Row>
        </>
    )
}
