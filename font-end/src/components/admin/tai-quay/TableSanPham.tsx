import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import request, { request4s } from "~/utils/request";
import ModalSanPham from "./ModalSanPham";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

interface DataGioHang {
  key: React.Key;
  soLuong: number;
  nguoiTao: string;
  maHoaDon: string;
  chiTietSanPham: {
    sanPham: {
      ten: string;
    };
    kichCo: {
      kichCo: number;
    };
    mauSac: {
      ten: string;
    };
    diaHinhSan: {
      ten: string;
    };
    loaiDe: {
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
  const { confirm } = Modal;

  const tableGioHang: ColumnsType<DataGioHang> = [
    {
      title: "#",
      dataIndex: "rowIndex",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "duongDan",
      render: (item, record) => {
        return (
          <img
            src={`http://localhost:8080/admin/api/file/view/${record.duongDan}`}
            alt="Hình ảnh"
            style={{ maxWidth: "100px" }}
          />
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: ["chiTietSanPham", "sanPham", "ten"],
      render: (_, record) => {
        return `${record.chiTietSanPham.sanPham.ten} [ ${record.chiTietSanPham.mauSac.ten} - ${record.chiTietSanPham.kichCo.kichCo}]`;
      },
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      width: 60,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: 60 }}
          value={record.soLuong}
          inputMode="numeric"
          onChange={(newSoLuong) => handleSoLuongChange(index, newSoLuong)}
        />
      ),
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

  const handleCapNhatGioHang = async (id) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn cập nhật Giỏ hàng không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await request4s.put(
            `/hoa-don/hoa-don-chi-tiet/${id}`,
            dataGioHang?.map((item) => ({
              id: item.id,
              soLuong: item.soLuong,
            }))
          );
          message.success("Đã cập nhật giỏ hàng");
        } catch (error) {
          console.error("Error updating cart:", error);
          // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
          message.error("Có lỗi xảy ra khi cập nhật giỏ hàng.");
        }
      },
    });
  };

  const handleSoLuongChange = (index, newSoLuong) => {
    const newSoLuongValue = typeof newSoLuong === "number" ? newSoLuong : 0;

    // Tìm sản phẩm trong danh sách dựa trên index
    const productToUpdate = dataGioHang[index];

    if (productToUpdate) {
      // Tạo một bản sao của dataGioHang và cập nhật số lượng và tổng tiền cho sản phẩm cụ thể
      const updatedData = [...dataGioHang];
      updatedData[index] = {
        ...productToUpdate,
        soLuong: newSoLuongValue,
        tongTien: newSoLuongValue * productToUpdate.donGia, // Cập nhật tổng tiền
      };
      setDataGioHang(updatedData);
    }
  };

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
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xóa sản phẩm không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await request.delete(`/hoa-don/${idHoaDonChiTiet}`);
          message.success("Đã xóa sản phẩm khỏi giỏ hàng");
          getDataGioHang();
        } catch (error) {
          console.error("Error deleting item:", error);
          // Handle errors, e.g., display an error message
        }
      },
    });
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
            <Row>
              <Col span={10}></Col>
              <Col span={7}>
                <Button
                  type="primary"
                  style={{ float: "right", marginBottom: 15 }}
                  onClick={() => handleCapNhatGioHang(id)}
                >
                  Cập nhật giỏ hàng
                </Button>
              </Col>
              <Col span={7}>
                <Button
                  type="primary"
                  style={{ float: "right", marginBottom: 15 }}
                  onClick={showModal}
                >
                  Thêm Sản phẩm
                </Button>
              </Col>
            </Row>
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
