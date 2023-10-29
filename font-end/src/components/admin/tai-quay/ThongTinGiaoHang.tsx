import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";

interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

type FieldType = {
  hoVaTen?: string;
  soDienThoai?: string;
  email?: string;
  diaChi?: string;
};

const ThongTinGiaoHang: React.FC = () => {
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Họ và tên"
              name="username"
              style={{ marginRight: 10 }}
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="SĐT"
              name="soDienThoai"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng điền email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="thanhPho"
              label="Tỉnh / Thành phố"
              style={{ marginRight: 10 }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Tỉnh / Thành ",
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
          </Col>
          <Col span={8}>
            <Form.Item
              name="quanHuyen"
              style={{ marginRight: 10 }}
              label="Quận / Huyện:"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Quận / Huyện",
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
          </Col>

          <Col span={8}>
            <Form.Item
              name="phuongXa"
              label="Phường / Xã"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Phường / Xã",
                },
              ]}
            >
              <Select options={wards} placeholder="Phường / Xã" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="diaChi"
              style={{ marginRight: 50 }}
              label="Địa chỉ cụ thể"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Bạn chưa điền đia chỉ",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <img
              width={150}
              height={100}
              src="https://inkythuatso.com/uploads/images/2021/12/thiet-ke-khong-ten-04-13-29-21.jpg"
              alt=""
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ThongTinGiaoHang;
