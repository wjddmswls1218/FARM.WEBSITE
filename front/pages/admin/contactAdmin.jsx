import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Table, message } from "antd";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: fl;
`;

const ContactAdmin = () => {
  // 기본값은 0
  // 0은 전체, 1은 처리 전, 2는 처리 후

  const [selectType, setSelectType] = useState(0);
  const [list, setList] = useState(null);

  const selectTypeHandler = useCallback(
    (value) => {
      setSelectType(value);
    },
    [selectType]
  );
  const getData = async () => {
    const result = await axios.post("http://localhost:4000/api/contact/list", {
      selectType: selectType,
    });

    setList(result.data);
  };

  const dbCompletedHandler = useCallback(async (id) => {
    const result = await axios.post("http://localhost:4000/api/contact/com", {
      id,
    });

    if (result.data.result) {
      message.success("해당 문의가 처리되었습니다.");
      getData();
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [selectType]);

  const column = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "문의제목",
      dataIndex: "name",
    },
    {
      title: "이용가능액",
      dataIndex: "viewPrice",
    },

    {
      title: "연락처",
      dataIndex: "mobile",
    },

    {
      title: "문의 등록일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "처리 현황",
      render: (data) =>
        data.isCompleted ? (
          "-"
        ) : (
          <Button
            type="primary"
            size="small"
            onClick={() => dbCompletedHandler(data.id)}
          >
            처리
          </Button>
        ),
    },
    {
      title: "문의내용",
      render: (data) => (
        <Button type="primary" size="small">
          확인
        </Button>
      ),
    },

    {
      title: "처리 일",
      render: (data) => (data.isCompleted ? data.completed : "-"),
    },
  ];
  return (
    <div>
      <Wrapper>
        <Button
          onClick={() => selectTypeHandler(0)}
          type={selectType === 0 ? "primary" : "default"}
          size="small"
        >
          전체
        </Button>
        <Button
          onClick={() => selectTypeHandler(1)}
          type={selectType === 1 ? "primary" : "default"}
          size="small"
        >
          처리 전
        </Button>
        <Button
          onClick={() => selectTypeHandler(2)}
          type={selectType === 2 ? "primary" : "default"}
          size="small"
        >
          처리 후
        </Button>
      </Wrapper>

      <Table
        rowKey={"id"}
        columns={column}
        dataSource={list ? list : []}
        size="small"
      />
    </div>
  );
};

export default ContactAdmin;
