import { gql } from '@apollo/client'

export const GetHashtags = gql`
    query getHashtags($amount: Int!) {
        hashtag {
            topRankedHashtags(amount: $amount) {
                rank
                name
            }
        }
    }
`
