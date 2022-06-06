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

export type GraphEdgeTypeQl = {
  __typename?: 'GraphEdgeTypeQl';
  fromId: Scalars['String'];
  toId: Scalars['String'];
};

export type GraphNodeTypeQl = {
  __typename?: 'GraphNodeTypeQl';
  id: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type GraphResultQuery = {
  __typename?: 'GraphResultQuery';
  graphResults?: Maybe<GraphResultTypeQl>;
};


export type GraphResultQueryGraphResultsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type GraphResultTypeQl = {
  __typename?: 'GraphResultTypeQl';
  edges?: Maybe<Array<Maybe<GraphEdgeTypeQl>>>;
  nodes?: Maybe<Array<Maybe<GraphNodeTypeQl>>>;
};

export type HashtagQuery = {
  __typename?: 'HashtagQuery';
  topHashtags?: Maybe<Array<Maybe<HashtagTypeQl>>>;
};


export type HashtagQueryTopHashtagsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type HashtagSubscription = {
  __typename?: 'HashtagSubscription';
  hashtagAdded?: Maybe<HashtagTypeQl>;
  rankedHashtagsChanged?: Maybe<Array<Maybe<HashtagTypeQl>>>;
};


export type HashtagSubscriptionRankedHashtagsChangedArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};

export type HashtagTypeQl = {
  __typename?: 'HashtagTypeQl';
  name?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Decimal']>;
};

export type VisualizerQuery = {
  __typename?: 'VisualizerQuery';
  graphResult?: Maybe<GraphResultQuery>;
  hashtag?: Maybe<HashtagQuery>;
};

export type GetHashtagsQueryVariables = Exact<{
  amount: Scalars['Int'];
}>;


export type GetHashtagsQuery = { __typename?: 'VisualizerQuery', hashtag?: { __typename?: 'HashtagQuery', topHashtags?: Array<{ __typename?: 'HashtagTypeQl', score?: any | null, name?: string | null } | null> | null } | null };

export type HastagAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type HastagAddedSubscription = { __typename?: 'HashtagSubscription', hashtagAdded?: { __typename?: 'HashtagTypeQl', name?: string | null, score?: any | null } | null };

export type RankedHashtagsChangedSubscriptionVariables = Exact<{
  amount?: InputMaybe<Scalars['Int']>;
}>;


export type RankedHashtagsChangedSubscription = { __typename?: 'HashtagSubscription', rankedHashtagsChanged?: Array<{ __typename?: 'HashtagTypeQl', name?: string | null, score?: any | null } | null> | null };


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