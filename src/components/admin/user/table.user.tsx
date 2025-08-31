import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, DatePicker } from "antd";
import { use, useEffect, useRef, useState } from "react";
import { getUserAPI } from "@/services/api";
import dayjs from "dayjs";
import { dateRangeValidate, FORMAT_DATE_DEFAULT } from "@/services/helper";
import UserDetail from "@/components/admin/user/user.detail";
import ModalUser from "@/components/admin/user/modal.user";
import ImportUserModal from "@/components/admin/user/data/import.user";
import { CSVLink, CSVDownload } from "react-csv";
import UpdateUser from "@/components/admin/user/update.user";

type TSearch = {
  fullName: string;
  email: string;
  createdAt: string;
  createdAtRange: string;
};

const TableUser = () => {
  const actionRef = useRef<ActionType>(null);

  // view user detail
  const [openUserDetail, setOpenUserDetail] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<IUserTable | null>(null);
  const [userDetailUpdate, setUserDetailUpdate] = useState<IUserTable | null>(
    null
  );

  // create user
  const [isModalUserOpen, setIsModalUserOpen] = useState<boolean>(false);

  // import user
  const [isModalImportUserOpen, setIsModalImportUserOpen] =
    useState<boolean>(false);

  // export user
  const [userExport, setUserExport] = useState<IUserTable[]>([]);

  // update user
  const [isModalUserUpdateOpen, setIsModalUserUpdateOpen] =
    useState<boolean>(false);

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
          onClick={() => {
            setUserDetailUpdate(record);
            setIsModalUserUpdateOpen(true);
          }}
        />,
        <DeleteOutlined
          key="delete"
          style={{ color: "red", cursor: "pointer" }}
        />,
      ],
    },
  ];

  const refreshTableUser = () => {
    actionRef.current?.reload();
  };

  // export user

  const handleExportUser = () => {
    console.log("userExport", userExport);

    let arrUser: any[] = [];

    arrUser.push([
      "_id",
      "fullName",
      "email",
      "phone",
      "role",
      "avatar",
      "createdAt",
      "updatedAt",
    ]);

    arrUser = [
      arrUser,
      ...userExport.map((user) => [
        user._id,
        user.fullName,
        user.email,
        user.phone,
        user.role,
        user.avatar,
        dayjs(user.createdAt).format(FORMAT_DATE_DEFAULT),
        dayjs(user.updatedAt).format(FORMAT_DATE_DEFAULT),
      ]),
    ];

    console.log("arrUser", arrUser);

    setUserExport(arrUser);
  };

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

          // default
          query += `&sort=-createdAt`;

          if (sort) {
            if (sort.createdAt) {
              if (sort.createdAt === "ascend") {
                query += `&sort=createdAt`;
              } else {
                query += `&sort=-createdAt`;
              }
            }
          }

          // console.log(query);

          // load data users
          const res = await getUserAPI(query);
          if (res.data) {
            setMeta(res.data.meta);
            setUserExport(res.data.result);
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
            icon={<ExportOutlined />}
            onClick={handleExportUser}
            type="primary"
          >
            <CSVLink data={userExport} filename={"user.csv"}>
              Export
            </CSVLink>
          </Button>,

          <Button
            key="button"
            icon={<CloudUploadOutlined />}
            onClick={() => {
              setIsModalImportUserOpen(true);
            }}
            type="primary"
          >
            Import
          </Button>,

          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
              setIsModalImportUserOpen(true);
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

      {/* show modal create user */}
      <ModalUser
        isModalUserOpen={isModalUserOpen}
        setIsModalUserOpen={setIsModalUserOpen}
        refreshTableUser={refreshTableUser}
      />

      {/* show modal import user */}
      <ImportUserModal
        isModalImportUserOpen={isModalImportUserOpen}
        setIsModalImportUserOpen={setIsModalImportUserOpen}
        refreshTableUser={refreshTableUser}
      />

      {/* show modal update user */}
      <UpdateUser
        isModalUserUpdateOpen={isModalUserUpdateOpen}
        setIsModalUserUpdateOpen={setIsModalUserUpdateOpen}
        userDetailUpdate={userDetailUpdate}
        setUserDetailUpdate={setUserDetailUpdate}
        refreshTableUser={refreshTableUser}
      />
    </>
  );
};
export default TableUser;
