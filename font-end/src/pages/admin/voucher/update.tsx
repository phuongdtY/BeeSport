import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  message,
} from "antd";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest } from "~/interfaces/mauSac.type";
import request from "~/utils/request";
const { confirm } = Modal;
const UpdateVoucher: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  useEffect(() => {
    const getOne = async () => {
      try {
        const res = await request.get("voucher/" + id);
        const trangThaiValue =
          res.data?.trangThai.ten === "ACTIVE" ? true : false ;
        form.setFieldsValue({
          ma: res.data?.ma,
          ten: res.data?.ten,
          trangThai: trangThaiValue,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getOne();
  }, [id]);
  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc thêm voucher này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          await request.put("mau-sac/" + id, {
            ma: values.ma,
            ten: values.ten,
            trangThai: values.trangThai == true ? "ACTIVE" : "INACTIVE",
          });

          setLoading(false);
          message.success("Cập nhật voucher thành công");
          navigate("/admin/voucher");
        } catch (error: any) {
          console.log(error);
          message.error(error.response.data.message);
          setLoading(false);
        }
      },
    });
  };
  return (
    <>
      <Card title="THÊM VOUCHER">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          layout="horizontal"
          form={form}
        >
          <Form.Item
            name="ma"
            label="Mã"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Vui lòng nhập mã voucher!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ten"
            label="Tên"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Vui lòng nhập tên voucher!",
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UpdateVoucher;
