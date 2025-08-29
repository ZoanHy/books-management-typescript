import React, { useState } from "react";
import { Button, Drawer, Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import dayjs from "dayjs";
import { FORMAT_DATE, FORMAT_DATE_VN } from "@/services/helper";

interface IProps {
  openUserDetail: boolean;
  setOpenUserDetail: (v: boolean) => void;
  userDetail: IUserTable | null;
  setUserDetail: (v: IUserTable | null) => void;
}

const UserDetail = (props: IProps) => {
  const { openUserDetail, setOpenUserDetail, userDetail, setUserDetail } =
    props;

  const showDrawer = () => {
    setOpenUserDetail(true);
  };

  const onClose = () => {
    setUserDetail(null);
    setOpenUserDetail(false);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Id",
      children: userDetail?._id,
      span: 2,
    },
    {
      key: "2",
      label: "Tên hiển thị",
      children: userDetail?.fullName,
      span: 2,
    },
    {
      key: "3",
      label: "Email",
      children: userDetail?.email,
      span: 2,
    },
    {
      key: "4",
      label: "Số điện thoại",
      children: userDetail?.phone,
      span: 2,
    },
    {
      key: "5",
      label: "Status",
      children: <Badge status="processing" text={userDetail?.role} />,
      span: 4,
    },
    {
      key: "6",
      label: "Created At",
      children: dayjs(userDetail?.createdAt).format(FORMAT_DATE_VN),
      span: 2,
    },
    {
      key: "7",
      label: "Updated At",
      children: dayjs(userDetail?.updatedAt).format(FORMAT_DATE_VN),
      span: 2,
    },
  ];

  return (
    <>
      {userDetail && (
        <>
          <Button type="primary" onClick={showDrawer}>
            Open
          </Button>
          <Drawer
            title="Chức năng xem chi tiết"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={openUserDetail}
            // open={true}
            width={"50vw"}
            maskClosable={false}
          >
            <Descriptions
              title="Thông tin user"
              bordered
              items={items}
              column={4}
            />
          </Drawer>
        </>
      )}
    </>
  );
};

export default UserDetail;
