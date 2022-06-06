import { useEffect, useState } from 'react'
import { Col, Row, Spin, Table } from 'antd'
import ReactWordcloud, { CallbacksProp, OptionsProp } from 'react-wordcloud'

import { useGetHashtagsQuery, useHastagAddedSubscription } from '../../generated/graphql'
import { ColumnType } from 'antd/lib/table'

interface Word {
    text: string
    value: number
}

export const LiveHashtagAdded = () => {
    const [topHashtagAmount, setTopHashtagAmount] = useState(50)
    const { loading: loadingHashtags, data: hashtagsData } = useGetHashtagsQuery({ variables: { amount: topHashtagAmount } })
    const { loading: loadingHashtagAdded, data: hashtagAddedData } = useHastagAddedSubscription()

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
        if (loadingHashtags || loadingHashtagAdded || wordCloudData.length < 1) {
            return
        }

        // map hashtags to Word[]
        let words = wordCloudData

        // Add new hashtags to the Word[]
        const newHashtag = hashtagAddedData?.hashtagAdded
        if (!newHashtag) {
            return
        }
        const newHashtagIndex = words.findIndex((w) => w.text === newHashtag?.name)
        if (newHashtagIndex === -1) {
            words = [...words, { text: newHashtag.name!, value: newHashtag.score }]
        } else {
            const currentWord = words[newHashtagIndex]
            currentWord.value = newHashtag.score
            words[newHashtagIndex] = currentWord
        }

        setWordCloudData([...words])
    }, [hashtagAddedData?.hashtagAdded?.name, hashtagAddedData?.hashtagAdded?.score])

    if (loadingHashtags) {
        return <Spin size="default"></Spin>
    }

    const options: OptionsProp = {
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        enableTooltip: true,
        deterministic: true,
        randomSeed: 'dgfwrhrh',
        fontFamily: 'impact',
        fontSizes: [10, 55],
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
                <Col span={20}>
                    <ReactWordcloud words={wordCloudData} options={options} callbacks={wordcloudCallbacks} />
                </Col>
            </Row>
        </>
    )
}
