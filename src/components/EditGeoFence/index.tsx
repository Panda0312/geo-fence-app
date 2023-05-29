import { Button } from "antd";
import { useAtom, useSetAtom } from "jotai";

import { deleteFence, fenceOnEdit } from "@/store";

import { FenceInfo } from "./FenceInfo";

export const EditGeoFence = () => {
  const [isEditFence, setIsEditFence] = useAtom(fenceOnEdit);
  const delFence = useSetAtom(deleteFence);

  return (
    <>
      <Button type="primary" onClick={() => setIsEditFence(prev => !prev)}>
        {isEditFence ? "Finish Editing" : "Edit GeoFence"}
      </Button>
      <Button onClick={delFence}>Delete</Button>
      <FenceInfo />
    </>
  );
};
