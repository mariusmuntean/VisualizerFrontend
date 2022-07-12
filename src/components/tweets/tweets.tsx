import { Row, Col, Input, InputNumber, Button, DatePicker } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { SortField, SortOrder, useGetFilteredTweetsQuery } from '../../generated/graphql'

export const Tweets = () => {
    const [authorId, setAuthorId] = useState<string | undefined>(undefined)
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [tweetId, setTweetId] = useState<string | undefined>(undefined)
    const [searchText, setSearchText] = useState<string | undefined>(undefined)
    const [hashtags, setHashtags] = useState<string[] | undefined>(undefined)

    const [startingFrom, setStartingFrom] = useState<Date | undefined>(undefined)
    const [upTo, setUpTo] = useState<Date | undefined>(undefined)

    const [pageSize, setPageSize] = useState<number | undefined>(10)
    const [pageNumber, setPageNumber] = useState<number | undefined>(0)

    const [sortField, setSortField] = useState<SortField | undefined>(SortField.Username)
    const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(SortOrder.Ascending)

    const { data, loading, fetchMore } = useGetFilteredTweetsQuery({
        variables: {
            filter: {
                authorId: authorId,
                username: username,
                tweetId: tweetId,
                searchTerm: searchText,
                hashtags: hashtags,
                startingFrom: startingFrom,
                upTo: upTo,
                pageSize: pageSize,
                pageNumber: pageNumber,
                sortField: sortField,
                sortOrder: sortOrder,
            },
        },
    })

    useEffect(() => {
        fetchMore({
            variables: {
                filter: {
                    authorId: authorId,
                    username: username,
                    tweetId: tweetId,
                    searchTerm: searchText,
                    hashtags: hashtags,
                    startingFrom: startingFrom,
                    upTo: upTo,
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    sortField: sortField,
                    sortOrder: sortOrder,
                },
            },
        })
    }, [authorId, tweetId, searchText, hashtags, startingFrom, upTo, pageSize, pageNumber, sortField, sortOrder, fetchMore])

    return (
        <Row justify="center" align="middle" gutter={[10, 20]}>
            <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                <Input addonBefore="Author ID" defaultValue={undefined} value={authorId} allowClear onChange={(e) => setAuthorId(e.target.value)} size="large" />
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                <Input addonBefore="Username" defaultValue={undefined} value={username} allowClear onChange={(e) => setUsername(e.target.value)} size="large" />
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                <Input addonBefore="TweetId" defaultValue={undefined} value={tweetId} allowClear onChange={(e) => setTweetId(e.target.value)} size="large" />
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                <Input addonBefore="Search Term" defaultValue={undefined} value={searchText} allowClear onChange={(e) => setSearchText(e.target.value)} size="large" />
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    size="large"
                    value={moment(startingFrom)}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    onChange={(dt, ds) => {
                        setStartingFrom(dt?.toDate())
                    }}
                    style={{ width: '75%' }}
                />
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5em' }}>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    size="large"
                    value={moment(upTo)}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    onChange={(dt, ds) => {
                        setUpTo(dt?.toDate())
                    }}
                    style={{ width: '75%' }}
                />
            </Col>
        </Row>
    )
}
