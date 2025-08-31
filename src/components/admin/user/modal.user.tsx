import React, { useState } from "react";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { createUserAPI } from "@/services/api";
import type { ActionType } from "@ant-design/pro-components";

type FieldType = {
  fullName: string;
  password: string;
  email: string;
  phone: string;
};

interface IProps {
  isModalUserOpen: boolean;
  setIsModalUserOpen: (v: boolean) => void;
  refreshTableUser: () => void;
}

const ModalUser = (props: IProps) => {
  const { message, notification } = App.useApp();

  const [form] = useForm();

  const { isModalUserOpen, setIsModalUserOpen, refreshTableUser } = props;

  const handleFormSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalUserOpen(false);
  };

  const handleCreateUser: FormProps<FieldType>["onFinish"] = async (values) => {
    // console.log("Success:", values);

    const { fullName, email, password, phone } = values;

    const res = await createUserAPI(fullName, email, password, phone);

    if (res.data) {
      message.success("Thêm mới người dùng thành công!");
      setIsModalUserOpen(false);
      form.resetFields();
      refreshTaleUser();
    } else {
      message.error("Thêm mới người dùng thất bại!");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalUserOpen}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
        okText="Thêm mới"
        cancelText="Hủy"
        maskClosable={false}
      >
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={handleCreateUser}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Divider />

          <Form.Item<FieldType>
            label="Tên hiển thị"
            name="fullName"
            rules={[
              { required: true, message: "Tên hiển thị không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
              { required: true, message: "Email không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUser;
