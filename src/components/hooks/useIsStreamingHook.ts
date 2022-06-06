import { useMemo } from 'react'
import { useIsStreamingQuery, useIsStreamingSubSubscription } from '../../generated/graphql'

export const useIsStreaming = (): boolean | undefined => {
    const { loading: loadingIsStreaming, data: isStreamingData } = useIsStreamingQuery()
    const { loading: loadingIsStreamingChanged, data: isStreamingChanged } = useIsStreamingSubSubscription()
    return useMemo<boolean | undefined>(() => {
        if (loadingIsStreaming) {
            return undefined
        }

        if (!loadingIsStreamingChanged) {
            return isStreamingChanged?.isStreamingChanged?.isStreaming ?? undefined
        }

        return isStreamingData?.streaming?.isStreaming ?? undefined
    }, [loadingIsStreaming, loadingIsStreamingChanged, isStreamingChanged?.isStreamingChanged?.isStreaming, isStreamingData?.streaming?.isStreaming])
}
