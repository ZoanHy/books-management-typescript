import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRef } from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { getUserAPI } from "@/services/api";

const columns: ProColumns<IUserTable>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "_id",
    dataIndex: "_id",
  },
  {
    title: "Fullname",
    dataIndex: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
  },
  {
    disable: true,
    title: "状态",
    dataIndex: "state",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "超长".repeat(50) },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
  },
];

const TableUser = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<IUserTable>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        // load data users
        const res = await getUserAPI();
        return {
          data: res.data?.result,
          page: 1,
          success: true,
          total: res.data?.meta.total,
        };
      }}
      rowKey="id"
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
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
