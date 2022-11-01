import { Space, Tag } from 'antd'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment'

import { TweetTypeQl } from '../../generated/graphql'
import { getShowTweetsAtLocationUrl } from '../../util/useShowTweetsAtLocation'

export const getColumns = (includeGeo: boolean): ColumnType<TweetTypeQl>[] => [
    {
        title: 'Tweet Id',
        dataIndex: 'tweetId',
        width: '9%',
        render: (text, record) => record.id,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        ellipsis: false,
        width: '8%',
        render: (text, record) => record.username,
    },
    {
        title: 'Tweet',
        dataIndex: 'tweet',
        width: 'auto',
        render: (text, record) => record.text,
    },
    {
        title: 'Hashtags',
        dataIndex: 'hashtags',
        width: '10%',
        render: (text, record) => {
            return (
                <Space wrap>
                    {record.entities?.hashtags?.map((hashtag, idx) => (
                        <Tag key={hashtag + `${idx}`}>{hashtag}</Tag>
                    ))}
                </Space>
            )
        },
    },
    {
        title: 'Mentions',
        dataIndex: 'mentions',
        width: '10%',
        render: (text, record) => {
            return (
                <Space wrap>
                    {record.entities?.mentions?.map((mention, idx) => (
                        <Tag key={`${mention}${idx}`}>{mention}</Tag>
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
        width: '5%',
        render: (text, record) => {
            return record.publicMetricsLikeCount
        },
    },
    {
        title: 'Retweets',
        dataIndex: 'publicMetrics.retweetCount',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        width: '5%',
        render: (text, record) => {
            return record.publicMetricsRetweetCount
        },
    },
    {
        title: 'Replies',
        dataIndex: 'publicMetrics.replyCount',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        width: '5%',
        render: (text, record) => {
            return record.publicMetricsReplyCount
        },
    },
    ...(includeGeo
        ? [
              {
                  title: 'Geo',
                  dataIndex: 'geoLoc',
                  width: '10%',
                  render: (text, record) => {
                      if (!record.geoLoc?.latitude || !record.geoLoc?.longitude) {
                          return <></>
                      }

                      const destinationUrl = getShowTweetsAtLocationUrl([record.geoLoc.latitude, record.geoLoc.longitude], record.id)
                      return <a href={destinationUrl}>{`(${record.geoLoc?.latitude ?? ''}, ${record.geoLoc?.longitude ?? ''})`}</a>
                  },
              } as ColumnType<TweetTypeQl>,
          ]
        : []),
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        width: '10%',
        ellipsis: true,
        render: (text, record) => <div style={{ wordBreak: 'normal' }}>{moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>,
    },
]
