import { LatLngTuple } from 'leaflet'

import { GeoLocationQueryParamName, RadiusQueryParamName } from '../components/geo'

export const getShowTweetsAtLocationUrl = (geoLocation: LatLngTuple, radiusKm: number = 300) => {
    return `/geo?${GeoLocationQueryParamName}=${encodeURIComponent(geoLocation.toString())}&${RadiusQueryParamName}=${radiusKm}`
}
