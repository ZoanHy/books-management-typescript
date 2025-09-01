import React, { useState } from "react";
import { Button, Drawer, Badge, Descriptions, Avatar } from "antd";
import type { DescriptionsProps } from "antd";
import dayjs from "dayjs";
import { FORMAT_DATE_DEFAULT, FORMAT_DATE_VN } from "@/services/helper";
import PreviewBook from "@/components/admin/book/detail/preview.book";

interface IProps {
  openBookDetail: boolean;
  setOpenBookDetail: (v: boolean) => void;
  bookDetail: IBookTable | null;
  setBookDetail: (v: IBookTable | null) => void;
}

const BookDetail = (props: IProps) => {
  const { openBookDetail, setOpenBookDetail, bookDetail, setBookDetail } =
    props;

  const showDrawer = () => {
    setOpenBookDetail(true);
  };

  const onClose = () => {
    setBookDetail(null);
    setOpenBookDetail(false);
  };

  // console.log(bookDetail?.slider);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Id",
      children: bookDetail?._id,
      span: 2,
    },
    {
      key: "2",
      label: "Tên sách",
      children: bookDetail?.mainText,
      span: 2,
    },
    {
      key: "3",
      label: "Tác giả",
      children: bookDetail?.author,
      span: 2,
    },
    {
      key: "4",
      label: "Giá tiền",
      children: bookDetail?.price.toLocaleString() + " đ",
      span: 2,
    },
    {
      key: "5",
      label: "Thể loại",
      children: <Badge status="processing" text={bookDetail?.category} />,
      span: 4,
    },
    {
      key: "6",
      label: "Created At",
      children: <>{dayjs(bookDetail?.createdAt).format(FORMAT_DATE_VN)}</>,
      span: 2,
    },
    {
      key: "7",
      label: "Updated At",
      children: dayjs(bookDetail?.updatedAt).format(FORMAT_DATE_VN),
      span: 2,
    },
  ];

  return (
    <>
      {bookDetail && (
        <>
          <Drawer
            title="Chức năng xem chi tiết"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={openBookDetail}
            // open={true}
            width={"50vw"}
            maskClosable={false}
          >
            <Descriptions
              title="Thông tin book"
              bordered
              items={items}
              column={4}
            />

            <PreviewBook bookDetail={bookDetail} />
          </Drawer>
        </>
      )}
    </>
  );
};

export default BookDetail;
