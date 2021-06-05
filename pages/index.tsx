import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 35.1815,
  lng: 136.9066,
} // 名古屋

const IndexPage = () => (
  <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7.5}
    ></GoogleMap>
  </LoadScript>
)

export default IndexPage
