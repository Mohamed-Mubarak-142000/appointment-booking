import React, { useCallback, useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapDialog from "./map-dailog";
import ConfirmButton from "./confirm-button";
import { MapView } from "./map-view";
import type { MapRef } from "react-map-gl/mapbox";

type MapSelectorProps = {
  onSelect: (location: { lat: number; lng: number; address: string }) => void;
  onClose: () => void;
  initialLocation?: { lat: number; lng: number };
  open: boolean;
};

const MapSelector: React.FC<MapSelectorProps> = ({
  onSelect,
  onClose,
  initialLocation = { lat: 30.0443879, lng: 31.2357257 }, // إحداثيات ميدان التحرير
  open,
}) => {
  const [marker, setMarker] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<MapRef>(null);
  console.log("initialLocation", initialLocation);

  const handleMapClick = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setMarker({ lat, lng });
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`
      );
      const data = await res.json();
      return data?.features?.[0]?.place_name || "عنوان غير معروف";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "تعذر الحصول على العنوان";
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      );
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setMarker({ lat, lng });
        if (mapRef.current) {
          mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });
        }
      }
    } catch (error) {
      console.error("Error searching location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async () => {
    setIsLoading(true);
    try {
      const address = await fetchAddress(marker.lat, marker.lng);
      onSelect({ ...marker, address });
      onClose();
    } catch (error) {
      console.error("Error selecting location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MapDialog
      open={open}
      onClose={onClose}
      title="اختر موقعك على الخريطة"
      coordinates={`الإحداثيات: ${marker.lat.toFixed(4)}, ${marker.lng.toFixed(
        4
      )}`}
      actions={<ConfirmButton isLoading={isLoading} onClick={handleSelect} />}
    >
      <MapView
        marker={marker}
        onMapClick={handleMapClick}
        mapboxToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onSearch={handleSearch}
        ref={mapRef}
      />
    </MapDialog>
  );
};

export default MapSelector;
