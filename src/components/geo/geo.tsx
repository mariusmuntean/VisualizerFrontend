import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LatLng, LatLngTuple, LeafletMouseEvent, LeafletMouseEventHandlerFn, Map } from 'leaflet'
import { Circle, CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { Tweet } from 'react-twitter-widgets'
import { Button, Col, Divider, Input, InputNumber, Row, Select, Space, Tooltip } from 'antd'
const { Option } = Select
import { AimOutlined, EnvironmentOutlined } from '@ant-design/icons'

import { GeoLocTypeQl, SortField, SortOrder } from '../../generated/graphql'
import { useGetFilteredTweetsHook } from '../hooks/useGetFilteredTweetsHook'

const CenterMap = ({ center }: { center: LatLngTuple }) => {
    const map = useMap()

    map.setView(center, map.getZoom(), { animate: true, duration: 1 })

    return null
}

const CircularAreaSelector = ({ clickHandler }: { clickHandler: LeafletMouseEventHandlerFn }) => {
    useMapEvent('click', clickHandler)
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
    const mapRef = useRef<Map | undefined>(undefined)

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
    const [radiusKm, setRadiusKm] = useState<number>(300)
    const radiusPx = useMemo(() => {
        if (!mapRef?.current) {
            return 0
        }

        const ne = mapRef.current.getBounds().getNorthEast()
        const se = mapRef.current.getBounds().getSouthEast()
        const heightInMeters = ne.distanceTo(se)
        var heightInPixels = mapRef.current.getSize().y

        var pixelsPerMeter = heightInPixels / heightInMeters
        return radiusKm * 1000 * pixelsPerMeter
    }, [radiusKm])
    const [locating, setLocating] = useState<boolean>(false)

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
            setLocating(true)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeoLocation([position.coords.latitude, position.coords.longitude])
                    setLocating(false)
                },
                () => {
                    setLocating(false)
                }
            )
        }
    }, [setGeoLocation])

    const ch: LeafletMouseEventHandlerFn = (event: LeafletMouseEvent) => {
        setGeoLocation([event.latlng.lat, event.latlng.lng])
    }

    const tweetsWithGeo = data?.tweet?.find?.tweets?.filter((t) => t?.geoLoc)

    // ToDo: click on map and draw circle with 5KM radius. Let user change radius. Use that as a search filter.

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', margin: '0.5em' }}>
            <Row>
                <Col>
                    <Space>
                        <Input addonBefore="Latitude" defaultValue={0} value={geoLocation?.[0]} onChange={(e) => setGeoLocation([Number(e.target.value), geoLocation[1]])}></Input>
                        <Input addonBefore="Longitude" defaultValue={0} value={geoLocation?.[1]} onChange={(e) => setGeoLocation([geoLocation[0], Number(e.target.value)])}></Input>
                        <InputNumber addonBefore="Radius" addonAfter="KM" defaultValue={0} value={radiusKm} type="numeric" onChange={(e) => setRadiusKm(e)}></InputNumber>
                        <Divider type="vertical"></Divider>
                        <Tooltip title="Click center at my location">
                            <Button loading={locating} icon={<EnvironmentOutlined />} onClick={() => tryCenterAtCurrentLocation()}></Button>
                        </Tooltip>
                    </Space>
                </Col>
                <Col>{/* <Select showSearch placeholder={'Munich, Germany'} onSearch={onSearch}></Select> */}</Col>
            </Row>
            <Row>
                <div id="map" style={{ width: '100%', height: '100%' }}>
                    <MapContainer ref={mapRef} center={geoLocation} zoom={6} scrollWheelZoom={true} style={{ height: '100vh' }}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {tweetsWithGeo && tweetsWithGeo.map((t) => <TweetLocationMarker key={t?.id} tweetId={t?.id!} latitude={t?.geoLoc?.latitude!} longitude={t?.geoLoc?.longitude!} />)}
                        <CenterMap center={geoLocation} />
                        <CircularAreaSelector clickHandler={ch} />
                        {/* <CircleMarker center={geoLocation} radius={radiusPx}></CircleMarker> */}
                        <Circle center={geoLocation} radius={radiusKm * 1000}></Circle>
                    </MapContainer>
                </div>
            </Row>
        </div>
    )
}
