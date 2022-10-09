import { gql } from '@apollo/client'

export const IsStreaming = gql`
    query isStreaming {
        streaming {
            isStreaming
        }
    }
`
export const getFilteredTweets = gql`
    query getFilteredTweets($filter: FindTweetsInputTypeQl!) {
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
