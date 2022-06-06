import { gql } from '@apollo/client'

export const RankedHashtagsChanged = gql`
    subscription rankedHashtagsChanged($amount: Int) {
        rankedHashtagsChanged(amount: $amount) {
            name
            score
        }
    }
`

export const IsStreamingChanged = gql`
    subscription isStreamingSub {
        isStreamingChanged {
            isStreaming
        }
    }
`
