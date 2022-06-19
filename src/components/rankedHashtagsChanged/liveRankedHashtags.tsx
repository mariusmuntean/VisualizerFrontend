import { useCallback, useEffect, useState } from 'react'
import { Button, Col, Input, Row, Space, Spin, Table } from 'antd'
import ReactWordcloud, { CallbacksProp, OptionsProp, Word } from 'react-wordcloud'
import { debounce, toNumber } from 'lodash'

import { useGetHashtagsQuery, useRankedHashtagsChangedSubscription } from '../../generated/graphql'
import { ColumnType } from 'antd/lib/table'

export const LiveRankedHashtags = () => {
    const [topHashtagAmount, setTopHashtagAmount] = useState<number>(50)
    const { loading: loadingHashtags, data: hashtagsData } = useGetHashtagsQuery({ variables: { amount: topHashtagAmount } })
    const { loading: loadingRankedHashtagsChanged, data: rankedHashtagsChanged } = useRankedHashtagsChangedSubscription({ variables: { amount: topHashtagAmount } })

    const [wordCloudData, setWordCloudData] = useState<Word[]>([])

    const setTopHashtagAmountDebounced = useCallback(debounce(setTopHashtagAmount, 400), [setTopHashtagAmount])

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
        console.log(new Date().toTimeString())
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
    }

    return (
        <>
            <Row justify="center" align="middle">
                <Col span={24}>
                    <div style={{ margin: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Space direction="vertical">
                            <Input
                                autoFocus
                                addonBefore="Top"
                                addonAfter="hashtags"
                                defaultValue={topHashtagAmount}
                                onChange={(e) => setTopHashtagAmountDebounced(toNumber(e.target.value))}
                            />
                        </Space>
                    </div>
                </Col>
            </Row>
            <Row justify="center" align="middle">
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
                    <ReactWordcloud words={wordCloudData} options={options} callbacks={wordcloudCallbacks} maxWords={300} />
                </Col>
            </Row>
        </>
    )
}
