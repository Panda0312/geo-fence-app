import { Button } from "antd";
import { useAtom } from "jotai";

import { showFenceConfig } from "@/store";

import { FenceConfig } from "./FenceConfig";

export const AddGeoFence = () => {
  const [isFenceConfigOpen, setIsFenceConfigOpen] = useAtom(showFenceConfig);

  return (
    <>
      <Button onClick={() => setIsFenceConfigOpen(true)}>Add GeoFence</Button>
      {isFenceConfigOpen && <FenceConfig />}
    </>
  );
};
