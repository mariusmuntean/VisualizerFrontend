import { gql } from '@apollo/client'

export const GetTopRankedHashtags = gql`
    query getTopRankedHashtags($amount: Int!) {
        hashtag {
            topRankedHashtags(amount: $amount) {
                rank
                name
            }
        }
    }
`
