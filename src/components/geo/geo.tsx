import { useState } from 'react'
import { LatLng, LatLngExpression, LatLngLiteral } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import { Tweet } from 'react-twitter-widgets'

import { GeoLocTypeQl, SortField, SortOrder, useGetTweetsQuery } from '../../generated/graphql'
import { useGetFilteredTweetsHook } from '../hooks/useGetFilteredTweetsHook'

const LocationMarker = () => {
    const [position, setPosition] = useState<LatLng | undefined>(undefined)
    const map = useMapEvents({
        click: (e) => {
            map.flyTo(e.latlng, map.getZoom())
            setPosition(e.latlng)
        },
    })

    return position ? (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    ) : (
        <></>
    )
}

const TweetLocationMarker = ({ tweetId, latitude, longitude }: GeoLocTypeQl & { tweetId: string }) => {
    const [showTweet, setShowTweet] = useState(false)
    return (
        <Marker position={{ lat: latitude!, lng: longitude! }}>
            <Popup maxWidth="auto">
                <Tweet tweetId={tweetId} />
            </Popup>
        </Marker>
    )
}

export const Geo = () => {
    const [authorId, setAuthorId] = useState<string | undefined>(undefined)
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [tweetId, setTweetId] = useState<string | undefined>(undefined)
    const [searchText, setSearchText] = useState<string | undefined>(undefined)
    const [hashtags, setHashtags] = useState<string[] | undefined>(undefined)

    const [startingFrom, setStartingFrom] = useState<Date | undefined>(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))
    const [upTo, setUpTo] = useState<Date | undefined>(undefined)

    const [pageSize, setPageSize] = useState<number | undefined>(10)
    const [pageNumber, setPageNumber] = useState<number | undefined>(0)

    const [sortField, setSortField] = useState<SortField | undefined>(SortField.Username)
    const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(SortOrder.Ascending)

    const [showAddHashtag, setShowAddHashtag] = useState(false)
    const [currentHashtag, setCurrentHashtag] = useState<string | undefined>(undefined)

    const { data, loading } = useGetFilteredTweetsHook({
        authorId: authorId,
        username: username,
        tweetId: tweetId,
        searchTerm: searchText,
        onlyWithGeo: true,
        hashtags: hashtags,
        startingFrom: startingFrom,
        upTo: upTo,
        // pageSize: pageSize,
        // pageNumber: pageNumber,
        sortField: sortField,
        sortOrder: sortOrder,
    })

    const tweetsWithGeo = data?.tweet?.find?.tweets?.filter((t) => t?.geoLoc)

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh' }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {tweetsWithGeo && tweetsWithGeo.map((t) => <TweetLocationMarker key={t?.id} tweetId={t?.id!} latitude={t?.geoLoc?.latitude!} longitude={t?.geoLoc?.longitude!} />)}
            </MapContainer>
        </div>
    )
}
