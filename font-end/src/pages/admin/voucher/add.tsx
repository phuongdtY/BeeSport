import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Space, message, InputNumber, Select } from "antd";
import request from "~/utils/request";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { CreatedRequest } from "~/interfaces/voucher.type";

const AddVoucher: React.FC = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { confirm } = Modal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("hinh-thuc-giam-gia");
        setOptions(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onFinish = (values: CreatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc thêm voucher này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          await request.post("voucher", {
            ten: values.ten,
            ngayBatDau: values.ngayBatDau,
            ngayKetThuc: values.ngayKetThuc,
            hinhThucGiam: { id: values.hinhThucGiam },
            giaToiThieu: values.giaToiThieu,
            giaTriGiam: values.giaTriGiam,
            giaTriGiamToiDa: values.giaTriGiamToiDa,
          });
          console.log(values.hinhThucGiam);
          setLoading(false);
          message.success("Thêm voucher thành công");
          navigate("/admin/voucher");
        } catch (error: any) {
          console.log(values.hinhThucGiam);
          // console.log(error);
          message.error(error.response.data.message);
          setLoading(false);
        }
      },
    });
  };

  return (
    <Card title="THÊM VOUCHER">
      <Row>
        <Col span={16}>
          <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item
              name="ten"
              label="Tên voucher"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập tên voucher!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ngayBatDau"
              label="Ngày Bắt Đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng Chọn ngày và giờ bắt đầu!"
                }
              ]}>
              {/* <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ bắt đầu" /> */}
              <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ bắt đầu" />
            </Form.Item>
            <Form.Item name="ngayKetThuc"
              label="Ngày Kết Thúc"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}>
              {/* <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ kết thúc" /> */}
              <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ kết thúc" />
            </Form.Item>
            <Form.Item
              name="hinhThucGiam"
              label="Hình thức giảm giá"
              initialValue="Chọn hình thức giảm giá"
              rules={[{ required: true, message: "Vui lòng chọn hình thức giảm giá" }]}>
              <Select>
                {options.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.ten}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="giaToiThieu"
              label="Giá tối thiểu"
              rules={[{ required: true, message: "Vui lòng nhập giá tối thiểu!" }]}>
              <InputNumber style={{ width: "100%" }} step={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
            <Form.Item
              name="giaTriGiam"
              label="Giá trị giảm"
              rules={[{ required: true, message: "Vui lòng nhập giá trị giảm!" }]}>
              <InputNumber style={{ width: "100%" }} step={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
            <Form.Item
              name="giaTriGiamToiDa"
              label="Giá trị giảm tối đa"
              rules={[{ required: true, message: "Vui lòng nhập giá trị giảm tối đa!" }]}>
              <InputNumber style={{ width: "100%" }} step={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="dashed" htmlType="reset" style={{ margin: "0 12px" }}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Thêm
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </Card>
  );
};

export default AddVoucher;
