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
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
  Decimal: any;
  Long: any;
};

export type CashtagEntityTypeQl = {
  __typename?: 'CashtagEntityTypeQl';
  end?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  tag?: Maybe<Scalars['String']>;
};

export type FindTweetsInputTypeQl = {
  authorId?: InputMaybe<Scalars['String']>;
  hashtags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortField?: InputMaybe<SortField>;
  sortOrder?: InputMaybe<SortOrder>;
  startingFrom?: InputMaybe<Scalars['DateTime']>;
  tweetId?: InputMaybe<Scalars['String']>;
  upTo?: InputMaybe<Scalars['DateTime']>;
  username?: InputMaybe<Scalars['String']>;
};

export type GeoLocTypeQl = {
  __typename?: 'GeoLocTypeQl';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type GraphResultQuery = {
  __typename?: 'GraphResultQuery';
  graphResults?: Maybe<GraphResultTypeQl>;
  mentions?: Maybe<GraphResultTypeQl>;
  userCount?: Maybe<Scalars['Long']>;
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

export type RankedHashtagQuery = {
  __typename?: 'RankedHashtagQuery';
  /** Retrieve a specified amount of the top ranked hashtags */
  topRankedHashtags?: Maybe<Array<Maybe<RankedHashtagTypeQl>>>;
};


export type RankedHashtagQueryTopRankedHashtagsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type RankedHashtagTypeQl = {
  __typename?: 'RankedHashtagTypeQl';
  name?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Decimal']>;
};

export type ReferencedTweetTypeQl = {
  __typename?: 'ReferencedTweetTypeQl';
  id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum SortField {
  CreatedAt = 'CREATED_AT',
  Username = 'USERNAME'
}

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

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

export type StreamingStatusTypeQl = {
  __typename?: 'StreamingStatusTypeQl';
  isStreaming?: Maybe<Scalars['Boolean']>;
};

export type TweetEntitiesTypeQl = {
  __typename?: 'TweetEntitiesTypeQl';
  cashtags?: Maybe<Array<Maybe<CashtagEntityTypeQl>>>;
  hashtags?: Maybe<Array<Maybe<Scalars['String']>>>;
  mentions?: Maybe<Array<Maybe<UserMentionTypeQl>>>;
};

export type TweetMetricsTypeQl = {
  __typename?: 'TweetMetricsTypeQl';
  impressionCount?: Maybe<Scalars['Int']>;
  likeCount?: Maybe<Scalars['Int']>;
  replyCount?: Maybe<Scalars['Int']>;
  retweetCount?: Maybe<Scalars['Int']>;
  urlLinkClicks?: Maybe<Scalars['Int']>;
  userProfileClicks?: Maybe<Scalars['Int']>;
};

export type TweetModelsPageTypeQl = {
  __typename?: 'TweetModelsPageTypeQl';
  total?: Maybe<Scalars['Int']>;
  tweets?: Maybe<Array<Maybe<TweetTypeQl>>>;
};

export type TweetQuery = {
  __typename?: 'TweetQuery';
  find?: Maybe<TweetModelsPageTypeQl>;
};


export type TweetQueryFindArgs = {
  filter?: InputMaybe<FindTweetsInputTypeQl>;
};

export type TweetTypeQl = {
  __typename?: 'TweetTypeQl';
  authorId?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  entities?: Maybe<TweetEntitiesTypeQl>;
  geoLoc?: Maybe<GeoLocTypeQl>;
  id?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  organicMetrics?: Maybe<TweetMetricsTypeQl>;
  referencedTweets?: Maybe<Array<Maybe<ReferencedTweetTypeQl>>>;
  source?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMentionTypeQl = {
  __typename?: 'UserMentionTypeQl';
  end?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
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
  hashtag?: Maybe<RankedHashtagQuery>;
  streaming?: Maybe<StreamingQuery>;
  tweet?: Maybe<TweetQuery>;
};

export type VisualizerSubscription = {
  __typename?: 'VisualizerSubscription';
  /** Produces updates whenever the state of the live ingestion has changed */
  isStreamingChanged?: Maybe<StreamingStatusTypeQl>;
  /** Hashtags are published with their new rank */
  rankedHashtag?: Maybe<RankedHashtagTypeQl>;
  /** Top X ranked hashtags are published whenever they change */
  topRankedHashtags?: Maybe<Array<Maybe<RankedHashtagTypeQl>>>;
};


export type VisualizerSubscriptionRankedHashtagArgs = {
  sampleIntervalSec?: InputMaybe<Scalars['Float']>;
};


export type VisualizerSubscriptionTopRankedHashtagsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type GetTopRankedHashtagsQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type GetTopRankedHashtagsQuery = { __typename?: 'VisualizerQuery', hashtag?: { __typename?: 'RankedHashtagQuery', topRankedHashtags?: Array<{ __typename?: 'RankedHashtagTypeQl', rank?: any | null, name?: string | null } | null> | null } | null };

export type RankedHashtagSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RankedHashtagSubscription = { __typename?: 'VisualizerSubscription', rankedHashtag?: { __typename?: 'RankedHashtagTypeQl', name?: string | null, rank?: any | null } | null };

export type IsStreamingQueryVariables = Exact<{ [key: string]: never; }>;


export type IsStreamingQuery = { __typename?: 'VisualizerQuery', streaming?: { __typename?: 'StreamingQuery', isStreaming?: boolean | null } | null };

export type IsStreamingSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IsStreamingSubSubscription = { __typename?: 'VisualizerSubscription', isStreamingChanged?: { __typename?: 'StreamingStatusTypeQl', isStreaming?: boolean | null } | null };

export type StartStreamingMutationVariables = Exact<{ [key: string]: never; }>;


export type StartStreamingMutation = { __typename?: 'VisualizerMutation', streaming?: { __typename?: 'StreamingMutations', startStreaming?: boolean | null } | null };

export type StopStreamingMutationVariables = Exact<{ [key: string]: never; }>;


export type StopStreamingMutation = { __typename?: 'VisualizerMutation', streaming?: { __typename?: 'StreamingMutations', stopStreaming?: boolean | null } | null };

export type GetHashtagsQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type GetHashtagsQuery = { __typename?: 'VisualizerQuery', hashtag?: { __typename?: 'RankedHashtagQuery', topRankedHashtags?: Array<{ __typename?: 'RankedHashtagTypeQl', rank?: any | null, name?: string | null } | null> | null } | null };

export type TopRankedHashtagsChangedSubscriptionVariables = Exact<{
  amount?: InputMaybe<Scalars['Int']>;
}>;


export type TopRankedHashtagsChangedSubscription = { __typename?: 'VisualizerSubscription', topRankedHashtags?: Array<{ __typename?: 'RankedHashtagTypeQl', name?: string | null, rank?: any | null } | null> | null };

export type GetUserCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCountQuery = { __typename?: 'VisualizerQuery', graphResult?: { __typename?: 'GraphResultQuery', userCount?: any | null } | null };

export type GetGraphResultsQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type GetGraphResultsQuery = { __typename?: 'VisualizerQuery', graphResult?: { __typename?: 'GraphResultQuery', graphResults?: { __typename?: 'GraphResultTypeQl', nodes?: Array<{ __typename?: 'UserNodeTypeQl', userId: string, userName?: string | null } | null> | null, edges?: Array<{ __typename?: 'MentionRelationshipTypeQl', fromUserId: string, toUserId: string, tweetId: string, relationshipType?: MentionRelationshipType | null } | null> | null } | null } | null };

export type GetMentionsQueryVariables = Exact<{
  filter: MentionFilterInputTypeQl;
}>;


export type GetMentionsQuery = { __typename?: 'VisualizerQuery', graphResult?: { __typename?: 'GraphResultQuery', mentions?: { __typename?: 'GraphResultTypeQl', nodes?: Array<{ __typename?: 'UserNodeTypeQl', userId: string, userName?: string | null } | null> | null, edges?: Array<{ __typename?: 'MentionRelationshipTypeQl', fromUserId: string, toUserId: string, tweetId: string, relationshipType?: MentionRelationshipType | null } | null> | null, statistics?: { __typename?: 'GraphResultStatisticsTypeQl', queryInternalExecutionTime?: string | null } | null } | null } | null };

export type GetFilteredTweetsQueryVariables = Exact<{
  filter: FindTweetsInputTypeQl;
}>;


export type GetFilteredTweetsQuery = { __typename?: 'VisualizerQuery', tweet?: { __typename?: 'TweetQuery', find?: { __typename?: 'TweetModelsPageTypeQl', total?: number | null, tweets?: Array<{ __typename?: 'TweetTypeQl', id?: string | null, authorId?: string | null, username?: string | null, conversationId?: string | null, lang?: string | null, source?: string | null, text?: string | null, createdAt?: any | null, geoLoc?: { __typename?: 'GeoLocTypeQl', latitude?: number | null, longitude?: number | null } | null, entities?: { __typename?: 'TweetEntitiesTypeQl', hashtags?: Array<string | null> | null } | null } | null> | null } | null } | null };


export const GetTopRankedHashtagsDocument = gql`
    query getTopRankedHashtags($amount: Int!) {
  hashtag {
    topRankedHashtags(amount: $amount) {
      rank
      name
    }
  }
}
    `;

/**
 * __useGetTopRankedHashtagsQuery__
 *
 * To run a query within a React component, call `useGetTopRankedHashtagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopRankedHashtagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopRankedHashtagsQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useGetTopRankedHashtagsQuery(baseOptions: Apollo.QueryHookOptions<GetTopRankedHashtagsQuery, GetTopRankedHashtagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopRankedHashtagsQuery, GetTopRankedHashtagsQueryVariables>(GetTopRankedHashtagsDocument, options);
      }
export function useGetTopRankedHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopRankedHashtagsQuery, GetTopRankedHashtagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopRankedHashtagsQuery, GetTopRankedHashtagsQueryVariables>(GetTopRankedHashtagsDocument, options);
        }
export type GetTopRankedHashtagsQueryHookResult = ReturnType<typeof useGetTopRankedHashtagsQuery>;
export type GetTopRankedHashtagsLazyQueryHookResult = ReturnType<typeof useGetTopRankedHashtagsLazyQuery>;
export type GetTopRankedHashtagsQueryResult = Apollo.QueryResult<GetTopRankedHashtagsQuery, GetTopRankedHashtagsQueryVariables>;
export const RankedHashtagDocument = gql`
    subscription rankedHashtag {
  rankedHashtag {
    name
    rank
  }
}
    `;

/**
 * __useRankedHashtagSubscription__
 *
 * To run a query within a React component, call `useRankedHashtagSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRankedHashtagSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRankedHashtagSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRankedHashtagSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RankedHashtagSubscription, RankedHashtagSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RankedHashtagSubscription, RankedHashtagSubscriptionVariables>(RankedHashtagDocument, options);
      }
export type RankedHashtagSubscriptionHookResult = ReturnType<typeof useRankedHashtagSubscription>;
export type RankedHashtagSubscriptionResult = Apollo.SubscriptionResult<RankedHashtagSubscription>;
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
export const StartStreamingDocument = gql`
    mutation startStreaming {
  streaming {
    startStreaming
  }
}
    `;
export type StartStreamingMutationFn = Apollo.MutationFunction<StartStreamingMutation, StartStreamingMutationVariables>;

/**
 * __useStartStreamingMutation__
 *
 * To run a mutation, you first call `useStartStreamingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartStreamingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startStreamingMutation, { data, loading, error }] = useStartStreamingMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartStreamingMutation(baseOptions?: Apollo.MutationHookOptions<StartStreamingMutation, StartStreamingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartStreamingMutation, StartStreamingMutationVariables>(StartStreamingDocument, options);
      }
export type StartStreamingMutationHookResult = ReturnType<typeof useStartStreamingMutation>;
export type StartStreamingMutationResult = Apollo.MutationResult<StartStreamingMutation>;
export type StartStreamingMutationOptions = Apollo.BaseMutationOptions<StartStreamingMutation, StartStreamingMutationVariables>;
export const StopStreamingDocument = gql`
    mutation stopStreaming {
  streaming {
    stopStreaming
  }
}
    `;
export type StopStreamingMutationFn = Apollo.MutationFunction<StopStreamingMutation, StopStreamingMutationVariables>;

/**
 * __useStopStreamingMutation__
 *
 * To run a mutation, you first call `useStopStreamingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopStreamingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopStreamingMutation, { data, loading, error }] = useStopStreamingMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopStreamingMutation(baseOptions?: Apollo.MutationHookOptions<StopStreamingMutation, StopStreamingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopStreamingMutation, StopStreamingMutationVariables>(StopStreamingDocument, options);
      }
export type StopStreamingMutationHookResult = ReturnType<typeof useStopStreamingMutation>;
export type StopStreamingMutationResult = Apollo.MutationResult<StopStreamingMutation>;
export type StopStreamingMutationOptions = Apollo.BaseMutationOptions<StopStreamingMutation, StopStreamingMutationVariables>;
export const GetHashtagsDocument = gql`
    query getHashtags($amount: Int!) {
  hashtag {
    topRankedHashtags(amount: $amount) {
      rank
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
export const TopRankedHashtagsChangedDocument = gql`
    subscription topRankedHashtagsChanged($amount: Int) {
  topRankedHashtags(amount: $amount) {
    name
    rank
  }
}
    `;

/**
 * __useTopRankedHashtagsChangedSubscription__
 *
 * To run a query within a React component, call `useTopRankedHashtagsChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTopRankedHashtagsChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopRankedHashtagsChangedSubscription({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useTopRankedHashtagsChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TopRankedHashtagsChangedSubscription, TopRankedHashtagsChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TopRankedHashtagsChangedSubscription, TopRankedHashtagsChangedSubscriptionVariables>(TopRankedHashtagsChangedDocument, options);
      }
export type TopRankedHashtagsChangedSubscriptionHookResult = ReturnType<typeof useTopRankedHashtagsChangedSubscription>;
export type TopRankedHashtagsChangedSubscriptionResult = Apollo.SubscriptionResult<TopRankedHashtagsChangedSubscription>;
export const GetUserCountDocument = gql`
    query getUserCount {
  graphResult {
    userCount
  }
}
    `;

/**
 * __useGetUserCountQuery__
 *
 * To run a query within a React component, call `useGetUserCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCountQuery, GetUserCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCountQuery, GetUserCountQueryVariables>(GetUserCountDocument, options);
      }
export function useGetUserCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCountQuery, GetUserCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCountQuery, GetUserCountQueryVariables>(GetUserCountDocument, options);
        }
export type GetUserCountQueryHookResult = ReturnType<typeof useGetUserCountQuery>;
export type GetUserCountLazyQueryHookResult = ReturnType<typeof useGetUserCountLazyQuery>;
export type GetUserCountQueryResult = Apollo.QueryResult<GetUserCountQuery, GetUserCountQueryVariables>;
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
export const GetFilteredTweetsDocument = gql`
    query getFilteredTweets($filter: FindTweetsInputTypeQl!) {
  tweet {
    find(filter: $filter) {
      total
      tweets {
        id
        authorId
        username
        conversationId
        lang
        source
        text
        createdAt
        geoLoc {
          latitude
          longitude
        }
        entities {
          hashtags
        }
      }
    }
  }
}
    `;

/**
 * __useGetFilteredTweetsQuery__
 *
 * To run a query within a React component, call `useGetFilteredTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredTweetsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetFilteredTweetsQuery(baseOptions: Apollo.QueryHookOptions<GetFilteredTweetsQuery, GetFilteredTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredTweetsQuery, GetFilteredTweetsQueryVariables>(GetFilteredTweetsDocument, options);
      }
export function useGetFilteredTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredTweetsQuery, GetFilteredTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredTweetsQuery, GetFilteredTweetsQueryVariables>(GetFilteredTweetsDocument, options);
        }
export type GetFilteredTweetsQueryHookResult = ReturnType<typeof useGetFilteredTweetsQuery>;
export type GetFilteredTweetsLazyQueryHookResult = ReturnType<typeof useGetFilteredTweetsLazyQuery>;
export type GetFilteredTweetsQueryResult = Apollo.QueryResult<GetFilteredTweetsQuery, GetFilteredTweetsQueryVariables>;