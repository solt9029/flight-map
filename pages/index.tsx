import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 18.48,
  lng: 121.85,
}

const goal = {
  lat: 1.338442,
  lng: 103.983679,
}

const startingPoint = {
  lat: 35.638195,
  lng: 139.727959,
}

// TODO: update these times after fixed
const startingTime = DateTime.local(2022, 4, 23, 15, 15)
const endingTime = DateTime.local(2022, 4, 23, 17, 30)

const IndexPage = () => {
  const [markerPosition, setMarkerPosition] = useState(startingPoint)
  const [iconSize, setIconSize] = useState(undefined)

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
        lat: startingPoint.lat + (goal.lat - startingPoint.lat) * ratio,
        lng: startingPoint.lng + (goal.lng - startingPoint.lng) * ratio,
      })
    }, 1000)
  }, [setMarkerPosition, markerPosition])

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      onLoad={() => {
        // NOTE: google is not defined before loaded
        setIconSize(new window.google.maps.Size(50, 50))
      }}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4.5}>
        {process.browser && (
          <Marker
            position={markerPosition}
            icon={{
              url: 'https://hosting.photobucket.com/images/i/photo_solt/airplane.png',
              scaledSize: iconSize,
            }}
          ></Marker>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default IndexPage
