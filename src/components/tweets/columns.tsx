import { Space, Tag } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { wrap } from 'lodash'
import moment from 'moment'

import { TweetTypeQl } from '../../generated/graphql'

export const getColumns = (): ColumnType<TweetTypeQl>[] => [
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
                        <Tag key={mention}>{mention}</Tag>
                    ))}
                </Space>
            )
        },
    },
    {
        title: 'Likes',
        dataIndex: 'publicMetrics.likeCount',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
            return record.publicMetricsLikeCount
        },
    },
    {
        title: 'Retweets',
        dataIndex: 'publicMetrics.retweetCount',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
            return record.publicMetricsRetweetCount
        },
    },
    {
        title: 'Replies',
        dataIndex: 'publicMetrics.replyCount',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
            return record.publicMetricsReplyCount
        },
    },
    {
        title: 'Geo',
        dataIndex: 'geoLoc',
        width: '5%',
        render: (text, record) => {
            return `(${record.geoLoc?.latitude}, ${record.geoLoc?.latitude})`
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
