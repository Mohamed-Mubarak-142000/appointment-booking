import { forwardRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  type MapRef,
} from "react-map-gl/mapbox";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type MapViewProps = {
  marker: { lat: number; lng: number };
  onMapClick: (e: mapboxgl.MapLayerMouseEvent) => void;
  mapboxToken: string;
  onSearch: (query: string) => void;
};

const mapStyles = [
  {
    label: "الشارع",
    value: "mapbox://styles/mapbox/streets-v12",
  },
  {
    label: "الساتل",
    // value: "mapbox://styles/mapbox/satellite-v9",
    value: "mapbox://styles/mapbox/streets-v11",
  },
  {
    label: "الضوء",
    value: "mapbox://styles/mapbox/light-v11",
  },
  {
    label: "الداكن",
    value: "mapbox://styles/mapbox/dark-v11",
  },
  {
    label: "الملاحة",
    value: "mapbox://styles/mapbox/navigation-day-v1",
  },
  {
    label: "الملاحة ليلاً",
    value: "mapbox://styles/mapbox/navigation-night-v1",
  },
  {
    label: "الطبيعي",
    value: "mapbox://styles/mapbox/outdoors-v12",
  },
];
export const MapView = forwardRef<MapRef, MapViewProps>(
  ({ marker, onMapClick, mapboxToken, onSearch }, ref) => {
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const query = (form.elements.namedItem("search") as HTMLInputElement)
        .value;
      if (query) {
        onSearch(query);
      }
    };

    return (
      <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
        <form
          onSubmit={handleSearch}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        >
          <TextField
            name="search"
            size="small"
            placeholder="ابحث عن موقع..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              width: 300,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </form>

        <Map
          ref={ref}
          initialViewState={{
            longitude: marker.lng,
            latitude: marker.lat,
            zoom: 14,
          }}
          onClick={onMapClick}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyles[1].value}
          mapboxAccessToken={mapboxToken}
        >
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="bottom-right"
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <Marker longitude={marker.lng} latitude={marker.lat} />
        </Map>
      </Box>
    );
  }
);

MapView.displayName = "MapView";

export default MapView;
