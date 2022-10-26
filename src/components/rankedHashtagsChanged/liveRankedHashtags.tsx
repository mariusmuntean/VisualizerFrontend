import { useCallback, useEffect, useState } from 'react'
import { Col, Input, notification, Row, Space, Spin, Table } from 'antd'
import ReactWordcloud, { CallbacksProp, OptionsProp, Word } from 'react-wordcloud'
import { debounce, toNumber } from 'lodash'

import { useGetHashtagsQuery, useTopRankedHashtagsChangedSubscription } from '../../generated/graphql'
import { ColumnType } from 'antd/lib/table'
import { useSearchParams } from 'react-router-dom'

export const LiveRankedHashtags = () => {
    // Extract the amount of top hashtags to subscribe to
    const [searchparams, setSearchParams] = useSearchParams()
    const topHashtagAmount = searchparams.has('topHashtagAmount') ? parseInt(searchparams.get('topHashtagAmount')!, 10) : 50

    // Persist the amount of top hashtags to the URL (necessary if the default was used)
    useEffect(() => setSearchParams({ topHashtagAmount: topHashtagAmount.toString() }), [])

    // Get the top hashtags from the database
    const { loading: loadingHashtags, data: hashtagsData } = useGetHashtagsQuery({ variables: { amount: topHashtagAmount } })

    // Subscribe to the top hashtags
    const { loading: loadingRankedHashtagsChanged, data: rankedHashtagsChanged } = useTopRankedHashtagsChangedSubscription({
        variables: { amount: topHashtagAmount },
        fetchPolicy: 'network-only',
    })

    const [wordCloudData, setWordCloudData] = useState<Word[]>([])

    const setTopHashtagAmountDebounced = useCallback(
        debounce((newTopHashtagAmount: number) => setSearchParams({ topHashtagAmount: newTopHashtagAmount.toString() }), 400),
        [setSearchParams]
    )

    useEffect(() => {
        if (loadingHashtags) {
            return
        }

        // map hashtags to Word[]
        let words =
            hashtagsData?.hashtag?.topRankedHashtags?.map((h) => {
                const w: Word = { text: h?.name!, value: h?.rank }
                return w
            }) ?? []

        setWordCloudData(words)
    }, [hashtagsData?.hashtag?.topRankedHashtags])

    useEffect(() => {
        if (loadingHashtags || loadingRankedHashtagsChanged) {
            return
        }

        // map hashtags to Word[]
        const newWords: Word[] =
            rankedHashtagsChanged?.topRankedHashtags?.map((rh) => ({
                text: rh?.name!,
                value: rh?.rank,
            })) ?? []
        setWordCloudData([...newWords])
        console.log(new Date().toTimeString())
    }, [rankedHashtagsChanged?.topRankedHashtags])

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
        rotations: 3,
        rotationAngles: [-90, 90],
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
        onWordClick: async (word, event) => {
            await navigator.clipboard.writeText(word.text)
            notification.success({ message: `Copied ${word.text} to clipboard` })
        },
    }

    return (
        <>
            <Row justify="center" align="middle">
                <Col span={24}>
                    <div style={{ margin: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Space direction="vertical">
                            <Input autoFocus addonBefore="Top" addonAfter="hashtags" defaultValue={topHashtagAmount} onChange={(e) => setTopHashtagAmountDebounced(toNumber(e.target.value))} />
                        </Space>
                    </div>
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={4}>
                    <Table
                        size="small"
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
                    <ReactWordcloud words={wordCloudData} options={options} callbacks={wordcloudCallbacks} maxWords={300} />
                </Col>
            </Row>
        </>
    )
}
