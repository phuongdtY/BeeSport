import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import generatePDF, { Options } from "react-to-pdf";
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
import { Button, Modal, Row, Space, Table } from "antd";
import request from "~/utils/request";

interface exportHoaDonPDFProps {
  open: boolean;
  onCancel: (value: boolean) => void;
}

const exportHoaDonPDF: React.FC<exportHoaDonPDFProps> = ({
  open,
  onCancel,
}) => {
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
      dataIndex: "donGia",
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
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
      align: "center",
      sorter: true,
      width: "20%",
    },
  ];

  const fetchHoaDonData = async () => {
    try {
      const res = await request.get("hoa-don/");
      setData(res.data);
      setListHoaDonChiTiet(res.data?.hoaDonChiTietList);
    } catch (error) {
      console.log(error);
    }
  };

  const optionPrintPDF: Options = {
    filename: "hoa-don.pdf",
    page: {
      margin: 20,
    },
  };
  const getTargetElement = () => document.getElementById("pdfReaderHoaDon");
  const downloadPdf = () => generatePDF(getTargetElement, optionPrintPDF);

  const handleCancel = () => {
    onCancel(false);
  };
  return (
    <Modal
      width={1050}
      footer={null}
      title={"Export Hóa đơn to PDF"}
      open={open}
      onCancel={handleCancel}
    >
      <Row>
        <Button onClick={downloadPdf}>Ok</Button>
      </Row>
      <Row>
        <div id="pdfReaderHoaDon">
          pdf
          <Table />
        </div>
      </Row>
    </Modal>
  );
};

export default exportHoaDonPDF;
