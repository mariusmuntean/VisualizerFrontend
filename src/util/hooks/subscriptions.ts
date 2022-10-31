import { gql } from '@apollo/client'

export const IsStreamingChanged = gql`
    subscription isStreamingSub {
        isStreamingChanged {
            isStreaming
        }
    }
`

export const StartStreaming = gql`
    mutation startStreaming {
        streaming {
            startStreaming
        }
    }
`

export const StopStreaming = gql`
    mutation stopStreaming {
        streaming {
            stopStreaming
        }
    }
`
