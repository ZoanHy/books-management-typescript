import React, { useState } from "react";
import { App, Button, Modal } from "antd";
import type { UploadProps } from "antd/lib";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import TableImportUser from "@/components/admin/user/data/table.import.user";
import ExcelJS from "exceljs";
import { Buffer } from "buffer";

interface IProps {
  isModalImportUserOpen: boolean;
  setIsModalImportUserOpen: (v: boolean) => void;
}

const ImportUserModal = (props: IProps) => {
  const { message } = App.useApp();

  const { isModalImportUserOpen, setIsModalImportUserOpen } = props;
  const [userDataSource, setUserDataSource] = useState<IUserDataImport[]>([]);

  const showModal = () => {
    setIsModalImportUserOpen(true);
  };

  const handleOk = () => {
    setIsModalImportUserOpen(false);
  };

  const handleCancel = () => {
    setIsModalImportUserOpen(false);
  };

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv";
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isCSV && !isXlsx) {
        message.error("You can only upload CSV or XLSX files!");
      }
      return isCSV || isXlsx;
    },
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        if (onSuccess) onSuccess("ok");
      }, 1000);
    },
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        // console.log(">>> check file done: ", info.file);
        // file done
        console.log(info.file);

        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj as File;
          // js file to excel
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer.buffer);

          // excel to json
          let jsonData: IUserDataImport[] = [];
          workbook.worksheets.forEach(function (sheet) {
            // read first row as data keys
            let firstRow = sheet.getRow(1);
            console.log(firstRow);
            if (!firstRow.cellCount) return;
            let keys: string[] = firstRow.values as string[];
            console.log(keys);

            sheet.eachRow((row, rowNumber) => {
              if (rowNumber == 1) return;
              let values: string[] = row.values as string[];
              let obj: any = {};
              for (let i = 0; i < keys.length; i++) {
                if (keys[i]) {
                  obj[keys[i]] = values[i];
                }
              }
              jsonData.push(obj);
            });
          });

          setUserDataSource(jsonData);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <Modal
        title="Import data user"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalImportUserOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"45vw"}
        okText="Import data"
        cancelText="Cancel"
        okButtonProps={{
          disabled: !userDataSource || userDataSource.length === 0,
        }}
        maskClosable={false}
        destroyOnHidden={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>

        <TableImportUser userDataSource={userDataSource} />
      </Modal>
    </>
  );
};

export default ImportUserModal;
