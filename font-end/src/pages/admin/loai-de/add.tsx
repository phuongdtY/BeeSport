import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  message,
  DatePicker,
} from "antd";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreatedRequest } from "~/interfaces/loaiDe.type";
import request from "~/utils/request";
const { RangePicker } = DatePicker;
const { confirm } = Modal;
const add: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: CreatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc thêm loại đế này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        console.log(values.ten);

        try {
          setLoading(true);
          await request.post("voucher/add", {
            ten: "doanh",
            ngayBatDau: values.ten,
          });
          setLoading(false);
          message.success("Thêm loại đế thành công");
          navigate("/admin/loai-de");
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
      <Card title="THÊM loại đế">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          layout="horizontal"
        >
          <Form.Item
            name="ten"
            label="Tên"
            // rules={[
            //   {
            //     whitespace: true,
            //     required: true,
            //     message: "Vui lòng nhập tên loại đế!",
            //   },
            // ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 17 }}>
            <Space>
              <Button type="dashed" htmlType="reset">
                Reset
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default add;
