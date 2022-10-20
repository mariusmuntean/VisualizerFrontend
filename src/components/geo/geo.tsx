import { useCallback, useEffect, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Tweet } from 'react-twitter-widgets'
import { Button, Col, Input, Row, Select, Space } from 'antd'
const { Option } = Select
import { AimOutlined } from '@ant-design/icons'

import { GeoLocTypeQl, SortField, SortOrder } from '../../generated/graphql'
import { useGetFilteredTweetsHook } from '../hooks/useGetFilteredTweetsHook'

const CenterMap = ({ center }: { center: LatLngTuple }) => {
    const map = useMap()

    map.setView(center, map.getZoom(), { animate: true, duration: 1 })

    return null
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

    const [geoLocation, setGeoLocation] = useState<LatLngTuple>([50, 12])
    const [radiusKm, setRadiusKm] = useState<number>(5)

    const { data, loading } = useGetFilteredTweetsHook({
        authorId: authorId,
        username: username,
        tweetId: tweetId,
        searchTerm: searchText,
        onlyWithGeo: true,
        geoFilter: { latitude: geoLocation[0], longitude: geoLocation[1], radiusKm: radiusKm },
        hashtags: hashtags,
        startingFrom: startingFrom,
        upTo: upTo,
        // pageSize: pageSize,
        // pageNumber: pageNumber,
        sortField: sortField,
        sortOrder: sortOrder,
    })

    useEffect(() => {
        tryCenterAtCurrentLocation()
    }, [])

    const tryCenterAtCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.dir(position)
                setGeoLocation([position.coords.latitude, position.coords.longitude])
            })
        }
    }, [setGeoLocation])

    const tweetsWithGeo = data?.tweet?.find?.tweets?.filter((t) => t?.geoLoc)

    // ToDo: click on map and draw circle with 5KM radius. Let user change radius. Use that as a search filter.

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', margin: '0.5em' }}>
            <Row>
                <Col>
                    <Space>
                        <Input addonBefore="Latitude" defaultValue={0} value={geoLocation?.[0]} onChange={(e) => setGeoLocation([Number(e.target.value), geoLocation[1]])}></Input>
                        <Input addonBefore="Longitude" defaultValue={0} value={geoLocation?.[1]} onChange={(e) => setGeoLocation([geoLocation[0], Number(e.target.value)])}></Input>
                        <Input addonBefore="Radius" defaultValue={0} value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))}></Input>
                        <Button icon={<AimOutlined />} onClick={() => tryCenterAtCurrentLocation()}></Button>
                    </Space>
                </Col>
                <Col>{/* <Select showSearch placeholder={'Munich, Germany'} onSearch={onSearch}></Select> */}</Col>
            </Row>
            <Row>
                <div id="map" style={{ width: '100%', height: '100%' }}>
                    <MapContainer center={geoLocation} zoom={13} scrollWheelZoom={true} style={{ height: '100vh' }}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {tweetsWithGeo && tweetsWithGeo.map((t) => <TweetLocationMarker key={t?.id} tweetId={t?.id!} latitude={t?.geoLoc?.latitude!} longitude={t?.geoLoc?.longitude!} />)}
                        <CenterMap center={geoLocation} />
                    </MapContainer>
                </div>
            </Row>
        </div>
    )
}
