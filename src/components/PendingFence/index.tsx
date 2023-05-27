import { Polyline } from "@react-google-maps/api";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

import { currentFillColor, currentLineColor, pendingFencePaths } from "@/store";

import type { TLatlng } from "@/store/types";

// const paths = [
//   { lat: 25.774, lng: -80.19 },
//   { lat: 18.466, lng: -66.118 },
//   { lat: 32.321, lng: -64.757 },
//   { lat: 25.774, lng: -80.19 },
// ];

type TProps = {
  isFenceConfigOpen?: boolean;
  pendingPoint: TLatlng | null;
};

export const PendingFence = (props: TProps) => {
  const { isFenceConfigOpen = false, pendingPoint } = props;

  const [fillColor] = useAtom(currentFillColor);
  const [strokeColor] = useAtom(currentLineColor);
  const paths = useAtomValue(pendingFencePaths);

  const curPath = useMemo(
    () => (pendingPoint ? [...paths, pendingPoint] : [...paths]),
    [paths, pendingPoint]
  );

  const options = useMemo<google.maps.PolylineOptions>(
    () => ({
      strokeColor,
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
    }),
    [fillColor, strokeColor]
  );
  return isFenceConfigOpen ? (
    <Polyline path={curPath} options={options} />
  ) : null;
};
