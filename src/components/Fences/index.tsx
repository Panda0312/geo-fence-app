import { Polygon } from "@react-google-maps/api";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

import {
  fenceIdSelected,
  fenceOnEdit,
  savedFences,
  updateSelectedFence,
} from "@/store";

import type { TFence } from "@/store/types";

export const Fences = () => {
  const fenceMap = useAtomValue(savedFences);
  const isEditFence = useAtomValue(fenceOnEdit);
  const [selectedFence, setSelectedFence] = useAtom(fenceIdSelected);
  const updateFences = useSetAtom(updateSelectedFence);
  const [fenceRefMap, setFenceRefMap] = useState<Map<
    string,
    google.maps.Polygon
  > | null>(null);

  const updateFencePath = () => {
    const fencePath = fenceRefMap?.get(selectedFence);
    if (fencePath) {
      const paths = fencePath
        .getPath()
        .getArray()
        .map(path => ({
          lat: path.lat(),
          lng: path.lng(),
        }));
      updateFences({ paths });
    }
  };

  const fenceEdit = (e: google.maps.MapMouseEvent, entry: [string, TFence]) => {
    updateFencePath();
    if (selectedFence !== entry[0]) {
      setSelectedFence(entry[0]);
    } else {
      setSelectedFence("");
    }
  };

  return (
    <>
      {Array.from(fenceMap, entry => {
        const { paths, lineColor, fillColor } = entry[1];
        return (
          <Polygon
            key={entry[0]}
            path={paths}
            options={{
              fillColor,
              fillOpacity: 1,
              strokeColor: lineColor,
              strokeOpacity: 1,
              strokeWeight: selectedFence === entry[0] ? 4 : 2,
              clickable: true,
              draggable: false,
              editable:
                selectedFence === entry[0] && isEditFence ? true : false,
              geodesic: false,
              zIndex: 1,
            }}
            onLoad={p =>
              setFenceRefMap(prev => {
                const newMap = new Map(prev);
                newMap.set(entry[0], p);
                return newMap;
              })
            }
            onClick={e => fenceEdit(e, entry)}
          />
        );
      })}
    </>
  );
};
