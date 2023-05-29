import { Col, ColorPicker, Input, Row } from "antd";
import { useAtomValue, useSetAtom } from "jotai";

import { selectedFenceInfo, updateSelectedFence } from "@/store";

import { FenceInfoWrap } from "./styled";

export const FenceInfo = () => {
  const selectedFence = useAtomValue(selectedFenceInfo);
  const updateFence = useSetAtom(updateSelectedFence);

  if (!selectedFence) {
    return null;
  } else {
    const { name, lineColor, fillColor } = selectedFence;

    return (
      selectedFence && (
        <FenceInfoWrap>
          <Row>
            <Input
              placeholder="Fence Name"
              value={name}
              onChange={e => {
                updateFence({ name: e.target.value });
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
                  updateFence({ lineColor: value.toHexString() });
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
                  updateFence({ fillColor: value.toHexString() });
                }}
              />
            </Col>
          </Row>
        </FenceInfoWrap>
      )
    );
  }
};
