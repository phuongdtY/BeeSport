import { Button, Card, Col, Divider, Input, Row, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import request from "~/utils/request";
import ThongTinGiaoHang from "./ThongTinGiaoHang";

interface DataGioHang {
  key: React.Key;
  ten: string;
}

interface DataKhachHang {
  key: React.Key;
  ten: string;
  email: string;
  soDienThoai: string;
}

const tableGioHang: ColumnsType<DataGioHang> = [
  {
    title: "#",
    dataIndex: "rowIndex",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "ten",
  },
];

const tableKhachHang: ColumnsType<DataKhachHang> = [
  {
    title: "#",
    dataIndex: "rowIndex",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "ten",
  },
];

const GioHangTaiQuay: React.FC = () => {
  const [dataGioHang, setDataGioHang] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  const getDataGioHang = async () => {
    try {
      const response = await request.get("loai-de");
      setDataGioHang(response.data.content);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getDataGioHang(); // Gọi API khi component được tạo
  }, []);

  const getDataKhachHang = async () => {
    try {
      const response = await request.get("thuong-hieu");
      setDataKhachHang(response.data.content);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getDataKhachHang(); // Gọi API khi component được tạo
  }, []);

  const onChangeGiaoHang = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <>
      <Button type="primary" style={{ marginBottom: 10, marginLeft: 1000 }}>
        Thêm sản phẩm
      </Button>

      <Card title="Giỏ hàng">
        <Table columns={tableGioHang} dataSource={dataGioHang} />
      </Card>
      <br />
      <Card title="Thông tin khách hàng">
        <Row gutter={[16, 16]}>
          <Col span={8}></Col>
          <Col span={6}></Col>
          <Col span={6}>
            <Input.Search placeholder="Tìm kiếm khách hàng ..." enterButton />
          </Col>
          <Col span={4}>
            <Button type="primary">Thêm khách hàng mới</Button>
          </Col>
        </Row>
        <Divider />
        <Table columns={tableKhachHang} dataSource={dataKhachHang} />
      </Card>
      <br />
      <Card title="Thanh toán">
        <Row>
          <Col span={12}>
            {checked ? (
              <Card style={{ marginRight: 10 }}>
                <ThongTinGiaoHang />
              </Card>
            ) : null}
          </Col>
          <Col span={12}>
            <Card>
              <Switch defaultChecked={checked} onChange={onChangeGiaoHang} />{" "}
              Giao hàng
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default GioHangTaiQuay;
