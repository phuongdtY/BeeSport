import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
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
  Typography,
  message,
} from "antd";

import request from "~/utils/request";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { Option } from "antd/es/mentions";
import { Content, Header } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import { formatGiaTienVND } from "~/utils/formatResponse";
const { Text } = Typography;
const tailLayout = {
  wrapperCol: { offset: 15, span: 9 },
};
interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}
const ThanhToan = ({ tamTinh }) => {
  const [radioOnchageValue, setRadioOnchageValue] = useState(1);
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { confirm } = Modal;
  const [idQuanHuyen, setIdQuanHuyen] = useState(false);
  const [idPhuongXa, setIdPhuongXa] = useState(false);
  const [phiShip, setPhiShip] = useState(0);

  const tongTien = () => {
    return tamTinh - phiShip;
  };

  useEffect(() => {
    const getPhiShip = async () => {
      try {
        const feeRes = await request.get(
          `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
          {
            params: {
              service_type_id: "2",
              to_district_id: idQuanHuyen,
              to_ward_code: idPhuongXa,
              height: "9",
              length: "29",
              weight: "300",
              width: "18",
            },
            headers: {
              token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
              shop_id: "4611572",
              ContentType: "application/json",
            },
          }
        );

        if (feeRes.status === 200) {
          const feeResponse = feeRes.data.data.total;
          console.log(feeResponse);

          // Cập nhật state phiShip sau khi tính phí ship thành công
          setPhiShip(feeResponse);
        } else {
          console.error("Lỗi khi gọi API tính phí ship: ", feeRes.status);
          // Xử lý lỗi và cập nhật state phiShip (ví dụ, set giá trị mặc định hoặc 0 nếu có lỗi)
          setPhiShip(0);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API tính phí ship:", error);
        // Xử lý lỗi và cập nhật state phiShip (ví dụ, set giá trị mặc định hoặc 0 nếu có lỗi)
        setPhiShip(0);
      }
    };
    getPhiShip();
  }, [idPhuongXa]);
  const onSubmit = async (values: any) => {
    console.log(values);

    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc đặt hàng không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await request.post("hoa-don", values);
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
    <Content style={{ width: 509 }}>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Card title="THÔNG TIN NHẬN HÀNG" bordered={true}>
          <Form.Item label="Họ và Tên:">
            <Form.Item
              noStyle
              name="hoVaTen"
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
          </Form.Item>
          <Space>
            <Form.Item label="Số Điện Thoại:">
              <Form.Item
                noStyle
                name="soDienThoai"
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
                <Input style={{ width: 230 }} />
              </Form.Item>
            </Form.Item>
            <Form.Item label="E-mail:">
              <Form.Item
                noStyle
                name="email"
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
                <Input style={{ width: 230 }} />
              </Form.Item>
            </Form.Item>
          </Space>
          <Space>
            <Form.Item label="Tỉnh / Thành">
              <Form.Item
                name="thanhPho"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa điền Tỉnh / Thành !",
                  },
                ]}
              >
                <Select
                  style={{ width: 150 }}
                  options={provinces}
                  placeholder="Tỉnh/ Thành Phố"
                  onChange={(value) => {
                    form.setFieldsValue({
                      quanHuyen: undefined,
                      phuongXa: undefined,
                    });
                    fetchDistricts(value);
                    setPhiShip(0);
                  }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Quận / Huyện:">
              <Form.Item
                name="quanHuyen"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa điền Quận / Huyện!",
                  },
                ]}
              >
                <Select
                  style={{ width: 150 }}
                  options={districts}
                  placeholder="Quận / Huyện"
                  onChange={(value) => {
                    form.setFieldsValue({ phuongXa: undefined });
                    fetchWards(value);
                    setIdQuanHuyen(value);
                    setPhiShip(0);
                  }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Phường / Xã">
              <Form.Item
                name="phuongXa"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa điền Phường / Xã !",
                  },
                ]}
              >
                <Select
                  style={{ width: 150 }}
                  options={wards}
                  placeholder="Phường / Xã"
                  onChange={(value) => setIdPhuongXa(value)}
                />
              </Form.Item>
            </Form.Item>
          </Space>
          <Form.Item label="Địa chỉ cụ thể">
            <Form.Item
              name="diaChi"
              noStyle
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
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú">
            <TextArea showCount maxLength={100} />
          </Form.Item>
        </Card>

        <Card title="PHƯƠNG THỨC THANH TOÁN">
          <Radio.Group onChange={onChangeRadio} value={radioOnchageValue}>
            <Space direction="vertical">
              <Radio value={1}>
                <Card style={{ width: "450px" }}>Thanh toán khi giao hàng</Card>
              </Radio>
              <Radio value={2}>
                <Card style={{ width: "450px" }}>
                  Thanh toán qua cổng VNPAY
                </Card>
              </Radio>
            </Space>
          </Radio.Group>
        </Card>
        <Card title="Đơn hàng (4 sản phẩm)">
          <Space>
            <Input
              size="large"
              placeholder="Nhập mã giảm giá"
              style={{ width: 370, borderRadius: 3 }}
            />
            <Button size="large" type="primary" style={{ borderRadius: 5 }}>
              Áp dụng
            </Button>
          </Space>
          <Divider />
          <div>
            <div>
              <Text type="secondary" strong>
                Tạm tính:
              </Text>
              <Text style={{ float: "right" }}>
                {formatGiaTienVND(tamTinh)}
              </Text>
            </div>

            <div>
              <Text type="secondary" strong>
                Giảm giá:
              </Text>
              <Text style={{ float: "right" }}>{formatGiaTienVND(0)}</Text>
            </div>
            <div>
              <Text type="secondary" strong>
                Phí vận chuyển:
              </Text>
              <Text style={{ float: "right" }}>
                {phiShip !== 0 ? formatGiaTienVND(phiShip) : "Miễn phí"}
              </Text>
            </div>

            <Divider style={{ margin: 5, padding: 0, color: "black" }} />
            <div>
              <Text strong>Tổng tiền:</Text>
              <Text
                style={{ float: "right", color: "red", fontWeight: "bold" }}
              >
                {formatGiaTienVND(tongTien())}
              </Text>
            </div>
          </div>
        </Card>
        <Button
          htmlType="submit"
          type="primary"
          style={{
            width: "100%",
            height: "50px",
            marginTop: 10,
            marginRight: 20,
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ĐẶT HÀNG
        </Button>
      </Form>
    </Content>
  );
};

export default ThanhToan;
