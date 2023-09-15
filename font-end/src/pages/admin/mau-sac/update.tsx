import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  ColorPicker,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  message,
} from "antd";
import { Color } from "antd/es/color-picker";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest } from "~/interfaces/mauSac.type";
import request from "~/utils/request";
const { confirm } = Modal;
const UpdateMauSac: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [colorHex, setColorHex] = useState<Color | string>("");
  const [form] = Form.useForm();
  const hexString = useMemo(
    () =>
      typeof colorHex === "string"
        ? colorHex.toUpperCase()
        : colorHex.toHexString().toUpperCase(),
    [colorHex]
  );
  let { id } = useParams();
  useEffect(() => {
    const getOne = async () => {
      try {
        const res = await request.get("mau-sac/" + id);
        const trangThaiValue =
          res.data?.trangThai.ten === "ACTIVE" ? true : false;
        form.setFieldsValue({
          ma: res.data?.ma,
          ten: res.data?.ten,
          trangThai: trangThaiValue,
        });
        setColorHex(res.data?.ma);
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
      content: "Bạn có chắc thêm màu sắc này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          await request.put("mau-sac/" + id, {
            ma: hexString,
            ten: values.ten,
            trangThai: values.trangThai == true ? "ACTIVE" : "INACTIVE",
          });

          setLoading(false);
          message.success("Cập nhật màu sắc thành công");
          navigate("/admin/mau-sac");
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
      <Card title="THÊM MÀU SẮC">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          layout="horizontal"
          form={form}
        >
          <Form.Item
            label="Mã"
            name="ma"
            initialValue={null}
            rules={[{ required: true, message: "Vui lòng nhập mã màu sắc!" }]}
          >
            <ColorPicker
              format={"hex"}
              onChange={setColorHex}
              showText
              disabledAlpha
            />
          </Form.Item>
          <Form.Item
            name="ten"
            label="Tên"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Vui lòng nhập tên màu sắc!",
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

export default UpdateMauSac;
