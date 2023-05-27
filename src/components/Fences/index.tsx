import { Polygon } from "@react-google-maps/api";
import { useAtomValue } from "jotai";

import { savedFences } from "@/store";

export const Fences = () => {
  const fenceMap = useAtomValue(savedFences);

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
              strokeWeight: 2,
              clickable: true,
              draggable: false,
              editable: false,
              geodesic: false,
              zIndex: 1,
            }}
            onClick={e => {
              console.log(entry[0], e);
            }}
          />
        );
      })}
    </>
  );
};
