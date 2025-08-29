import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";
import { getUserAPI } from "@/services/api";

const columns: ProColumns<IUserTable>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "Id",
    dataIndex: "_id",
    search: false,
    render: (_, record) => <a href="#!">{record._id}</a>,
  },
  {
    title: "Fullname",
    dataIndex: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    copyable: true,
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
  },
  {
    title: "Action",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <EditOutlined
        key="edit"
        style={{ color: "orange", cursor: "pointer", marginRight: 15 }}
      />,
      <DeleteOutlined
        key="delete"
        style={{ color: "red", cursor: "pointer" }}
      />,
    ],
  },
];

const TableUser = () => {
  const actionRef = useRef<ActionType>(null);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  return (
    <ProTable<IUserTable>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        // console.log(params, sort, filter);
        // load data users
        const res = await getUserAPI(
          params?.current ?? 1,
          params?.pageSize ?? 5
        );
        if (res.data) {
          setMeta(res.data.meta);
        }
        return {
          data: res.data?.result,
          page: 1,
          success: true,
          total: res.data?.meta.total,
        };
      }}
      rowKey="_id"
      pagination={{
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} trên ${total} rows`,
        pageSize: meta.pageSize,
        current: meta.current,
        total: meta.total,
        showSizeChanger: true,
      }}
      dateFormatter="string"
      headerTitle="Table User"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          Add new
        </Button>,
      ]}
    />
  );
};
export default TableUser;
