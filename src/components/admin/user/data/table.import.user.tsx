import { DownOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button } from "antd";

interface IProps {
  userDataSource: IUserDataImport[];
}

const TableImportUser = (props: IProps) => {
  const { userDataSource } = props;

  const columns: ProColumns<IUserDataImport>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
  ];

  return (
    <ProTable<IUserDataImport>
      dataSource={userDataSource}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle="Dữ liệu upload"
      options={false}
      style={{ marginTop: 24 }}
    />
  );
};

export default TableImportUser;
