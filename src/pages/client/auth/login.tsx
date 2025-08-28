import { useState } from "react";
import type { FormProps } from "antd";
import { App, Button, Divider, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "@/services/api";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { notification } = App.useApp();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // console.log("Success:", values);

    setIsSubmit(true);

    const { email, password } = values;

    const res = await loginAPI(email, password);
    setIsSubmit(false);

    if (res.data) {
      message.success("Đăng nhập thành công!");

      localStorage.setItem("access_token", res.data.access_token);

      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại!",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        <h1>Đăng nhập</h1>

        <Divider />

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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Đăng nhập
          </Button>
        </Form.Item>

        <Divider>Hoặc</Divider>

        <p style={{ textAlign: "center" }}>
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
