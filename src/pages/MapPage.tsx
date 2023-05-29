import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useAtomValue, useAtom } from "jotai";
import { useCallback, useState } from "react";

import { Fences } from "@/components/Fences";
import { FenceTools } from "@/components/FenceTools";
import { PendingFence } from "@/components/PendingFence";
import { pendingFencePaths, pendingPoint, showFenceConfig } from "@/store";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const API_KEY = process.env.REACT_APP_REACT_APP_GMAP_API_KEY ?? "";

const MapPage = () => {
  const [pendingPaths, setPendingPaths] = useAtom(pendingFencePaths);
  const isFenceConfigOpen = useAtomValue(showFenceConfig);
  const [movingPoint, setMovingPoint] = useAtom(pendingPoint);
  const [isPaused, setIsPaused] = useState(false);
  const [center, setCenter] = useState({ lat: 24.886, lng: -70.268 });

  const [mapref, setMapRef] = useState<google.maps.Map | null>(null);
  const mapLoadHandler = (map: google.maps.Map) => {
    setMapRef(map);
  };

  const mapClickHandler = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (isFenceConfigOpen && e.latLng) {
        const path = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setPendingPaths(paths => [...paths, path]);
        setMovingPoint(null);
        const curCenter = mapref?.getCenter();
        if (curCenter) {
          // work around for mousemove event exception
          const centerCoord = { lat: curCenter.lat(), lng: curCenter.lng() };
          setCenter({
            ...centerCoord,
            lat: centerCoord.lat + 0.000000000000001,
          });
          setCenter({
            ...centerCoord,
            lat: centerCoord.lat - 0.000000000000001,
          });
        }
        isPaused && setIsPaused(false);
      }
    },
    [isFenceConfigOpen, isPaused]
  );

  const drawingMoveHandler = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng && pendingPaths.length > 0 && !isPaused) {
        const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setMovingPoint(point);
      }
    },
    [pendingPaths, isPaused]
  );

  const drawingPauseHandler = (e: google.maps.MapMouseEvent) => {
    if (e.latLng && pendingPaths.length > 0) {
      // should not add latlng for double click, because click will also trigger here
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
        onLoad={mapLoadHandler}
        onClick={mapClickHandler}
        onDblClick={drawingPauseHandler}
        onMouseMove={drawingMoveHandler}
      >
        <FenceTools />
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
