import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useGetTweetsQuery } from '../../generated/graphql'

export const Geo = () => {
    const { data } = useGetTweetsQuery({ variables: { filter: { onlyWithGeo: true, pageSize: 100, pageNumber: 0 } } })

    if (data) {
        const tweetsWithGeo = data.tweet?.find?.tweets?.filter((t) => t?.geoLoc)
        if (tweetsWithGeo) {
            console.log(tweetsWithGeo)
        }
    }

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
