import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useAtomValue, useAtom } from "jotai";
import { useState } from "react";

import { AddGeoFence } from "@/components/AddGeoFence";
import { Fences } from "@/components/Fences";
import { PendingFence } from "@/components/PendingFence";
import { pendingFencePaths, pendingPoint, showFenceConfig } from "@/store";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 24.886, lng: -70.268 };

const API_KEY = process.env.REACT_APP_REACT_APP_GMAP_API_KEY ?? "";

const MapPage = () => {
  const [pendingPaths, setPendingPaths] = useAtom(pendingFencePaths);
  const isFenceConfigOpen = useAtomValue(showFenceConfig);
  const [movingPoint, setMovingPoint] = useAtom(pendingPoint);
  const [isPaused, setIsPaused] = useState(false);

  const mapClickHandler = (e: google.maps.MapMouseEvent) => {
    if (isFenceConfigOpen && e.latLng) {
      const path = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setPendingPaths(paths => [...paths, path]);
      isPaused && setIsPaused(false);
    }
  };

  const drawingMoveHandler = (e: google.maps.MapMouseEvent) => {
    if (isFenceConfigOpen && e.latLng && pendingPaths.length > 0 && !isPaused) {
      const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMovingPoint(point);
    }
  };

  const drawingPauseHandler = (e: google.maps.MapMouseEvent) => {
    if (isFenceConfigOpen && e.latLng && pendingPaths.length > 0) {
      const path = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setPendingPaths(paths => [...paths, path]);
      !isPaused && setIsPaused(true);
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          disableDoubleClickZoom: true,
          zoomControl: false,
          fullscreenControl: false,
        }}
        onClick={mapClickHandler}
        onDblClick={drawingPauseHandler}
        onMouseMove={drawingMoveHandler}
      >
        <AddGeoFence />
        <Fences />
        <PendingFence
          isFenceConfigOpen={isFenceConfigOpen}
          pendingPoint={movingPoint}
        />
      </GoogleMap>
    </LoadScript>
  );
};
export default MapPage;
