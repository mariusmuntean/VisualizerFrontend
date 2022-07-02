import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Decimal: any;
};

export type GraphResultQuery = {
  __typename?: 'GraphResultQuery';
  graphResults?: Maybe<GraphResultTypeQl>;
  mentions?: Maybe<GraphResultTypeQl>;
};


export type GraphResultQueryGraphResultsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};


export type GraphResultQueryMentionsArgs = {
  filter?: MentionFilterInputTypeQl;
};

export type GraphResultStatisticsTypeQl = {
  __typename?: 'GraphResultStatisticsTypeQl';
  queryInternalExecutionTime?: Maybe<Scalars['String']>;
};

export type GraphResultTypeQl = {
  __typename?: 'GraphResultTypeQl';
  edges?: Maybe<Array<Maybe<MentionRelationshipTypeQl>>>;
  nodes?: Maybe<Array<Maybe<UserNodeTypeQl>>>;
  statistics?: Maybe<GraphResultStatisticsTypeQl>;
};

export type HashtagQuery = {
  __typename?: 'HashtagQuery';
  topHashtags?: Maybe<Array<Maybe<HashtagTypeQl>>>;
};


export type HashtagQueryTopHashtagsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type HashtagTypeQl = {
  __typename?: 'HashtagTypeQl';
  name?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Decimal']>;
};

export type IsStreamingStateTypeQl = {
  __typename?: 'IsStreamingStateTypeQl';
  isStreaming?: Maybe<Scalars['Boolean']>;
};

export type MentionFilterInputTypeQl = {
  amount?: InputMaybe<Scalars['Int']>;
  authorUserName?: InputMaybe<Scalars['String']>;
  maxHops?: InputMaybe<Scalars['Int']>;
  mentionedUserNames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  minHops?: InputMaybe<Scalars['Int']>;
};

export enum MentionRelationshipType {
  Mentioned = 'MENTIONED',
  WasMentionedBy = 'WAS_MENTIONED_BY'
}

export type MentionRelationshipTypeQl = {
  __typename?: 'MentionRelationshipTypeQl';
  fromUserId: Scalars['String'];
  relationshipType?: Maybe<MentionRelationshipType>;
  toUserId: Scalars['String'];
  tweetId: Scalars['String'];
};

export type StreamingMutations = {
  __typename?: 'StreamingMutations';
  /** Start ingesting the live Twitter feed */
  startStreaming?: Maybe<Scalars['Boolean']>;
  /** Stop ingesting the live Twitter feed */
  stopStreaming?: Maybe<Scalars['Boolean']>;
};

export type StreamingQuery = {
  __typename?: 'StreamingQuery';
  /** Whether or not the live ingestion is running. */
  isStreaming?: Maybe<Scalars['Boolean']>;
};

export type UserNodeTypeQl = {
  __typename?: 'UserNodeTypeQl';
  userId: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type VisualizerMutation = {
  __typename?: 'VisualizerMutation';
  streaming?: Maybe<StreamingMutations>;
};

export type VisualizerQuery = {
  __typename?: 'VisualizerQuery';
  graphResult?: Maybe<GraphResultQuery>;
  hashtag?: Maybe<HashtagQuery>;
  streaming?: Maybe<StreamingQuery>;
};

export type VisualizerSubscription = {
  __typename?: 'VisualizerSubscription';
  hashtagAdded?: Maybe<HashtagTypeQl>;
  /** Produces updates whenever the state of the live ingestion has changed */
  isStreamingChanged?: Maybe<IsStreamingStateTypeQl>;
  rankedHashtagsChanged?: Maybe<Array<Maybe<HashtagTypeQl>>>;
};


export type VisualizerSubscriptionRankedHashtagsChangedArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type GetHashtagsQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type GetHashtagsQuery = { __typename?: 'VisualizerQuery', hashtag?: { __typename?: 'HashtagQuery', topHashtags?: Array<{ __typename?: 'HashtagTypeQl', score?: any | null, name?: string | null } | null> | null } | null };

export type HastagAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type HastagAddedSubscription = { __typename?: 'VisualizerSubscription', hashtagAdded?: { __typename?: 'HashtagTypeQl', name?: string | null, score?: any | null } | null };

export type IsStreamingQueryVariables = Exact<{ [key: string]: never; }>;


export type IsStreamingQuery = { __typename?: 'VisualizerQuery', streaming?: { __typename?: 'StreamingQuery', isStreaming?: boolean | null } | null };

export type IsStreamingSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IsStreamingSubSubscription = { __typename?: 'VisualizerSubscription', isStreamingChanged?: { __typename?: 'IsStreamingStateTypeQl', isStreaming?: boolean | null } | null };

export type RankedHashtagsChangedSubscriptionVariables = Exact<{
  amount?: InputMaybe<Scalars['Int']>;
}>;


export type RankedHashtagsChangedSubscription = { __typename?: 'VisualizerSubscription', rankedHashtagsChanged?: Array<{ __typename?: 'HashtagTypeQl', name?: string | null, score?: any | null } | null> | null };

export type GetGraphResultsQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type GetGraphResultsQuery = { __typename?: 'VisualizerQuery', graphResult?: { __typename?: 'GraphResultQuery', graphResults?: { __typename?: 'GraphResultTypeQl', nodes?: Array<{ __typename?: 'UserNodeTypeQl', userId: string, userName?: string | null } | null> | null, edges?: Array<{ __typename?: 'MentionRelationshipTypeQl', fromUserId: string, toUserId: string, tweetId: string, relationshipType?: MentionRelationshipType | null } | null> | null } | null } | null };

export type GetMentionsQueryVariables = Exact<{
  filter: MentionFilterInputTypeQl;
}>;


export type GetMentionsQuery = { __typename?: 'VisualizerQuery', graphResult?: { __typename?: 'GraphResultQuery', mentions?: { __typename?: 'GraphResultTypeQl', nodes?: Array<{ __typename?: 'UserNodeTypeQl', userId: string, userName?: string | null } | null> | null, edges?: Array<{ __typename?: 'MentionRelationshipTypeQl', fromUserId: string, toUserId: string, tweetId: string, relationshipType?: MentionRelationshipType | null } | null> | null, statistics?: { __typename?: 'GraphResultStatisticsTypeQl', queryInternalExecutionTime?: string | null } | null } | null } | null };


export const GetHashtagsDocument = gql`
    query getHashtags($amount: Int!) {
  hashtag {
    topHashtags(amount: $amount) {
      score
      name
    }
  }
}
    `;

/**
 * __useGetHashtagsQuery__
 *
 * To run a query within a React component, call `useGetHashtagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHashtagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHashtagsQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useGetHashtagsQuery(baseOptions: Apollo.QueryHookOptions<GetHashtagsQuery, GetHashtagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHashtagsQuery, GetHashtagsQueryVariables>(GetHashtagsDocument, options);
      }
export function useGetHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHashtagsQuery, GetHashtagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHashtagsQuery, GetHashtagsQueryVariables>(GetHashtagsDocument, options);
        }
export type GetHashtagsQueryHookResult = ReturnType<typeof useGetHashtagsQuery>;
export type GetHashtagsLazyQueryHookResult = ReturnType<typeof useGetHashtagsLazyQuery>;
export type GetHashtagsQueryResult = Apollo.QueryResult<GetHashtagsQuery, GetHashtagsQueryVariables>;
export const HastagAddedDocument = gql`
    subscription hastagAdded {
  hashtagAdded {
    name
    score
  }
}
    `;

/**
 * __useHastagAddedSubscription__
 *
 * To run a query within a React component, call `useHastagAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHastagAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHastagAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useHastagAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<HastagAddedSubscription, HastagAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HastagAddedSubscription, HastagAddedSubscriptionVariables>(HastagAddedDocument, options);
      }
export type HastagAddedSubscriptionHookResult = ReturnType<typeof useHastagAddedSubscription>;
export type HastagAddedSubscriptionResult = Apollo.SubscriptionResult<HastagAddedSubscription>;
export const IsStreamingDocument = gql`
    query isStreaming {
  streaming {
    isStreaming
  }
}
    `;

/**
 * __useIsStreamingQuery__
 *
 * To run a query within a React component, call `useIsStreamingQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsStreamingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsStreamingQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsStreamingQuery(baseOptions?: Apollo.QueryHookOptions<IsStreamingQuery, IsStreamingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsStreamingQuery, IsStreamingQueryVariables>(IsStreamingDocument, options);
      }
export function useIsStreamingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsStreamingQuery, IsStreamingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsStreamingQuery, IsStreamingQueryVariables>(IsStreamingDocument, options);
        }
export type IsStreamingQueryHookResult = ReturnType<typeof useIsStreamingQuery>;
export type IsStreamingLazyQueryHookResult = ReturnType<typeof useIsStreamingLazyQuery>;
export type IsStreamingQueryResult = Apollo.QueryResult<IsStreamingQuery, IsStreamingQueryVariables>;
export const IsStreamingSubDocument = gql`
    subscription isStreamingSub {
  isStreamingChanged {
    isStreaming
  }
}
    `;

/**
 * __useIsStreamingSubSubscription__
 *
 * To run a query within a React component, call `useIsStreamingSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIsStreamingSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsStreamingSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useIsStreamingSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IsStreamingSubSubscription, IsStreamingSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IsStreamingSubSubscription, IsStreamingSubSubscriptionVariables>(IsStreamingSubDocument, options);
      }
export type IsStreamingSubSubscriptionHookResult = ReturnType<typeof useIsStreamingSubSubscription>;
export type IsStreamingSubSubscriptionResult = Apollo.SubscriptionResult<IsStreamingSubSubscription>;
export const RankedHashtagsChangedDocument = gql`
    subscription rankedHashtagsChanged($amount: Int) {
  rankedHashtagsChanged(amount: $amount) {
    name
    score
  }
}
    `;

/**
 * __useRankedHashtagsChangedSubscription__
 *
 * To run a query within a React component, call `useRankedHashtagsChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRankedHashtagsChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRankedHashtagsChangedSubscription({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useRankedHashtagsChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RankedHashtagsChangedSubscription, RankedHashtagsChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RankedHashtagsChangedSubscription, RankedHashtagsChangedSubscriptionVariables>(RankedHashtagsChangedDocument, options);
      }
export type RankedHashtagsChangedSubscriptionHookResult = ReturnType<typeof useRankedHashtagsChangedSubscription>;
export type RankedHashtagsChangedSubscriptionResult = Apollo.SubscriptionResult<RankedHashtagsChangedSubscription>;
export const GetGraphResultsDocument = gql`
    query getGraphResults($amount: Int!) {
  graphResult {
    graphResults(amount: $amount) {
      nodes {
        userId
        userName
      }
      edges {
        fromUserId
        toUserId
        tweetId
        relationshipType
      }
    }
  }
}
    `;

/**
 * __useGetGraphResultsQuery__
 *
 * To run a query within a React component, call `useGetGraphResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGraphResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGraphResultsQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useGetGraphResultsQuery(baseOptions: Apollo.QueryHookOptions<GetGraphResultsQuery, GetGraphResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGraphResultsQuery, GetGraphResultsQueryVariables>(GetGraphResultsDocument, options);
      }
export function useGetGraphResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGraphResultsQuery, GetGraphResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGraphResultsQuery, GetGraphResultsQueryVariables>(GetGraphResultsDocument, options);
        }
export type GetGraphResultsQueryHookResult = ReturnType<typeof useGetGraphResultsQuery>;
export type GetGraphResultsLazyQueryHookResult = ReturnType<typeof useGetGraphResultsLazyQuery>;
export type GetGraphResultsQueryResult = Apollo.QueryResult<GetGraphResultsQuery, GetGraphResultsQueryVariables>;
export const GetMentionsDocument = gql`
    query getMentions($filter: MentionFilterInputTypeQl!) {
  graphResult {
    mentions(filter: $filter) {
      nodes {
        userId
        userName
      }
      edges {
        fromUserId
        toUserId
        tweetId
        relationshipType
      }
      statistics {
        queryInternalExecutionTime
      }
    }
  }
}
    `;

/**
 * __useGetMentionsQuery__
 *
 * To run a query within a React component, call `useGetMentionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMentionsQuery(baseOptions: Apollo.QueryHookOptions<GetMentionsQuery, GetMentionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMentionsQuery, GetMentionsQueryVariables>(GetMentionsDocument, options);
      }
export function useGetMentionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentionsQuery, GetMentionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMentionsQuery, GetMentionsQueryVariables>(GetMentionsDocument, options);
        }
export type GetMentionsQueryHookResult = ReturnType<typeof useGetMentionsQuery>;
export type GetMentionsLazyQueryHookResult = ReturnType<typeof useGetMentionsLazyQuery>;
export type GetMentionsQueryResult = Apollo.QueryResult<GetMentionsQuery, GetMentionsQueryVariables>;