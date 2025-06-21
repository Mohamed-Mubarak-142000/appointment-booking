// src/components/map/map-view.tsx
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  markerLocation: { lat: number; lng: number };
};

const DoctorMapView = ({ markerLocation }: Props) => {
  return (
    <Map
      initialViewState={{
        longitude: markerLocation.lng,
        latitude: markerLocation.lat,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      interactive={false}
    >
      <Marker
        longitude={markerLocation.lng}
        latitude={markerLocation.lat}
        color="red"
      />
    </Map>
  );
};

export default DoctorMapView;
