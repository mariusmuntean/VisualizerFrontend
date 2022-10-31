import { useMemo } from 'react'
import { BorderlessTableOutlined, PlusOutlined } from '@ant-design/icons'
import { Row, Col, Input, DatePicker, Tag, Space, Table, Checkbox, Switch, Divider } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { SorterResult } from 'antd/lib/table/interface'
import moment from 'moment'

import { SortField, SortOrder, TweetTypeQl } from '../../generated/graphql'
import { useGetFilteredTweetsHook } from '../hooks/useGetFilteredTweetsHook'
import { getColumns } from './columns'
import { useArrayUrlState, useBoolUrlState, useDateUrlState, useNumberUrlState, useUrlState } from './hooks'
import './../../extensions/string.extensions'
import { useSearchParams } from 'react-router-dom'

export const Tweets = () => {
    const [_, setSearchParams] = useSearchParams()
    const [authorId, setAuthorId] = useUrlState('authorId', undefined)
    const [username, setUsername] = useUrlState('username', undefined)
    const [tweetId, setTweetId] = useUrlState('tweetId', undefined)
    const [searchText, setSearchText] = useUrlState('searchText', undefined)

    const [startingFrom, setStartingFrom] = useDateUrlState('startingFrom', undefined)
    const [upTo, setUpTo] = useDateUrlState('upTo', undefined)

    const [filterGeo, setFilterGeo] = useBoolUrlState('filterGeo', false)
    const [withGeo, setWithGeo] = useBoolUrlState('withGeo', undefined)

    const [hashtags, setHashtags] = useArrayUrlState('hashtags', undefined)
    const [showAddHashtag, setShowAddHashtag] = useBoolUrlState('showAddHashtag', false)
    const [currentHashtag, setCurrentHashtag] = useUrlState('currentHashtag', undefined)

    const [pageSize, setPageSize] = useNumberUrlState('pageSize', 10)
    const [pageNumber, setPageNumber] = useNumberUrlState('pageNumber', 1)

    const [sortField, setSortField] = useUrlState('sortField', SortField.Username)
    const [sortOrder, setSortOrder] = useUrlState('sortOrder', SortOrder.Ascending)

    const { data, loading } = useGetFilteredTweetsHook({
        authorId: authorId,
        username: username,
        tweetId: tweetId,
        searchTerm: searchText,
        onlyWithGeo: filterGeo ? withGeo : undefined,
        hashtags: hashtags,
        startingFrom: startingFrom,
        upTo: upTo,
        pageSize: pageSize,
        pageNumber: pageNumber ? pageNumber - 1 : undefined,
        sortField: sortField ? (sortField.toString() as SortField) : null,
        sortOrder: sortOrder ? (sortOrder.toString() as SortOrder) : null,
    })

    const onCurrentHashtagConfirmed = () => {
        // Updating multiple query params with my custom hooks doesn't work. It seems as if each hook resets the previous one.
        // Hence I'm explicitly updating multiple query params in one go.
        let newhashtags = hashtags
        if (currentHashtag && (!hashtags || hashtags?.indexOf(currentHashtag) === -1)) {
            newhashtags = [...(hashtags || []), currentHashtag]
        }

        setSearchParams((prev) => {
            prev.delete('currentHashtag')
            prev.set('showAddHashtag', false.toString())
            if (newhashtags && newhashtags.length > 0) {
                prev.set('hashtags', newhashtags.join(','))
            } else {
                prev.delete('hashtags')
            }
            return prev
        })
    }

    const onHashtagRemoved = (hashtag: string) => {
        setHashtags(hashtags?.filter((h) => h !== hashtag))
    }

    const columns: ColumnType<TweetTypeQl>[] = useMemo(() => getColumns(filterGeo ?? true), [filterGeo])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', margin: '0.5em' }}>
            <Row wrap justify="center" gutter={[8, 8]}>
                <Col span={24}>
                    <Space wrap size="small">
                        <Space direction="vertical">
                            <Input addonBefore="Author ID" defaultValue={undefined} value={authorId} allowClear onChange={(e) => setAuthorId(e.target.value)} />
                            <Input addonBefore="Username" defaultValue={username} value={username} allowClear onChange={(e) => setUsername(e.target.value)} />
                        </Space>
                        <Space direction="vertical">
                            <Input addonBefore="TweetId" defaultValue={undefined} value={tweetId} allowClear onChange={(e) => setTweetId(e.target.value)} />
                            <Input addonBefore="Search Term" defaultValue={undefined} value={searchText} allowClear onChange={(e) => setSearchText(e.target.value)} />
                        </Space>
                        <Divider type="vertical" style={{ height: '3em' }} />
                        <Space direction="vertical">
                            <Row justify="center">
                                <Col span={4}>From</Col>
                                <Col span={19}>
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm:ss"
                                        size="small"
                                        value={startingFrom ? moment(startingFrom) : undefined}
                                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                        onChange={(dt, ds) => {
                                            setStartingFrom(dt?.toDate())
                                        }}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                            </Row>
                            <Row justify="center">
                                <Col span={4}>To</Col>
                                <Col span={19}>
                                    {' '}
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm:ss"
                                        size="small"
                                        value={upTo ? moment(upTo) : undefined}
                                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                        onChange={(dt, ds) => {
                                            setUpTo(dt?.toDate())
                                        }}
                                        style={{ width: '100%' }}
                                    />{' '}
                                </Col>
                            </Row>
                        </Space>
                        <Divider type="vertical" style={{ height: '3em' }} />
                        <Space direction="vertical">
                            <Switch
                                checkedChildren="Filter Geo"
                                unCheckedChildren="Ignore Geo"
                                checked={filterGeo}
                                onChange={(checked, e) => {
                                    setFilterGeo(checked)
                                }}
                            ></Switch>

                            <Checkbox name="WithGeo" disabled={!filterGeo} checked={withGeo} onChange={(e) => setWithGeo(e.target.checked)}>
                                With Geo?
                            </Checkbox>
                        </Space>
                        <Divider type="vertical" style={{ height: '3em' }} />
                        <Space>
                            <span>Hashtags</span>
                            {hashtags?.map((h) => (
                                <Tag key={h} icon={<BorderlessTableOutlined />} closable onClose={(e) => onHashtagRemoved(h)}>
                                    {h}
                                </Tag>
                            ))}
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
                        </Space>
                    </Space>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table
                        loading={loading}
                        dataSource={(data?.tweet?.find?.tweets as TweetTypeQl[]) ?? []}
                        columns={columns}
                        rowKey="id"
                        sortDirections={['descend', 'ascend']}
                        onChange={(pagination, filters, sorter: SorterResult<TweetTypeQl> | SorterResult<TweetTypeQl>[]) => {
                            if ('order' in sorter && sorter.order) {
                                console.log(sorter.order)
                                setSortOrder(sorter.order === 'ascend' ? SortOrder.Ascending : SortOrder.Descending)
                            }
                            if ('field' in sorter && sorter.field) {
                                console.log(sorter.field)
                                let sortField: SortField = SortField.CreatedAt
                                switch (sorter.field) {
                                    case 'username': {
                                        sortField = SortField.Username
                                        break
                                    }
                                    case 'createdAt': {
                                        sortField = SortField.CreatedAt
                                        break
                                    }
                                    case 'publicMetrics.likeCount': {
                                        sortField = SortField.PublicMetricsLikesCount
                                        break
                                    }
                                    case 'publicMetrics.retweetCount': {
                                        sortField = SortField.PublicMetricsRetweetsCount
                                        break
                                    }
                                    case 'publicMetrics.replyCount': {
                                        sortField = SortField.PublicMetricsRepliesCount
                                        break
                                    }
                                }
                                setSortField(sortField)
                            }
                        }}
                        pagination={{
                            pageSize: pageSize ?? 11,
                            current: pageNumber ?? 3,
                            showSizeChanger: true,
                            total: data?.tweet?.find?.total ?? 0,
                            showTotal: (total) => `${data?.tweet?.find?.total} tweets`,
                            onChange: (pageNumber, pageSize) => {
                                setPageSize(pageSize)
                                setPageNumber(pageNumber)
                            },
                        }}
                    ></Table>
                </Col>
            </Row>
        </div>
    )
}
