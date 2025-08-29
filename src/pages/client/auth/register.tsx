import { useState } from "react";
import type { FormProps } from "antd";
import { App, Button, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "@/services/api";

type FieldType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {
  // const [messageApi, contextHolderMessage] = message.useMessage();
  const { message } = App.useApp();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    setIsSubmit(true);

    const { fullName, email, password, phone } = values;

    const res = await registerAPI(fullName, email, password, phone);
    // console.log(res);

    if (res.data) {
      message.success("Đăng ký thành công!");
      navigate("/login");
    } else {
      message.error(res.message);
    }
    setIsSubmit(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#F0F4F7",
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
