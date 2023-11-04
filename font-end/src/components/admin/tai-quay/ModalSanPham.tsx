import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Input,
  Modal,
  Row,
  Select,
  Slider,
  Table,
  message,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useState, useEffect } from "react";
import request, { request4s } from "~/utils/request";

interface ModalSanPhamProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  idHoaDon: number;
  loadData: () => void;
}

const ModalSanPham: React.FC<ModalSanPhamProps> = ({
  isModalVisible,
  setIsModalVisible,
  idHoaDon,
  loadData,
}) => {
  const [dataSanPham, setDataSanPham] = useState([]);
  const [loaiDeOptions, setLoaiDeOptions] = useState([]);
  const [mauSacOptions, setMauSacOptions] = useState([]);
  const [kichCoOptions, setKichCoOptions] = useState([]);
  const [diaHinhSanOptions, setDiaHinhSanOptions] = useState([]);
  const [thuongHieuOptions, setThuongHieuOptions] = useState([]);

  // Thêm state để lưu trạng thái của các phần tử
  const [productNameFilter, setProductNameFilter] = useState("");
  const [giaTienRange, setGiaTienRange] = useState([0, 10000000]);
  const [selectedLoaiDe, setSelectedLoaiDe] = useState(undefined);
  const [selectedMauSac, setSelectedMauSac] = useState(undefined);
  const [selectedKichCo, setSelectedKichCo] = useState(undefined);
  const [selectedDiaHinhSan, setSelectedDiaHinhSan] = useState(undefined);
  const [selectedThuongHieu, setSelectedThuongHieu] = useState(undefined);

  const columns = [
    {
      title: "#",
      dataIndex: "rowIndex",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "moTa",
      render: (item, record) => {
        const images = record.images;

        if (!images || images.length === 0) {
          return "Chưa có ảnh";
        }

        const firstImage = images[0];

        return (
          <img
            src={`http://localhost:8080/admin/api/file/view/${firstImage.duongDan}`}
            alt="Hình ảnh"
            style={{ maxWidth: "100px" }}
          />
        );
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "ten",
      render: (item, record) => {
        return (
          item.ten +
          " / " +
          " [" +
          record.mauSac.ten +
          " - " +
          record.kichCo.kichCo +
          "]"
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "moTa",
      render: (item, record) => {
        return record.soLuong;
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "giaTien",
      key: "moTa",
      render: (item, record) => {
        // Định dạng giá tiền theo định dạng tiền tệ của Việt Nam
        const formattedPrice = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(record.giaTien);

        return formattedPrice;
      },
    },
    {
      title: "Loại đế",
      dataIndex: "loaiDe",
      key: "loaiDe",
      render: (item, record) => {
        return record.loaiDe.ten;
      },
    },
    {
      title: "Địa hình sân",
      dataIndex: "diaHinhSan",
      key: "diaHinhSan",
      render: (item, record) => {
        return record.diaHinhSan.ten;
      },
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "",
      render: (item, record) => (
        <Button
          type="primary"
          onClick={() => handleChonSanPham(record.id, record.giaTien)}
        >
          Chọn
        </Button>
      ),
    },
  ];

  const handleChonSanPham = async (idHoaDonChiTiet, donGia) => {
    try {
      // Make an API call to add the product to the invoice
      const response = await request4s.post(
        `hoa-don/add-san-pham/${idHoaDon}`,
        {
          chiTietSanPham: {
            id: idHoaDonChiTiet,
          },
          soLuong: 1,
          trangThaiHoaDonChiTiet: "APPROVED",
          donGia: donGia,
        }
      );
      loadData();
      message.success("Thêm sản phẩm vào giỏ hàng thành công !");
      // Handle the response, e.g., display a success message or update the invoice data
      console.log("Product added to invoice:", response.data);

      // Close the modal or perform any other necessary actions
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding product to invoice:", error);
      // Handle errors, e.g., display an error message
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchImages = async (idSanPham, idMauSac) => {
    try {
      const response = await request.get("hinh-anh-san-pham", {
        params: { idSanPham: idSanPham, idMauSac: idMauSac },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const resetFilter = () => {
    // Đặt lại giá trị của các state về mặc định
    setProductNameFilter("");
    setGiaTienRange([0, 10000000]);
    setSelectedLoaiDe(undefined);
    setSelectedMauSac(undefined);
    setSelectedKichCo(undefined);
    setSelectedDiaHinhSan(undefined);
    setSelectedThuongHieu(undefined);
  };

  useEffect(() => {
    if (isModalVisible) {
      // Call API LoaiDe
      request.get("loai-de/list").then((response) => {
        setLoaiDeOptions(response.data);
      });
      // Call API MauSac
      request.get("mau-sac/list").then((response) => {
        setMauSacOptions(response.data);
      });
      // Call API KichCo
      request.get("kich-co/list").then((response) => {
        setKichCoOptions(response.data);
      });
      // Call API DiaHinhSan
      request.get("dia-hinh-san/list").then((response) => {
        setDiaHinhSanOptions(response.data);
      });
      // Call API ThuongHieu
      request.get("thuong-hieu/list").then((response) => {
        setThuongHieuOptions(response.data);
      });
      // Call API List SanPham
      request.get("chi-tiet-san-pham/list").then(async (response) => {
        const sanPhamData = response.data;

        // Fetch images for all sanPham in parallel
        const imagePromises = sanPhamData.map((item) =>
          fetchImages(item.sanPham.id, item.mauSac.id)
        );

        const images = await Promise.all(imagePromises);

        const updatedSanPhamData = sanPhamData.map((sanPham, index) => ({
          ...sanPham,
          images: images[index],
        }));
        setDataSanPham(updatedSanPhamData);
      });
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal
        width={1050}
        title="Danh sách Sản phẩm"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row style={{ marginBottom: 10, marginLeft: 50 }}>
          <Col span={10} style={{ marginRight: 70 }}>
            <span>Sản phẩm: </span>
            <Input
              placeholder="Mã, Tên sản phẩm"
              value={productNameFilter} // Sử dụng giá trị từ state
              onChange={(e) => setProductNameFilter(e.target.value)} // Cập nhật giá trị vào state
            />
          </Col>
          <Col span={8}>
            <span>Giá tiền: </span>
            <Slider
              range
              min={0}
              max={10000000}
              step={100000}
              value={giaTienRange} // Sử dụng giá trị từ state
              onChange={(value) => setGiaTienRange(value)} // Cập nhật giá trị vào state
              tipFormatter={(value) => `${value.toLocaleString("vi-VN")} VND`}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 50, marginLeft: 50 }}>
          <Col span={4} style={{ marginRight: 15 }}>
            <span>Loại đế: </span>
            <Select
              placeholder="Chọn Loại đế"
              style={{ width: "100%" }}
              value={selectedLoaiDe}
              onChange={(value) => setSelectedLoaiDe(value)}
            >
              {loaiDeOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.ten}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4} style={{ marginRight: 15 }}>
            <span>Màu sắc: </span>
            <Select
              placeholder="Chọn Màu sắc"
              style={{ width: "100%" }}
              value={selectedMauSac}
              onChange={(value) => setSelectedMauSac(value)}
            >
              {mauSacOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  <ColorPicker
                    value={option.ma}
                    size="small"
                    disabled
                    style={{ margin: 5 }}
                  />
                  {option.ten}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4} style={{ marginRight: 15 }}>
            <span>Kích cỡ: </span>
            <Select
              placeholder="Chọn Kích cỡ"
              style={{ width: "100%" }}
              value={selectedKichCo}
              onChange={(value) => setSelectedKichCo(value)}
            >
              {kichCoOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.kichCo}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4} style={{ marginRight: 15 }}>
            <span>Địa hình sân: </span>
            <Select
              placeholder="Chọn Địa hình sân"
              style={{ width: "100%", marginRight: 10 }}
              value={selectedDiaHinhSan}
              onChange={(value) => setSelectedDiaHinhSan(value)}
            >
              {diaHinhSanOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.ten}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <span>Thương hiệu: </span>
            <Select
              placeholder="Chọn Thương hiệu"
              style={{ width: "100%", marginRight: 10 }}
              value={selectedThuongHieu}
              onChange={(value) => setSelectedThuongHieu(value)}
            >
              {thuongHieuOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.ten}
                </Option>
              ))}
            </Select>
          </Col>
          <Row style={{ marginTop: 30, marginLeft: 700 }}>
            <Col>
              <Button
                type="primary"
                style={{ backgroundColor: "red" }}
                icon={<ReloadOutlined />}
                onClick={resetFilter}
              >
                Làm mới bộ lọc
              </Button>
            </Col>
          </Row>
        </Row>
        <Table
          dataSource={dataSanPham}
          columns={columns}
          pagination={{
            pageSizeOptions: ["5"],
            showSizeChanger: true,
            defaultPageSize: 5,
          }}
        />
      </Modal>
    </>
  );
};

export default ModalSanPham;
