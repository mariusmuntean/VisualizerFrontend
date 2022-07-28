import { useEffect, useState } from 'react'
import { BorderlessTableOutlined, PlusOutlined } from '@ant-design/icons'
import { Row, Col, Input, DatePicker, Select, Tag, Space, Card, Table } from 'antd'
import moment from 'moment'
const { Option } = Select

import { SortField, SortOrder, TweetTypeQl, useGetFilteredTweetsQuery } from '../../generated/graphql'
import { ColumnType } from 'antd/lib/table'
import { SorterResult } from 'antd/lib/table/interface'

export const Tweets = () => {
    const [authorId, setAuthorId] = useState<string | undefined>(undefined)
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [tweetId, setTweetId] = useState<string | undefined>(undefined)
    const [searchText, setSearchText] = useState<string | undefined>(undefined)
    const [hashtags, setHashtags] = useState<string[] | undefined>(undefined)

    const [startingFrom, setStartingFrom] = useState<Date | undefined>(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))
    const [upTo, setUpTo] = useState<Date | undefined>(undefined)

    const [pageSize, setPageSize] = useState<number | undefined>(10)
    const [pageNumber, setPageNumber] = useState<number | undefined>(0)

    const [sortField, setSortField] = useState<SortField | undefined>(SortField.Username)
    const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(SortOrder.Ascending)

    const [showAddHashtag, setShowAddHashtag] = useState(false)
    const [currentHashtag, setCurrentHashtag] = useState<string | undefined>(undefined)

    const { data, loading, error, fetchMore } = useGetFilteredTweetsQuery({
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
    }, [authorId, username, tweetId, searchText, hashtags, startingFrom, upTo, pageSize, pageNumber, sortField, sortOrder, fetchMore])

    const onCurrentHashtagConfirmed = () => {
        if (currentHashtag && (!hashtags || hashtags?.indexOf(currentHashtag) === -1)) {
            setHashtags([...(hashtags || []), currentHashtag])
        }
        setShowAddHashtag(false)
        setCurrentHashtag('')
    }

    const onHashtagRemoved = (hashtag: string) => {
        setHashtags(hashtags?.filter((h) => h !== hashtag))
    }

    const columns: ColumnType<TweetTypeQl>[] = [
        {
            title: 'Tweet Id',
            dataIndex: 'tweetId',
            render: (text, record) => record.id,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sorter: true,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => record.username,
        },
        {
            title: 'Tweet',
            dataIndex: 'tweet',
            render: (text, record) => record.text,
        },
        {
            title: 'Hashtags',
            dataIndex: 'hashtags',
            render: (text, record) => {
                return (
                    <Space wrap>
                        {record.entities?.hashtags?.map((hashtag) => (
                            <Tag key={hashtag}>{hashtag}</Tag>
                        ))}
                    </Space>
                )
            },
        },
        {
            title: 'Mentions',
            dataIndex: 'mentions',
            render: (text, record) => {
                return (
                    <Space wrap>
                        {record.entities?.mentions?.map((mention) => (
                            <Tag key={mention?.username}>{mention?.username}</Tag>
                        ))}
                    </Space>
                )
            },
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sortDirections: ['descend', 'ascend'],
            sorter: true,
            render: (text, record) => moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', margin: '0.5em' }}>
            <Row wrap justify="center" align="stretch" gutter={[8, 8]}>
                <Col span={16}>
                    <Card title="Filter" size="small">
                        <Space wrap size="small">
                            <Space direction="vertical">
                                <Input addonBefore="Author ID" defaultValue={undefined} value={authorId} allowClear onChange={(e) => setAuthorId(e.target.value)} />
                                <Input addonBefore="Username" defaultValue={username} value={username} allowClear onChange={(e) => setUsername(e.target.value)} />
                            </Space>
                            <Space direction="vertical">
                                <Input addonBefore="TweetId" defaultValue={undefined} value={tweetId} allowClear onChange={(e) => setTweetId(e.target.value)} />
                                <Input addonBefore="Search Term" defaultValue={undefined} value={searchText} allowClear onChange={(e) => setSearchText(e.target.value)} />
                            </Space>
                            <Space>
                                <Card title="Time Interval" size="small">
                                    <Row>
                                        <Col span={6}>From </Col>
                                        <Col span={18}>
                                            <DatePicker
                                                format="YYYY-MM-DD HH:mm:ss"
                                                size="small"
                                                value={moment(startingFrom)}
                                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                                onChange={(dt, ds) => {
                                                    setStartingFrom(dt?.toDate())
                                                }}
                                                style={{ width: '100%' }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>To</Col>
                                        <Col span={18}>
                                            {' '}
                                            <DatePicker
                                                format="YYYY-MM-DD HH:mm:ss"
                                                size="small"
                                                value={moment(upTo)}
                                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                                onChange={(dt, ds) => {
                                                    setUpTo(dt?.toDate())
                                                }}
                                                style={{ width: '100%' }}
                                            />{' '}
                                        </Col>
                                    </Row>
                                </Card>
                            </Space>
                        </Space>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Hashtags" size="small">
                        <div>
                            {hashtags?.map((h) => (
                                <Tag key={h} icon={<BorderlessTableOutlined />} closable onClose={(e) => onHashtagRemoved(h)}>
                                    {h}
                                </Tag>
                            ))}
                        </div>
                        {showAddHashtag && (
                            <Input
                                type="text"
                                autoFocus
                                className="tag-input"
                                value={currentHashtag}
                                onChange={(e) => setCurrentHashtag(e.target.value)}
                                onBlur={onCurrentHashtagConfirmed}
                                onPressEnter={onCurrentHashtagConfirmed}
                            />
                        )}
                        {!showAddHashtag && (
                            <Tag className="site-tag-plus" onClick={() => setShowAddHashtag(true)}>
                                <PlusOutlined /> New Hashtag
                            </Tag>
                        )}
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table
                        loading={loading}
                        dataSource={(data?.tweet?.find?.tweets as TweetTypeQl[]) ?? []}
                        columns={columns}
                        sortDirections={['descend', 'ascend']}
                        onChange={(pagination, filters, sorter: SorterResult<TweetTypeQl> | SorterResult<TweetTypeQl>[]) => {
                            if ('order' in sorter && sorter.order) {
                                console.log(sorter.order)
                                setSortOrder(sorter.order === 'ascend' ? SortOrder.Ascending : SortOrder.Descending)
                            }
                            if ('field' in sorter && sorter.field) {
                                console.log(sorter.field)
                                setSortField(sorter.field === 'username' ? SortField.Username : SortField.CreatedAt)
                            }
                        }}
                        pagination={{
                            pageSize: pageSize,
                            current: (pageNumber ?? 0) + 1,
                            showSizeChanger: true,
                            total: data?.tweet?.find?.total ?? 0,
                            showTotal: (total) => `${data?.tweet?.find?.total} tweets`,
                            onChange: (pageNumber, pageSize) => {
                                setPageNumber(pageNumber - 1)
                                setPageSize(pageSize)
                            },
                        }}
                    ></Table>
                </Col>
            </Row>
        </div>
    )
}
