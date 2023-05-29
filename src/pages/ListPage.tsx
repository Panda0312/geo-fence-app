import { Button, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";

import { savedFences } from "@/store";
import { FENCE_STORAGE_KEY } from "@/store/constant";

import type { TFence, TPaths } from "@/store/types";

type TColorProp = {
  color: string;
};
const ColorCell = (props: TColorProp) => {
  const { color } = props;
  return <span style={{ color }}>{color}</span>;
};

type TDataType = TFence & {
  key: React.Key;
};

const columns: ColumnsType<TDataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Line Color",
    dataIndex: "lineColor",
    render: color => <ColorCell color={color} />,
  },
  {
    title: "Fill Color",
    dataIndex: "fillColor",
    render: color => <ColorCell color={color} />,
  },
  {
    title: "Latlng",
    dataIndex: "paths",
    render: (paths: TPaths) => {
      return (
        <>
          {paths.map(({ lat, lng }, idx) => {
            return <Row key={idx}>{`[${lat},${lng}]`}</Row>;
          })}
        </>
      );
    },
  },
  {
    title: "Create At",
    dataIndex: "createAt",
    render: timestamp => <>{new Date(timestamp).toLocaleString()}</>,
  },
];

const ListPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");

  const [fences, setFences] = useAtom(savedFences);

  const data = useMemo(() => {
    return Array.from(fences.entries())
      .map(entry => ({
        key: entry[0],
        ...entry[1],
      }))
      .filter(item => item.name.includes(searchText));
  }, [fences, searchText]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteRows = () => {
    const newFences = new Map(fences);
    selectedRowKeys.forEach(key => newFences.delete(`${key}`));
    setFences(newFences);
    localStorage.setItem(
      FENCE_STORAGE_KEY,
      JSON.stringify(Array.from(newFences))
    );
  };

  return (
    <>
      <Row>
        <Input
          addonBefore="Name"
          placeholder="Enter Fence Name"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
          }}
          style={{ width: "220px", marginRight: "6px" }}
        />
        <Button onClick={deleteRows}>Delete</Button>
      </Row>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
        }}
      />
    </>
  );
};
export default ListPage;
