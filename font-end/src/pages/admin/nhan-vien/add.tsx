import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Cascader,
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
const AddNV: React.FC = () => {
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
      content: "Bạn có chắc thêm nhân viên không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await request.post("nhan-vien", values);
          setLoading(false);
          message.success("Thêm nhân viên thành công");
          navigate("/admin/nhan-vien");
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
  }, []);

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
    <Card title="THÊM NHÂN VIÊN">
      <Row>
        <Col span={16}>
          <Form form={form} onFinish={onSubmit} {...formItemLayout}>
            <Form.Item
              name="hoVaTen"
              label="Họ và Tên:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập họ và tên!",
                },
                {
                  pattern: /^[\p{L}\s']+$/u,
                  message: "Họ và tên không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="canCuocCongDan"
              label="CCCD/Mã định danh:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập CMT/CCCD!",
                },
                {
                  pattern: /^\d{9}$|^\d{12}$/,
                  message: "CMT/CCCD không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ngaySinh"
              label="Ngày Sinh:"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh!",
                },
                {
                  async validator(_, value) {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    if (value !== undefined) {
                      if (selectedDate < currentDate) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Ngày sinh không được là ngày tương lai!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker format={"DD/MM/YYYY"} placeholder="chọn ngày sinh" />
            </Form.Item>
            <Form.Item
              name="gioiTinh"
              label="Giới tính"
              initialValue="MALE"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="MALE">Nam</Radio>
                <Radio value="FEMALE">Nữ</Radio>
                <Radio value="OTHER">Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="soDienThoai"
              label="Số Điện Thoại:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Bạn chưa điền số điện thoại!",
                },
                {
                  pattern: /^0[35789]\d{8}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail:"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Bạn chưa điền e-mail!",
                },
                {
                  type: "email",
                  message: "E-mail không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="diaChi"
              label="Địa chỉ:"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền địa chỉ!",
                },
              ]}
            >
              <Cascader
                options={provinces}
                loadData={loadData}
                onChange={onChange}
                placeholder="Tỉnh/ Thành Phố, Quận/ Huyện, Phường/ Xã"
                changeOnSelect
              />
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

export default AddNV;
