import { Spin } from 'antd'
import { useMemo } from 'react'
import ReactWordcloud, { OptionsProp } from 'react-wordcloud'

import { useGetHashtagsQuery } from '../../generated/graphql'

interface Word {
    text: string
    value: number
}

export const Hashtags = () => {
    const { loading, data, client } = useGetHashtagsQuery({ variables: { amount: 120 } })

    const wordCloudData = useMemo(() => {
        console.log(data)
        return (
            data?.hashtag?.topRankedHashtags?.map((h) => {
                const w: Word = { text: h?.name!, value: h?.rank }
                return w
            }) ?? []
        )
    }, [data?.hashtag?.topRankedHashtags])

    if (loading) {
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

    return <ReactWordcloud words={wordCloudData} options={options} />
}
