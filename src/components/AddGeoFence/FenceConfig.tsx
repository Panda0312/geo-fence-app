import { Button, ColorPicker, Input, Row } from "antd";
import SHA256 from "crypto-js/sha256";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

import {
  currentFillColor,
  currentLineColor,
  pendingFencePaths,
  pendingPoint,
  savedFences,
  showFenceConfig,
} from "@/store";

import { FenceConfigWrapper } from "./styled";

export const FenceConfig = () => {
  const [lineColor, setLineColor] = useAtom(currentLineColor);
  const [fillColor, setFillColor] = useAtom(currentFillColor);
  const setShowFenceConfig = useSetAtom(showFenceConfig);
  const [pendingPaths, setPendingPaths] = useAtom(pendingFencePaths);
  const setMovingPoint = useSetAtom(pendingPoint);
  const setSavdFences = useSetAtom(savedFences);

  const [fenceName, setFenceName] = useState("");

  const cancelDrawing = () => {
    setPendingPaths([]);
    setMovingPoint(null);
    setShowFenceConfig(false);
  };

  const saveFence = () => {
    setSavdFences(fences => {
      const map = new Map(fences);
      const curFence = {
        paths: pendingPaths,
        lineColor,
        fillColor,
        name: fenceName,
      };
      const hash = SHA256(JSON.stringify(curFence)).toString();
      map.set(hash, curFence);
      return map;
    });
    setPendingPaths([]);
    setMovingPoint(null);
  };

  return (
    <FenceConfigWrapper>
      <Row>
        <Input
          placeholder="Fence Name"
          value={fenceName}
          onChange={e => {
            setFenceName(e.target.value);
          }}
        />
      </Row>
      <Row>
        <label>line color:</label>
        <ColorPicker
          value={lineColor}
          onChange={value => {
            setLineColor(value.toHexString());
          }}
        />
      </Row>
      <Row>
        <label>fill color:</label>
        <ColorPicker
          value={fillColor}
          onChange={value => {
            setFillColor(value.toHexString());
          }}
        />
      </Row>
      <Row>
        <Button onClick={cancelDrawing}>Cancel</Button>
        <Button onClick={saveFence}>Complete</Button>
      </Row>
    </FenceConfigWrapper>
  );
};
