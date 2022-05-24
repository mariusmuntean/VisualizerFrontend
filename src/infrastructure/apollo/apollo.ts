import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

// link for queries and mutations
const httpLink = new HttpLink({
    uri: 'http://localhost:5253/graphql',
})

// link for subscriptions over websockets. Note to self: this is an older subprotocol,
// which I'm using only because the graphql-dotnet backend library expects it.
// See here how to use the newer one - https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions
const wsLink = new WebSocketLink(
    new SubscriptionClient('ws://localhost:5253/graphql', {
        reconnect: true,
    })
)

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
})
