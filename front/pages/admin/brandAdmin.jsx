import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const Whole = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  width: calc(50% - 0.5px);
  height: 100%;

  padding: 10px;

  display: flex;
  flex-direction: column;
`;

const Sec = styled.div`
  width: 100%;
`;

const LineBox = styled.div`
  width: 1px;
  height: 100%;

  background-color: #ddd;
`;

const BrandAdmin = () => {
  return (
    <Whole>
      <Wrapper>
        <Sec>left1</Sec>
        <Sec>
          <Input placeholder="Title" />
          <br />
          <br />
          <br />

          <Input placeholder="content" />
          <Input placeholder="content" />
          <Input placeholder="content" />
        </Sec>
      </Wrapper>
      <LineBox />
      <Wrapper>
        <Sec>right1</Sec>
        <Sec>
          <Input placeholder="Title" />
          <br />
          <br />
          <br />

          <Input placeholder="content" />
          <Input placeholder="content" />
          <Input placeholder="content" />
        </Sec>
      </Wrapper>
    </Whole>
  );
};

export default BrandAdmin;
