import { gql } from '@apollo/client'

export const GetHashtags = gql`
    query getHashtags($amount: Int!) {
        hashtag {
            topHashtags(amount: $amount) {
                score
                name
            }
        }
    }
`

export const IsStreaming = gql`
    query isStreaming {
        streaming {
            isStreaming
        }
    }
`
