import React, { useEffect, useState } from "react";
import {
  App,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import type { FormProps, GetProp, UploadFile, UploadProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { createUserAPI, getCategoryBookAPI } from "@/services/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { MAX_UPLOAD_IMAGE_SIZE } from "@/services/helper";
import type { UploadChangeParam } from "antd/lib/upload";

type FieldType = {
  mainText: string;
  author: string;
  category: string;
  price: number;
  quantity: number;
  thumbnail: string;
  slider: string[];
};

interface IProps {
  isCreateBookModalOpen: boolean;
  setIsCreateBookModalOpen: (v: boolean) => void;
  refreshTableBook: () => void;
}

type FileTypeUpload = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileTypeUpload): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateBook = (props: IProps) => {
  const { message, notification } = App.useApp();

  const [form] = useForm();

  const { isCreateBookModalOpen, setIsCreateBookModalOpen, refreshTableBook } =
    props;

  const [categoryBook, setCategoryBook] = useState<
    { value: string; label: string }[]
  >([]);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [loadingSlider, setLoadingSlider] = useState<boolean>(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileTypeUpload);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = (
    info: UploadChangeParam,
    type: "thumbnail" | "slider"
  ) => {
    if (info.file.status === "uploading") {
      type === "slider" ? setLoadingSlider(true) : setLoadingThumbnail(true);
      return;
    }

    if (info.file.status === "done") {
      type === "slider" ? setLoadingSlider(false) : setLoadingThumbnail(false);
    }
  };

  const handleUploadFile: UploadProps["customRequest"] = ({
    file,
    onSuccess,
    onError,
  }) => {
    // Handle file upload logic here
    setTimeout(() => {
      if (onSuccess) onSuccess("ok");
    }, 1000);
  };

  useEffect(() => {
    fetchCategoryBook();
  }, []);

  // category
  const fetchCategoryBook = async () => {
    const res = await getCategoryBookAPI();
    if (res.data) {
      const resCategory = res.data;
      //   console.log(">>> check category", resCategory);

      setCategoryBook(
        resCategory.map((item) => ({
          value: item,
          label: item,
        }))
      );
    }
  };

  const handleFormSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsCreateBookModalOpen(false);
  };

  const handleCreateUser: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    console.log(">>> check values form:", values);
    setIsSubmit(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const beforeUpload = (file: FileTypeUpload) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt5M = file.size / 1024 / 1024 < MAX_UPLOAD_IMAGE_SIZE;
    if (!isLt5M) {
      message.error(`Image must smaller than ${MAX_UPLOAD_IMAGE_SIZE}MB!`);
    }
    return isJpgOrPng && isLt5M;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Modal
        title="Thêm mới book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isCreateBookModalOpen}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
        okText="Thêm mới"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{ loading: isSubmit }}
        width="40vw"
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

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tên sách"
                name="mainText"
                rules={[
                  { required: true, message: "Tên sách không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType>
                label="Tác giả"
                name="author"
                rules={[
                  { required: true, message: "Tác giả không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Giá tiền"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Giá tiền không được để trống!",
                      },
                    ]}
                  >
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      addonAfter="đ"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {" "}
                  <Form.Item<FieldType>
                    label="Thể loại"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Thể loại không được để trống!",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 120 }}
                      //   onChange={handleChange}
                      options={categoryBook}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Form.Item<FieldType>
                label="Số lượng"
                name="quantity"
                rules={[
                  { required: true, message: "Số lượng không được để trống!" },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Ảnh Thumbnail"
                name="thumbnail"
                rules={[
                  { required: true, message: "Thumbnail không được để trống!" },
                ]}
                // convert value from Upload => form
                valuePropName="fileListThumbnail"
                getValueProps={normFile}
              >
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  maxCount={1}
                  multiple={false}
                  fileList={fileList}
                  customRequest={handleUploadFile}
                  onPreview={handlePreview}
                  onChange={(info) => handleChange(info, "thumbnail")}
                  beforeUpload={beforeUpload}
                >
                  <div>
                    {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Ảnh Slider"
                name="slider"
                rules={[
                  { required: true, message: "Slider không được để trống!" },
                ]}
                // convert value from Upload => form
                valuePropName="fileList"
                getValueProps={normFile}
              >
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  multiple
                  fileList={fileList}
                  customRequest={handleUploadFile}
                  onPreview={handlePreview}
                  onChange={(info) => handleChange(info, "slider")}
                  beforeUpload={beforeUpload}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBook;
