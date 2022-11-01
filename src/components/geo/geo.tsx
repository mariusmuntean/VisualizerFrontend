import { useCallback, useEffect, useRef, useState } from 'react'
import { LatLng, LatLngTuple, LeafletMouseEvent, LeafletMouseEventHandlerFn, Map } from 'leaflet'
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { Marker as LeafletMarker } from 'leaflet'
import { Tweet } from 'react-twitter-widgets'
import { Button, Col, Divider, Input, InputNumber, Row, Space, Tooltip } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'

import { GeoLocTypeQl } from '../../generated/graphql'
import { useGetFilteredTweetsHook } from '../../util/hooks/useGetFilteredTweetsHook'
import { useNumberArrayUrlState, useNumberUrlState, useUrlState } from '../../util/hooks/urlState'

const CenterMap = ({ center }: { center: LatLngTuple }) => {
    const map = useMap()
    map.setView(center, map.getZoom(), { animate: true, duration: 1 })

    return null
}

const CircularAreaSelector = ({ clickHandler }: { clickHandler: LeafletMouseEventHandlerFn }) => {
    useMapEvent('click', clickHandler)
    return null
}

const TweetLocationMarker = ({
    tweetId,
    isInitiallyOpen,
    onOpen,
    latitude,
    longitude,
}: GeoLocTypeQl & { tweetId: string; isInitiallyOpen: boolean; onOpen: (tweetId: string | undefined) => void }) => {
    const markerRef = useRef<LeafletMarker<any>>(null)

    useEffect(() => {
        if (markerRef.current && isInitiallyOpen) {
            markerRef.current.openPopup()
        }
    }, [])

    return (
        <Marker position={{ lat: latitude!, lng: longitude! }} ref={markerRef} eventHandlers={{ popupopen: (e) => onOpen(tweetId) }}>
            <Popup maxWidth="auto">
                <Tweet tweetId={tweetId} />
            </Popup>
        </Marker>
    )
}

const defaultGeo = [50, 12]

export const GeoLocationQueryParamName = 'geoLocation'
export const RadiusQueryParamName = 'radiusKm'
export const OpenTweetIdQueryParamName = 'openTweetId'

export const Geo = () => {
    const mapRef = useRef<Map | undefined>(undefined)

    const [geo, setGeo] = useNumberArrayUrlState(GeoLocationQueryParamName, defaultGeo)
    const geoLocation: LatLngTuple = [geo[0], geo[1]]
    const setGeoLocation = (newGeoLocation: LatLngTuple) => setGeo([newGeoLocation[0], newGeoLocation[1]])

    const [radiusKm, setRadiusKm] = useNumberUrlState(RadiusQueryParamName, 300)
    const [locating, setLocating] = useState<boolean>(false)

    const [openTweetId, setOpenTweetId] = useUrlState(OpenTweetIdQueryParamName, undefined)

    const { data } = useGetFilteredTweetsHook({
        onlyWithGeo: true,
        geoFilter: { latitude: geoLocation[0], longitude: geoLocation[1], radiusKm: radiusKm },
    })

    useEffect(() => {
        // Only auto navigate to the current location if no geoLocation is set. If one is set via the URL then stand still
        if (geo[0] === defaultGeo[0] || geo[1] === defaultGeo[1]) {
            tryCenterAtCurrentLocation()
        }
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
        setGeoLocation([event.latlng.lat, event.latlng.lng] as LatLngTuple)
    }

    const tweetsWithGeo = data?.tweet?.find?.tweets?.filter((t) => t?.geoLoc)

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
            </Row>
            <Row>
                <div id="map" style={{ width: '100%', height: '100%' }}>
                    <MapContainer ref={mapRef} center={geoLocation} zoom={6} scrollWheelZoom={true} style={{ height: '100vh' }}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {tweetsWithGeo &&
                            tweetsWithGeo.map((t) => (
                                <TweetLocationMarker
                                    key={t?.id}
                                    tweetId={t?.id!}
                                    isInitiallyOpen={t?.id === openTweetId}
                                    onOpen={setOpenTweetId}
                                    latitude={t?.geoLoc?.latitude}
                                    longitude={t?.geoLoc?.longitude}
                                />
                            ))}
                        <CenterMap center={geoLocation} />
                        <CircularAreaSelector clickHandler={ch} />
                        <Circle center={geoLocation} radius={radiusKm * 1000}></Circle>
                    </MapContainer>
                </div>
            </Row>
        </div>
    )
}
