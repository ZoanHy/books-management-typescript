import { getBookAPI } from "@/services/api";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Popconfirm, Space, Tag } from "antd";
import { useRef, useState } from "react";

interface TSearch {
  mainText: string;
  author: string;
}

const TableBook = () => {
  const actionRef = useRef<ActionType>(null);

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  const columns: ProColumns<IBookTable>[] = [
    {
      title: "Id",
      dataIndex: "_id",
      search: false,
      render: (_, record) => (
        <a href="#!" onClick={() => {}}>
          {record._id}
        </a>
      ),
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      hideInSearch: true,
      sorter: true,
      render: (_, record) => {
        return <span>{record.price.toLocaleString()} đ</span>;
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      hideInSearch: true,
      sorter: true,
      valueType: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      valueType: "option",
      key: "option",
      render: (_, record) => [
        <EditOutlined
          key="edit"
          style={{ color: "orange", cursor: "pointer", marginRight: 8 }}
          onClick={() => {}}
        />,
        <Popconfirm
          title="Xác nhận xóa người dùng"
          description="Bạn có chắc chắn muốn xóa người dùng này?"
          onConfirm={() => {}}
          okButtonProps={{}}
          onCancel={() => {}}
          okText="Xác nhận"
          cancelText="Hủy"
          placement="left"
        >
          <DeleteOutlined
            key="delete"
            style={{ color: "red", cursor: "pointer" }}
          />
          ,
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<IBookTable, TSearch>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        let query = "";

        if (params) {
          query = `current=${params.current}&pageSize=${params.pageSize}`;

          if (params.mainText) {
            query += `&mainText=/${params.mainText}/i`;
          }

          if (params.author) {
            query += `&author=/${params.author}/i`;
          }
        }

        if (sort) {
          if (sort.mainText) {
            query +=
              sort.mainText === "ascend" ? `&sort=mainText` : `&sort=-mainText`;
          }

          if (sort.category) {
            query +=
              sort.category === "ascend" ? `&sort=category` : `&sort=-category`;
          }

          if (sort.price) {
            query += sort.price === "ascend" ? `&sort=price` : `&sort=-price`;
          }

          if (sort.createdAt) {
            query +=
              sort.createdAt === "ascend"
                ? `&sort=createdAt`
                : `&sort=-createdAt`;
          }
        }

        const res = await getBookAPI(query);

        if (res.data) {
          setMeta(res.data.meta);
        }

        return {
          data: res.data?.result,
          total: res.data?.meta.total,
          success: true,
          page: 1,
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
      headerTitle="Table book"
      toolBarRender={() => [
        <Button key="button" icon={<ExportOutlined />} type="primary">
          Export
        </Button>,

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

export default TableBook;
