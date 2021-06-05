import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerProps,
} from '@react-google-maps/api'
import { DateTime } from 'luxon'
import { useEffect, useRef, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 35.1815,
  lng: 136.9066,
} // 名古屋

const tokushima = {
  lat: 34.1345023,
  lng: 134.6157278,
}

const tokyo = {
  lat: 35.5493932,
  lng: 139.7776499,
}

// TODO: update these times after fixed
const startingTime = DateTime.local(2021, 6, 5, 19, 0)
const endingTime = DateTime.local(2021, 6, 5, 20, 0)

const IndexPage = () => {
  const [markerPosition, setMarkerPosition] = useState(tokyo)

  useEffect(() => {
    setTimeout(() => {
      const currentTime = DateTime.local()

      if (
        currentTime.toSeconds() < startingTime.toSeconds() ||
        currentTime.toSeconds() > endingTime.toSeconds()
      ) {
        return
      }

      const ratio =
        (currentTime.toSeconds() - startingTime.toSeconds()) /
        (endingTime.toSeconds() - startingTime.toSeconds())
      setMarkerPosition({
        lat: tokyo.lat + (tokushima.lat - tokyo.lat) * ratio,
        lng: tokyo.lng + (tokushima.lng - tokyo.lng) * ratio,
      })
    }, 1000)
  }, [setMarkerPosition, markerPosition])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7.5}>
        <Marker position={markerPosition}></Marker>
      </GoogleMap>
    </LoadScript>
  )
}

export default IndexPage
