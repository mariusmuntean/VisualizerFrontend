import { LatLngTuple } from 'leaflet'

import { GeoLocationQueryParamName, RadiusQueryParamName } from '../components/geo'
import { OpenTweetIdQueryParamName } from '../components/geo/geo'

export const getShowTweetsAtLocationUrl = (geoLocation: LatLngTuple, initiallyOpenTweetId: string | null = null, radiusKm: number = 300) => {
    let url = `/geo?${GeoLocationQueryParamName}=${encodeURIComponent(geoLocation.toString())}`
    if (initiallyOpenTweetId) {
        url += `&${OpenTweetIdQueryParamName}=${encodeURIComponent(initiallyOpenTweetId)}`
    }
    if (radiusKm) {
        url += `&${RadiusQueryParamName}=${encodeURIComponent(radiusKm.toString())}`
    }
    return url
}
