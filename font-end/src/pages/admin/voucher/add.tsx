import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  message,
} from "antd";

import request from "~/utils/request";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { Option } from "antd/es/mentions";
const tailLayout = {
  wrapperCol: { offset: 19, span: 16 },
};
interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}
const AddVoucher: React.FC = () => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [test, setTest] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { confirm } = Modal;
  const onSubmit = async (values: any) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc voucher không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await request.post("voucher/add", values);
          setLoading(false);
          message.success("Thêm voucher thành công");
          navigate("/admin/voucher");
        } catch (error: any) {
          message.error(error.response.data.message);
          setLoading(false);
        }
      },
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              token: "49e20eea-4a6c-11ee-af43-6ead57e9219a",
              ContentType: "application/json",
            },
          }
        );

        const provinceOptions: Option[] = res.data.data.map(
          (province: any) => ({
            value: province.ProvinceID,
            label: province.ProvinceName,
            isLeaf: false,
          })
        );
        setProvinces(provinceOptions);
        setTest(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  },[]);

  const loadData = async (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    if (targetOption && typeof targetOption.value === "number") {
      const id = targetOption.value;
      setTest(false);

      try {
        if (!targetOption.isLeaf && test === false) {
          // Load districts when selecting a province
          const res = await axios.get(
            "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
            {
              params: {
                province_id: id,
              },
              headers: {
                token: "49e20eea-4a6c-11ee-af43-6ead57e9219a",
                ContentType: "application/json",
              },
            }
          );

          const data = res.data.data.map((item: any) => ({
            value: item.DistrictID,
            label: item.DistrictName,
            isLeaf: false,
          }));

          targetOption.children = data;
          setProvinces([...provinces]);
          setTest(true);
        } else {
          console.log(id);

          // Load wards when selecting a district
          const res = await axios.get(
            `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
            {
              params: {
                district_id: id,
              },
              headers: {
                token: "49e20eea-4a6c-11ee-af43-6ead57e9219a",
                ContentType: "application/json",
              },
            }
          );

          const data = res.data.data.map((item: any) => ({
            value: item.DistrictID,
            label: item.WardName,
            isLeaf: true,
          }));

          targetOption.children = data;
          setProvinces([...provinces]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const onChange = (value: (string | number)[], selectedOptions: Option[]) => {
    console.log(value, selectedOptions);
  };
  return (
    <Card title="THÊM VOUCHER">
      <Row>
        <Col span={16}>
          <Form form={form} onFinish={onSubmit} {...formItemLayout}>
          <Form.Item
              name="ma"
              label="Mã:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập mã!",
                },
                {
                  // pattern: /^[a-z0-9]{8,12}$/i,
                  message: "Mã không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ten"
              label="Tên:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập tên voucher!",
                },
                {
                  pattern: /^[\p{L}\s']+$/u,
                  message: "Tên không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ngayBatDau"
              label="Ngày Bắt Đầu:"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày bắt đầu!",
                },
                {
                  async validator(_, value) {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    if (value !== undefined) {
                      if (selectedDate > currentDate ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Ngày bắt đầu không thể là ngày trong quá khứ!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker format={"DD/MM/YYYY"} placeholder="chọn ngày" />
            </Form.Item>
            <Form.Item
              name="ngayKetThuc"
              label="Ngày Kết Thúc:"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày kết thúc!",
                },
                {
                  async validator(_, value) {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    if (value !== undefined) {
                      if (selectedDate > currentDate) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Ngày kết thúc không thể là ngày trong quá khứ!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker format={"DD/MM/YYYY"} placeholder="chọn ngày" />
            </Form.Item>

            <Form.Item
              name="hinhThucGiamGia"
              label="Hình thức giảm giá"
              initialValue="PERCENT"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hình thức giảm giá",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="PERCENT">Phần trăm</Radio>
                <Radio value="AMOUNT">Số lượng</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="giaToiThieu"
              label="Giá tối thiểu:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Bạn chưa điền giá tối thiểu!",
                },
                {
                  pattern: /^(?!0*(\.0{1,2})?$)\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/,
                  message: "Giá tối thiểu không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="giaTriGiam"
              label="Giá trị giảm:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Bạn chưa điền giá trị giảm!",
                },
                {
                  pattern: /^(?!0*(\.0{1,2})?$)\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/,
                  message: "Giá trị giảm không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="giaTriGiamToiDa"
              label="Giá trị giảm tối đa:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Bạn chưa điền giá trị giảm tối đa!",
                },
                {
                  pattern: /^(?!0*(\.0{1,2})?$)\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/,
                  message: "Giá trị giảm tối đa không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button
                  type="dashed"
                  htmlType="reset"
                  style={{ margin: "0 12px" }}
                >
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
