import { useCallback, useEffect, useRef, useState } from 'react'
import { LatLngTuple, LeafletMouseEvent, LeafletMouseEventHandlerFn, Map } from 'leaflet'
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { Tweet } from 'react-twitter-widgets'
import { Button, Col, Divider, Input, InputNumber, Row, Space, Tooltip } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'

import { GeoLocTypeQl } from '../../generated/graphql'
import { useGetFilteredTweetsHook } from '../hooks/useGetFilteredTweetsHook'
import { useNumberUrlState } from '../hooks/urlState'

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

    const [geoLocation, setGeoLocation] = useState<LatLngTuple>([50, 12])
    const [radiusKm, setRadiusKm] = useNumberUrlState('radiusKm', 300)
    const [locating, setLocating] = useState<boolean>(false)

    const { data } = useGetFilteredTweetsHook({
        onlyWithGeo: true,
        geoFilter: { latitude: geoLocation[0], longitude: geoLocation[1], radiusKm: radiusKm },
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
                        {tweetsWithGeo && tweetsWithGeo.map((t) => <TweetLocationMarker key={t?.id} tweetId={t?.id!} latitude={t?.geoLoc?.latitude!} longitude={t?.geoLoc?.longitude!} />)}
                        <CenterMap center={geoLocation} />
                        <CircularAreaSelector clickHandler={ch} />
                        <Circle center={geoLocation} radius={radiusKm * 1000}></Circle>
                    </MapContainer>
                </div>
            </Row>
        </div>
    )
}
