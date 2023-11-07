import { Button, Table, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import request from "~/utils/request";
import ModalSanPham from "./ModalSanPham";
import { DeleteOutlined } from "@ant-design/icons";

interface DataGioHang {
  key: React.Key;
  soLuong: number;
  nguoiTao: string;
  maHoaDon: string;
  chiTietSanPham: {
    sanPham: {
      ten: string;
    };
  };
}

function formatCurrency(amount) {
  // Định dạng số tiền thành chuỗi với dấu phẩy ngăn cách hàng nghìn và giữ hai chữ số sau dấu thập phân.
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

const TableSanPham: React.FC<{
  id: number;
  passTotalPriceToParent: (price: number) => void;
}> = ({ id, passTotalPriceToParent }) => {
  const [dataGioHang, setDataGioHang] = useState<DataGioHang[]>([]); // Specify the data type

  const tableGioHang: ColumnsType<DataGioHang> = [
    {
      title: "#",
      dataIndex: "rowIndex",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "duongDan",
      render: (text, record) => (
        <img src={record.duongDan} alt="Product" width="80" height="80" />
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: ["chiTietSanPham", "sanPham", "ten"],
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      render: (text, record) => formatCurrency(record.chiTietSanPham.giaTien),
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      render: (text, record) => formatCurrency(record.tongTien),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "",
      render: (item, record) => (
        <Button danger type="link" onClick={() => deleteHoaDonChiTiet(item.id)}>
          <Tooltip title="Xóa">
            <DeleteOutlined />
          </Tooltip>
        </Button>
      ),
    },
  ];

  const passTotalPriceToParentCallback = (price) => {
    // Gọi hàm callback để truyền tổng tiền lên component cha
    passTotalPriceToParent(price);
  };

  // Thêm một useEffect để theo dõi sự thay đổi của dataGioHang và tính toán tổng tiền
  useEffect(() => {
    const total = dataGioHang.reduce((acc, item) => acc + item.tongTien, 0);
    // Gọi hàm callback để truyền tổng tiền lên component cha khi tổng tiền thay đổi
    passTotalPriceToParentCallback(total);
  }, [dataGioHang]);

  const deleteHoaDonChiTiet = async (idHoaDonChiTiet) => {
    try {
      await request.delete(`/hoa-don/${idHoaDonChiTiet}`);
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
      getDataGioHang();
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle errors, e.g., display an error message
    }
  };

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getImage = async (idSanPham, idMauSac) => {
    try {
      const response = await request.get("hinh-anh-san-pham", {
        params: { idSanPham: idSanPham, idMauSac: idMauSac },
      });
      const image = response.data[0];
      if (image && image.duongDan) {
        return image.duongDan;
      } else {
        console.error("Invalid image data:", image);
        return ""; // Or handle this case as needed
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const getDataGioHang = async () => {
    try {
      const response = await request.get(`hoa-don/${id}`);
      const gioHangData = await Promise.all(
        response.data.hoaDonChiTietList.map(async (item) => {
          const donGia = item.chiTietSanPham.giaTien;
          const tongTien = donGia * item.soLuong;
          const idMauSac = item.chiTietSanPham.mauSac.id;
          const idSanPham = item.chiTietSanPham.sanPham.id;
          const duongDan = await getImage(idSanPham, idMauSac);

          return { ...item, donGia, tongTien, idSanPham, idMauSac, duongDan };
        })
      );

      setDataGioHang(gioHangData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataGioHang();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Table
        title={() => (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Giỏ hàng</div>
            <Button
              type="primary"
              style={{ float: "right", marginBottom: 15 }}
              onClick={showModal}
            >
              Thêm Sản phẩm
            </Button>
            <ModalSanPham
              loadData={getDataGioHang}
              idHoaDon={id}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          </>
        )}
        columns={tableGioHang}
        dataSource={dataGioHang}
      />
    </>
  );
};

export default TableSanPham;
