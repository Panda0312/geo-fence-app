import { Button, Col, ColorPicker, Input, Row, Space } from "antd";
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
import { FENCE_STORAGE_KEY } from "@/store/constant";

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
    if (pendingPaths.length > 2) {
      setSavdFences(fences => {
        const map = new Map(fences);
        const curFence = {
          paths: pendingPaths,
          lineColor,
          fillColor,
          name: fenceName,
          createAt: new Date().getTime(),
        };
        const hash = SHA256(JSON.stringify(curFence)).toString();
        map.set(hash, curFence);
        localStorage.setItem(
          FENCE_STORAGE_KEY,
          JSON.stringify(Array.from(map))
        );
        return map;
      });
    }
    cancelDrawing();
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
        <Col span={10} className="label">
          line color:
        </Col>
        <Col span={8}>
          <ColorPicker
            value={lineColor}
            onChange={value => {
              setLineColor(value.toHexString());
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10} className="label">
          fill color:
        </Col>
        <Col span={8}>
          <ColorPicker
            value={fillColor}
            onChange={value => {
              setFillColor(value.toHexString());
            }}
          />
        </Col>
      </Row>
      <Space>
        <Button onClick={cancelDrawing}>Cancel</Button>
        <Button type="primary" onClick={saveFence}>
          Complete
        </Button>
      </Space>
    </FenceConfigWrapper>
  );
};
