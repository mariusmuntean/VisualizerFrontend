import { gql } from '@apollo/client'

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
                    }
                }
            }
        }
    }
`
