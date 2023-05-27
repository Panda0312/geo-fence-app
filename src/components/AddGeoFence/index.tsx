import { useAtom } from "jotai";

import { showFenceConfig } from "@/store";

import { FenceConfig } from "./FenceConfig";
import { AddFenceBtn, Wrapper } from "./styled";

export const AddGeoFence = () => {
  const [isFenceConfigOpen, setIsFenceConfigOpen] = useAtom(showFenceConfig);

  return (
    <Wrapper>
      <AddFenceBtn onClick={() => setIsFenceConfigOpen(true)}>
        Add GeoFence
      </AddFenceBtn>
      {isFenceConfigOpen && <FenceConfig />}
    </Wrapper>
  );
};
