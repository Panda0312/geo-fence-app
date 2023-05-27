import { Button } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const AddFenceBtn = styled(Button)`
  position: absolute;
  right: 10px;
  top: 4px;
`;

export const FenceConfigWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 44px;
  width: 200px;
  background-color: #fff;
  border-radius: 6px;
  padding: 4px;
`;
