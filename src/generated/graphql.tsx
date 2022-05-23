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