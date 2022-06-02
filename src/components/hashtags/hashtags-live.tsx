import { useMemo } from 'react'
import { useSubscription } from '@apollo/client'
import { Button, Col, Row, Spin } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import ReactWordcloud, { OptionsProp } from 'react-wordcloud'

import { useGetHashtagsQuery, useHastagAddedSubscription, VisualizerQuery } from '../../generated/graphql'
import { HashtagSubscription } from './subscriptions'
import { startStreaming, stopStreaming } from '../../infrastructure/api/testApi'

interface Word {
    text: string
    value: number
}

export const HashtagsLive = () => {
    const { loading: loadingHashtags, data: hashtagsData } = useGetHashtagsQuery({ variables: { amount: 120 } })
    const { loading: loadingHashtagAdded, data: hashtagAddedData } = useHastagAddedSubscription()

    // ToDo: add buttons to start and stop streamming
    // ToDo: show ranked list of hashtag names and scores
    // ToDo: throttle the updates somehow. The wordcloud is to active.

    const wordCloudData = useMemo(() => {
        if (loadingHashtags || loadingHashtagAdded) {
            return []
        }

        // map hashtags to Word[]
        let words =
            hashtagsData?.hashtag?.topHashtags?.map((h) => {
                const w: Word = { text: h?.name!, value: h?.score }
                return w
            }) ?? []

        // Add new hashtags to the Word[]
        const newHashtag = hashtagAddedData?.hashtagAdded
        if (!newHashtag) {
            return words
        }
        const newHashtagIndex = words.findIndex((w) => w.text === newHashtag?.name)
        if (newHashtagIndex === -1) {
            words = [...words, { text: newHashtag.name!, value: newHashtag.score }]
        } else {
            const currentWord = words[newHashtagIndex]
            currentWord.value = currentWord.value + 1
            words[newHashtagIndex] = currentWord
        }
        return words
    }, [hashtagsData?.hashtag?.topHashtags, hashtagAddedData?.hashtagAdded?.name, hashtagAddedData?.hashtagAdded?.score])

    if (loadingHashtags || loadingHashtagAdded) {
        return <Spin size="default"></Spin>
    }

    const options: OptionsProp = {
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        enableTooltip: true,
        deterministic: false,
        fontFamily: 'impact',
        fontSizes: [5, 60],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: 'sqrt',
        spiral: 'archimedean',
        transitionDuration: 1000,
    }
    const size: [number, number] = [900, 600]

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
                    <Button type="primary" icon={<DownloadOutlined />} size={'large'} onClick={stopStreaming}>
                        Stop Streaming
                    </Button>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <ReactWordcloud words={wordCloudData} options={options} />
                </Col>
            </Row>
        </>
    )
}
