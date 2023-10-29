import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Skeleton,
  Space,
  Switch,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest } from "~/interfaces/nhanVien.type";
import request from "~/utils/request";
const { confirm } = Modal;
const UpdateNhanVien: React.FC = () => {
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  useEffect(() => {
    const getOne = async () => {
      setLoadingForm(true);
      try {
        const res = await request.get("nhan-vien/" + id);
        const trangThaiValue =
          res.data?.trangThai.ten === "ACTIVE" ? true : false;
        form.setFieldsValue({
          ten: res.data?.ten,
          trangThai: trangThaiValue,
        });
        setLoadingForm(false);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    getOne();
  }, [id]);
  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật nhân viên này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await request.put("nhan-vien/" + id, {
            hoVaTen: values.hoVaTen,
            trangThai: values.trangThai.ten == "ACTIVE" ? "ACTIVE" : "INACTIVE",
          });
          if (res.data) {
            message.success("Cập nhật loại đế thành công");
            navigate("/admin/nhan-vien");
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Cập nhật nhân viên thất bại");
          }
        }
      },
    });
  };
  return (
    <>
      <Card title="CẬP NHẬT NHÂN VIÊN">
        <Skeleton loading={loadingForm}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish}
            layout="horizontal"
            form={form}
          >
            <Form.Item
              name="hoVaTen"
              label="Tên"
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: "Vui lòng nhập tên nhân viên!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="trangThai"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch size="small" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 17 }}>
              <Space>
                <Button type="dashed" htmlType="reset">
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Skeleton>
      </Card>
    </>
  );
};

export default UpdateNhanVien;
