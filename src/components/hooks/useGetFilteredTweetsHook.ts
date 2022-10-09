import { useEffect } from 'react'
import { FindTweetsInputTypeQl, useGetFilteredTweetsQuery } from '../../generated/graphql'

export const useGetFilteredTweetsHook = ({ authorId, username, tweetId, searchTerm, onlyWithGeo, hashtags, startingFrom, upTo, pageSize, pageNumber, sortField, sortOrder }: FindTweetsInputTypeQl) => {
    const queryResult = useGetFilteredTweetsQuery({
        variables: {
            filter: {
                authorId: authorId,
                username: username,
                tweetId: tweetId,
                searchTerm: searchTerm,
                onlyWithGeo: onlyWithGeo,
                hashtags: hashtags,
                startingFrom: startingFrom,
                upTo: upTo,
                pageSize: pageSize,
                pageNumber: pageNumber,
                sortField: sortField,
                sortOrder: sortOrder,
            },
        },
    })

    useEffect(() => {
        queryResult.fetchMore({
            variables: {
                filter: {
                    authorId: authorId,
                    username: username,
                    tweetId: tweetId,
                    searchTerm: searchTerm,
                    onlyWithGeo: onlyWithGeo,
                    hashtags: hashtags,
                    startingFrom: startingFrom,
                    upTo: upTo,
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    sortField: sortField,
                    sortOrder: sortOrder,
                },
            },
        })
    }, [authorId, username, tweetId, searchTerm, onlyWithGeo, hashtags, startingFrom, upTo, pageSize, pageNumber, sortField, sortOrder, queryResult.fetchMore])

    return queryResult
}
