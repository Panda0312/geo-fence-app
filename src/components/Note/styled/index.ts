import styled from "styled-components";

export const OperationNote = styled.div`
  font-size: 16px;
  height: calc(100% - 100px);
  overflow: hidden;
  color: #fff;
  position: relative;
`;

export const ScrollRoot = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  position: absolute;
`;

export const ScrollContent = styled.div`
  width: 200px;
  height: 100%;
  padding: 4px;
`;
