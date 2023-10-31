import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import generatePDF, { Margin, Options } from "react-to-pdf";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import {
  DataType as DataTypeHoaDon,
  UpdatedRequest,
  UpdateDiaChiHoaDon,
} from "~/interfaces/hoaDon.type";
import {
  DataType as DataTypeHoaDonChiTiet,
  DataParams,
} from "~/interfaces/hoaDonChiTiet.type";
import { Button, Card, Col, Form, Image, Modal, Row, Space, Table} from "antd";
import request from "~/utils/request";
import { Container } from "@mui/material";
import logoShop from "~/image/logo.jpg";
import { formatNgayTao, formatGiaTien } from "~/utils/formatResponse";

interface exportHoaDonPDFProps {
  open: boolean;
  id: number | undefined;
  onCancel: (value: boolean) => void;
}

const exportHoaDonPDF: React.FC<exportHoaDonPDFProps> = ({
  open,
  onCancel,
  id,
}) => {
  const [data, setData] = useState<DataTypeHoaDon | null>(null);
  const [listHoaDonChiTiet, setListHoaDonChiTiet] = useState<
    DataTypeHoaDonChiTiet[]
  >([]);
  const columns: ColumnsType<DataTypeHoaDonChiTiet> = [
    {
      title: "STT",
      key: "index",
      align: "center",
      rowScope: "row",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "chiTietSanPham",
      key: "chiTietSanPham",
      align: "center",
      sorter: true,
      width: "40%",
      render: (chiTietSanPham) => (
        <Space>
          <span>
            <div
              dangerouslySetInnerHTML={{
                __html: `${chiTietSanPham.sanPham.ten}<br /> <br />[${chiTietSanPham.mauSac.ten}-${chiTietSanPham.kichCo.kichCo}-${chiTietSanPham.loaiDe.ten}-${chiTietSanPham.diaHinhSan.ten}]`,
              }}
            />
          </span>
        </Space>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      sorter: true,
      width: "10%",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGiaNew",
      key: "donGia",
      align: "center",
      sorter: true,
      width: "15%",
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "center",
      sorter: true,
      width: "15%",
    },
  ];

  const columnsThanhToan: ColumnsType<DataTypeHoaDonChiTiet> = [
    {
      title: "STT",
      key: "index",
      align: "center",
      rowScope: "row",
      width: "5%",
    },
    {
      title: "Sản phẩm",
      key: "chiTietSanPham",
      align: "center",
      sorter: true,
      width: "40%",
    },
    {
      title: "Số lượng",
      key: "soLuong",
      align: "center",
      sorter: true,
      width: "10%",
    },
    {
      title: "Đơn giá",
      key: "donGia",
      align: "center",
      sorter: true,
      width: "15%",
    },
    {
      title: "Thành tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      align: "center",
      sorter: true,
      width: "15%",
    },
  ];

  const fetchHoaDonData = async (id: number | undefined) => {
    try {
      const res = await request.get("hoa-don/" + id);
      setData(res.data);
      setListHoaDonChiTiet(res.data?.hoaDonChiTietList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHoaDonData(id);
  }, [id]);

  const optionPrintPDF: Options = {
    filename: "hoa-don.pdf",
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "landscape",
    },
  };
  const getTargetElement = () => document.getElementById("pdfReaderHoaDon");
  const downloadPdf = () => generatePDF(getTargetElement, optionPrintPDF);

  const handleCancel = () => {
    onCancel(false);
  };

  const tinhTongTienCaShip = (tienShip: number) => {
    return (
      (listHoaDonChiTiet || [])
        .map((item) => ({
          ...item,
          thanhTien: Number(item.soLuong) * Number(item.donGia),
        }))
        .reduce((sum, item) => sum + item.thanhTien, 0) + tienShip
    );
  };

  const tinhTongTien = () => {
    return (listHoaDonChiTiet || [])
      .map((item) => ({
        ...item,
        thanhTien: Number(item.soLuong) * Number(item.donGia),
      }))
      .reduce((sum, item) => sum + item.thanhTien, 0);
  };

  const dataSourceDanhSachSanPham = () => {
    return listHoaDonChiTiet.map((item) => ({
      ...item,
      maMauSac: item.chiTietSanPham.mauSac.ma,
      soKichCo: item.chiTietSanPham.kichCo.kichCo,
      donGiaNew: formatGiaTien(Number(item.donGia)),
      thanhTien: formatGiaTien(Number(item.soLuong) * Number(item.donGia)),
    }));
  };

  const formatNgayTaoKhongCoGio = (dateString: string | undefined) => {
    const validDateString = dateString || new Date().toISOString();
    const date = new Date(validDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Ngày ${day} Tháng ${month} Năm ${year}`;
  };

  const tongTien = tinhTongTien();
  const tienShip = data?.phiShip || 0;
  return (
    <Modal
      width={1050}
      footer={null}
      title={"Export Hóa đơn to PDF"}
      open={open}
      onCancel={handleCancel}
    >
      <Container style={{ margin: "0px auto", width: "100%" }}>
        <Row>
          <Button onClick={downloadPdf}>Ok</Button>
        </Row>
        <div id="pdfReaderHoaDon">
          <Row>
            <Col span={9}>
              <Image src={logoShop} style={{ width: "100%", height: "100%" }} />
            </Col>
            <Col span={15}>
              <Space
                direction="vertical"
                align="end"
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                <span>
                  Địa Chỉ: 123, đường 123, quận 12, thành phố Hồ Chí Minh
                </span>
                <span>Số điện thoại : 0987654321 - 0971852413</span>
                <span>Email : beesport.soccer@gmail.com</span>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space
                direction="vertical"
                align="center"
                style={{
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                <h1>HÓA ĐƠN BÁN HÀNG</h1>
                <span>{formatNgayTaoKhongCoGio(data?.ngayTao)}</span>
              </Space>
            </Col>
          </Row>
          <Card bordered={true}>
            <Form
              labelCol={{ span: 4 }}
              labelAlign="left"
              style={{ maxWidth: 1000, margin: "0 auto" }}
              layout="horizontal"
            >
              <Row>
                <Col span={24}>
                  <Form.Item name="ma" label="Mã hóa đơn">
                    <span>{data?.ma}</span>
                  </Form.Item>
                  <Form.Item name="ma" label="Ngày tạo hóa đơn">
                    <span>{formatNgayTao(data?.ngayTao)}</span>
                  </Form.Item>
                  <Form.Item name="nguoiNhan" label="Người nhận">
                    <span>{data?.nguoiNhan}</span>
                  </Form.Item>
                  <Form.Item name="sdtNguoiNhan" label="Số điện thoại">
                    <span>{data?.sdtNguoiNhan}</span>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Table
            columns={columns}
            dataSource={dataSourceDanhSachSanPham()}
            pagination={false}
            showSorterTooltip={false}
            summary={() => {}}
          >
            
          </Table>
        </div>
      </Container>
    </Modal>
  );
};

export default exportHoaDonPDF;