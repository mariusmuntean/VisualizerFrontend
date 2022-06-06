import { gql } from '@apollo/client'

export const IsStreaming = gql`
    query isStreaming {
        streaming {
            isStreaming
        }
    }
`
