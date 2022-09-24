import { gql } from '@apollo/client'

export const TopRankedHashtags = gql`
    subscription topRankedHashtagsChanged($amount: Int) {
        topRankedHashtags(amount: $amount) {
            name
            rank
        }
    }
`
