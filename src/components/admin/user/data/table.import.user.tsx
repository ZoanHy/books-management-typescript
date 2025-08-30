import { DownOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button } from "antd";

const tableListDataSource: IUserTable[] = [];

const columns: ProColumns<IUserTable>[] = [
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

const TableImportUser = () => {
  return (
    <ProTable<IUserTable>
      dataSource={tableListDataSource}
      rowKey="key"
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
