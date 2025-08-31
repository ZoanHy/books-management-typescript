import React, { useEffect, useState } from "react";
import { App, Button, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { updateUserAPI } from "@/services/api";

interface IProps {
  isModalUserUpdateOpen: boolean;
  setIsModalUserUpdateOpen: (v: boolean) => void;
  userDetailUpdate: IUserTable | null;
  setUserDetailUpdate: (v: IUserTable | null) => void;
  refreshTableUser: () => void;
}

type FieldType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
};

const UpdateUser = (props: IProps) => {
  const { message, notification } = App.useApp();

  const {
    isModalUserUpdateOpen,
    setIsModalUserUpdateOpen,
    userDetailUpdate,
    setUserDetailUpdate,
    refreshTableUser,
  } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (userDetailUpdate) {
      form.setFieldsValue({
        _id: userDetailUpdate._id,
        fullName: userDetailUpdate.fullName,
        email: userDetailUpdate.email,
        phone: userDetailUpdate.phone,
      });
    }
  }, [userDetailUpdate]);

  const [form] = useForm();

  const handleFormSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalUserUpdateOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpdateUser: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    console.log(">>> check values: ", values);

    const { _id, fullName, email, phone } = values;

    const res = await updateUserAPI(_id, fullName, email, phone);

    if (res.data) {
      message.success("Cập nhật người dùng thành công!");
      setIsModalUserUpdateOpen(false);
      setUserDetailUpdate(null);
      refreshTableUser();
      form.resetFields();
    } else {
      notification.error({
        message: "Cập nhật người dùng thất bại!",
        description: res.message,
      });
    }

    // refreshTableUser();
    setIsSubmit(false);
  };
  return (
    <>
      {userDetailUpdate ? (
        <>
          <Modal
            title="Cập nhật người dùng"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalUserUpdateOpen}
            onOk={handleFormSubmit}
            onCancel={handleCancel}
            okButtonProps={{ loading: isSubmit }}
            maskClosable={false}
            okText="Cập nhật"
            cancelText="Hủy"
          >
            <Form
              layout="vertical"
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={handleUpdateUser}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Divider />

              <Form.Item<FieldType> label="_id" name="_id" hidden />

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
                <Input disabled />
              </Form.Item>

              <Form.Item<FieldType>
                label="Tên hiển thị"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Tên hiển thị không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateUser;
