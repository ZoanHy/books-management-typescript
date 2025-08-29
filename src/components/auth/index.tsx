import { useCurrentApp } from "@/components/context/app.context";
import { Button, Result } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();
  // console.log(location.pathname);

  if (!isAuthenticated) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Bạn cần đăng nhập để truy cập trang này."
        extra={
          <Button type="primary">
            <Link to="/login">Quay về trang đăng nhập</Link>
          </Button>
        }
      />
    );
  }

  const isAdminRoute = location.pathname.includes("admin");

  if (isAuthenticated && isAdminRoute) {
    const role = user?.role;

    if (role === "USER") {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Bạn không có quyền truy cập trang này."
          extra={
            <Button type="primary">
              <Link to="/">Quay về trang chủ</Link>
            </Button>
          }
        />
      );
    }
  }

  return <div>{props.children}</div>;
};

export default ProtectedRoute;
