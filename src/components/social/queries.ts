import { gql } from '@apollo/client'

export const getGraphResults = gql`
    query getGraphResults($amount: Int!) {
        graphResult {
            graphResults(amount: $amount) {
                nodes {
                    userId
                    userName
                }
                edges {
                    fromUserId
                    toUserId
                    tweetId
                    relationshipType
                }
            }
        }
    }
`
