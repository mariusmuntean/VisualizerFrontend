import { gql } from '@apollo/client'

export const HashtagSubscription = gql`
    subscription hastagAdded {
        hashtagAdded {
            name
            score
        }
    }
`
