import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
  message,
} from "antd";

import request from "~/utils/request";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { Option } from "antd/es/mentions";
import { Content, Header } from "antd/es/layout/layout";
// lấy tạm data địa hình sân
import { DataParams, DataType } from "~/interfaces/diaHinhSan.type";
import { ColumnsType } from "antd/es/table";
const tailLayout = {
  wrapperCol: { offset: 15, span: 9 },
};
interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}
const ThanhToanAdd: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [radioOnchageValue, setRadioOnchageValue] = useState(1);
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const [test, setTest] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { confirm } = Modal;
  const columns: ColumnsType<DataType> = [
    {
      title: "Hình Ảnh",
      align: "center",
      rowScope: "row",
      width: "15%",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "30%",
    },
    {
      title: "Đơn Giá",
      align: "center",
      rowScope: "row",
      width: "20%",
    },
    {
      title: "Số Lượng",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "10%",
    },
    {
      title: "Thành Tiền",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "20%",
    },
  ];
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
        const provinceRes = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
              ContentType: "application/json",
            },
          }
        );

        const provinceOptions: Option[] = provinceRes.data.data.map(
          (province: any) => ({
            value: province.ProvinceID,
            label: province.ProvinceName,
            isLeaf: false,
          })
        );
        setProvinces(provinceOptions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchDistricts = async (idProvince: string) => {
    try {
      const districtRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?`,
        {
          params: {
            province_id: idProvince,
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );

      const districtOptions: Option[] = districtRes.data.data.map(
        (district: any) => ({
          value: district.DistrictID,
          label: district.DistrictName,
          isLeaf: false,
        })
      );
      setDistricts(districtOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWards = async (idDistrict: string) => {
    try {
      const wardRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          params: {
            district_id: idDistrict,
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );

      const wardOptions: Option[] = wardRes.data.data.map((ward: any) => ({
        value: ward.WardCode,
        label: ward.WardName,
        isLeaf: false,
      }));
      setWards(wardOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setRadioOnchageValue(e.target.value);
  };

  return (
    <Layout>
      <Content style={{ margin: "0 auto", width: "960px" }}>
        <Row>
          <Col span={14}>
            <Card title="THÔNG TIN GIAO HÀNG">
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
                  name="thanhPho"
                  label="Tỉnh / Thành"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa điền Tỉnh / Thành !",
                    },
                  ]}
                >
                  <Select
                    options={provinces}
                    placeholder="Tỉnh/ Thành Phố"
                    onChange={(value) => {
                      form.setFieldsValue({
                        quanHuyen: undefined,
                        phuongXa: undefined,
                      });
                      fetchDistricts(value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="quanHuyen"
                  label="Quận / Huyện:"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa điền Quận / Huyện!",
                    },
                  ]}
                >
                  <Select
                    options={districts}
                    placeholder="Quận / Huyện"
                    onChange={(value) => {
                      form.setFieldsValue({ phuongXa: undefined });
                      fetchWards(value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="phuongXa"
                  label="Phường / Xã"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa điền Phường / Xã !",
                    },
                  ]}
                >
                  <Select options={wards} placeholder="Phường / Xã" />
                </Form.Item>
                <Form.Item
                  name="diaChi"
                  label="Địa chỉ cụ thể"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Bạn chưa điền đia chỉ!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
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

            <Card title="PHƯƠNG THỨC THANH TOÁN">
              <Radio.Group onChange={onChangeRadio} value={radioOnchageValue}>
                <Space direction="vertical">
                  <Radio value={1}>
                    <Card style={{ width: "500px" }}>
                      Thanh toán khi giao hàng
                    </Card>
                  </Radio>
                  <Radio value={2}>
                    <Card style={{ width: "500px" }}>Ví MoMo</Card>
                  </Radio>
                  <Radio value={3}>
                    <Card style={{ width: "500px" }}>
                      Thẻ ATM/Visa/Master/JCB/QR Pay qua cổng VNPAY
                    </Card>
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
          </Col>
          <Col span={10}>
            <Card>
              <Table
                columns={columns}
                dataSource={data.map((item, index) => ({
                  ...item,
                  key: index.toString(),
                }))}
                // onChange={onChangeTable}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ThanhToanAdd;
