import { gql } from '@apollo/client'

export const RankedHashtagSubscription = gql`
    subscription rankedHashtag {
        rankedHashtag {
            name
            rank
        }
    }
`
