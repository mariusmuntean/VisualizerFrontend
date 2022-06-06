import { gql } from '@apollo/client'

export const IsStreamingChanged = gql`
    subscription isStreamingSub {
        isStreamingChanged {
            isStreaming
        }
    }
`
