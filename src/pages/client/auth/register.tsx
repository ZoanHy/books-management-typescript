import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { loginAPI } from "@/services/api";

type FieldType = {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
};

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const res = await loginAPI("admin@gmail.com", "12345");
    console.log(">>> check res", res);
    if (res.data) {
      console.log(res.data.user);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#F0F4F7",
        paddingTop: 50,
      }}
    >
      <Form
        layout="vertical"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{
          width: 600,
          margin: "0 auto",
          padding: "30px 24px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>Đăng ký tài khoản</h1>

        <Divider />

        <Form.Item<FieldType>
          label="Họ tên"
          name="fullName"
          rules={[{ required: true, message: "Họ tên không được để trống!" }]}
        >
          <Input />
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
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
        >
          <Input.Password />
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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Đăng ký
          </Button>
        </Form.Item>

        <Divider>Hoặc</Divider>

        <p style={{ textAlign: "center" }}>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </Form>
    </div>
  );
};

export default RegisterPage;
