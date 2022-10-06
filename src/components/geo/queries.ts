import { gql } from '@apollo/client'

export const getTweets = gql`
    query getTweets($filter: FindTweetsInputTypeQl!) {
        tweet {
            find(filter: $filter) {
                total
                tweets {
                    id
                    authorId
                    username
                    conversationId
                    lang
                    source
                    text
                    createdAt
                    geoLoc {
                        latitude
                        longitude
                    }
                    entities {
                        hashtags
                        mentions
                    }
                    publicMetricsLikeCount
                    publicMetricsRetweetCount
                    publicMetricsReplyCount
                }
            }
        }
    }
`
