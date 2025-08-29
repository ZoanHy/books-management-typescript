import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, DatePicker } from "antd";
import { useRef, useState } from "react";
import { getUserAPI } from "@/services/api";
import dayjs from "dayjs";
import { dateRangeValidate, FORMAT_DATE } from "@/services/helper";
import UserDetail from "@/components/admin/user/user.detail";

type TSearch = {
  fullName: string;
  email: string;
  createdAt: string;
  createdAtRange: string;
};

const TableUser = () => {
  const actionRef = useRef<ActionType>(null);
  const [openUserDetail, setOpenUserDetail] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<IUserTable | null>(null);

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

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
      render: (_, record) => (
        <a
          href="#!"
          onClick={() => {
            setUserDetail(record);
            setOpenUserDetail(true);
          }}
        >
          {record._id}
        </a>
      ),
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
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "Created at",
      dataIndex: "createdAtRange",
      valueType: "dateRange",
      hideInTable: true,
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

  return (
    <>
      <ProTable<IUserTable, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          // filter
          let query = "";

          if (params) {
            query = `current=${params.current}&pageSize=${params.pageSize}`;

            if (params.fullName) {
              query += `&fullName=/${params.fullName}/i`;
            }

            if (params.email) {
              query += `&email=/${params.email}/i`;
            }

            const createdDateRange = dateRangeValidate(params.createdAtRange);
            if (createdDateRange) {
              query += `&createdAt>=${createdDateRange[0]}&createdAt<=${createdDateRange[1]}`;
            }
          }

          if (sort) {
            if (sort.createdAt) {
              if (sort.createdAt === "ascend") {
                query += `&sort=createdAt`;
              } else {
                query += `&sort=-createdAt`;
              }
            }
          }

          console.log(query);

          // load data users
          const res = await getUserAPI(query);
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

      {/* show drawer */}
      <UserDetail
        openUserDetail={openUserDetail}
        setOpenUserDetail={setOpenUserDetail}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
      />
    </>
  );
};
export default TableUser;
