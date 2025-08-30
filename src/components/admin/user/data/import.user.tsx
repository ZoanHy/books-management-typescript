import React, { useState } from "react";
import { App, Button, Modal } from "antd";
import type { UploadProps } from "antd/lib";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import TableImportUser from "@/components/admin/user/data/table.import.user";

interface IFileRequest {
  file: File;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

interface IProps {
  isModalImportUserOpen: boolean;
  setIsModalImportUserOpen: (v) => void;
}

const ImportUserModal = (props: IProps) => {
  const { message } = App.useApp();

  const { isModalImportUserOpen, setIsModalImportUserOpen } = props;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
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
        maskClosable={false}
        width={"45vw"}
        okText="Import data"
        cancelText="Cancel"
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

        <TableImportUser />
      </Modal>
    </>
  );
};

export default ImportUserModal;
