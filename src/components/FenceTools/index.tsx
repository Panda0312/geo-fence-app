import { useAtomValue } from "jotai";

import { fenceIdSelected } from "@/store";

import { AddGeoFence } from "../AddGeoFence";
import { EditGeoFence } from "../EditGeoFence";

import { FenceToolRow } from "./styled";

export const FenceTools = () => {
  const selectedFenceId = useAtomValue(fenceIdSelected);

  return (
    <FenceToolRow>
      <AddGeoFence />
      {selectedFenceId && <EditGeoFence />}
    </FenceToolRow>
  );
};
