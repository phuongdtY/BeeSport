import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import ThongTinGiaoHang from "./ThongTinGiaoHang";
import TextArea from "antd/es/input/TextArea";
import TableSanPham from "./TableSanPham";
import { PlusOutlined } from "@ant-design/icons";
import request, { request4s } from "~/utils/request";
import ModalAddKhachHang from "./ModalAddKhachHang";
import { formatPhoneNumber } from "~/utils/formatResponse";

const GioHangTaiQuay: React.FC<{ id: number; loadHoaDon: () => void }> = ({
  id,
  loadHoaDon,
}) => {
  const [checked, setChecked] = useState(false);
  const [selectKhachHangOptions, setSelectKhachHangOptions] = useState([]);
  const [selectKhachHang, setSelectKhachHang] = useState<any>(null);
  const [voucherOptions, setVoucherOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalPriceFromTable, setTotalPriceFromTable] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [hoaDon, setHoaDon] = useState(null); // State để lưu đối tượng hóa đơn
  const [ghiChu, setGhiChu] = useState("null"); // State để lưu đối tượng hóa đơn

  // Hàm để lấy thông tin chi tiết hóa đơn dựa trên id
  const fetchHoaDonDetails = async (idHoaDon) => {
    try {
      // Gọi API để lấy thông tin hóa đơn dựa trên idHoaDon
      const response = await request.get(`/hoa-don/${idHoaDon}`);
      if (response.status === 200) {
        const hoaDon = response.data; // Dữ liệu hóa đơn từ máy chủ
        setHoaDon(hoaDon); // Lưu hóa đơn vào state
        // Sử dụng hoaDonData để hiển thị hoặc thực hiện các thao tác khác
        console.log("Thông tin hóa đơn:", hoaDon);
      } else {
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        message.error("Có lỗi xảy ra khi lấy thông tin hóa đơn.");
      }
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
      message.error("Có lỗi xảy ra khi lấy thông tin hóa đơn.");
    }
  };

  const handleGhiChuChange = (event) => {
    const giaTriGhiChu = event.target.value;
    // Set giá trị vào setGhiChu
    setGhiChu(giaTriGhiChu);
  };

  useEffect(() => {
    if (id) {
      fetchHoaDonDetails(id); // Gọi hàm để lấy thông tin hóa đơn khi id thay đổi
    }
    // ...
  }, [id]);

  const passTotalPriceToParent = (price) => {
    setTotalPriceFromTable(price);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const loadSelectKhachHang = () => {
    request
      .get("khach-hang/list")
      .then((response) => {
        const data = response.data;
        setSelectKhachHangOptions(data);
      })
      .catch((error) => console.error(error));
  };

  const getHoaDonData = () => {
    const idTaiKhoan = selectKhachHang ? selectKhachHang.id : null; // Lấy id của khách hàng (nếu có)

    // const idVoucher = selectedVoucher ? selectedVoucher.id : null; // Lấy id của voucher (nếu có)
    const tongTien = totalPriceFromTable; // Lấy tổng tiền từ state hoặc props

    // Tạo đối tượng hóa đơn
    const hoaDonData = {
      id: id,
      ma: hoaDon.ma,
      loaiHoaDon: "COUNTER",
      taiKhoan: {
        id: idTaiKhoan,
      },
      tongTien: tongTien,
      voucher: {
        id: 1,
      },
      giaToiThieu: 12000,
      trangThaiHoaDon: "CONFIRMED",
      ghiChu: ghiChu,
    };

    return hoaDonData;
  };

  const handleLuuHoaDon = async (id) => {
    // Lấy thông tin hóa đơn
    const hoaDonData = getHoaDonData();
    try {
      // Gọi API để cập nhật hóa đơn theo `id`
      const response = await request.put(`/hoa-don/${id}`, hoaDonData);
      if (response.status === 200) {
        message.success("Hóa đơn đã được cập nhật thành công.");
      } else {
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        message.error("Có lỗi xảy ra khi cập nhật hóa đơn.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
      message.error("Có lỗi xảy ra khi cập nhật hóa đơn.");
    }
    loadHoaDon();
  };

  useEffect(() => {}, [totalPriceFromTable]);

  useEffect(() => {
    loadSelectKhachHang();
  }, []);

  const onChangeGiaoHang = (checked: boolean) => {
    setChecked(checked);
  };

  const onChangeKhachHang = (value: string) => {
    const selectedKhachHang = selectKhachHangOptions.find(
      (khachHang) => khachHang.id === value
    );

    setSelectKhachHang(selectedKhachHang);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Row>
        <Col span={14}>
          <Card title="Thông tin khách hàng" style={{ marginRight: 10 }}>
            <Space.Compact block>
              <Select
                style={{ width: "100%" }}
                allowClear
                showSearch
                placeholder="Tìm kiếm Khách hàng ..."
                optionFilterProp="children"
                onChange={onChangeKhachHang}
                onSearch={onSearch}
                filterOption={filterOption}
                options={selectKhachHangOptions.map((khachHang) => ({
                  value: khachHang.id,
                  label: `${khachHang.hoVaTen} - ${khachHang.soDienThoai}`,
                }))}
              />
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={showModal}
              />
              <ModalAddKhachHang
                loadData={loadSelectKhachHang}
                open={isModalVisible}
                onCancel={handleCancel}
              />
            </Space.Compact>
            <Divider />
            {/* Tên khách hàng */}
            {selectKhachHang ? (
              <>
                <Row>
                  <Col span={5}>Tên khách hàng:</Col>
                  <span style={{ fontWeight: "bold" }}>
                    {selectKhachHang.hoVaTen}
                  </span>
                </Row>
                <br />
                <Row>
                  <Col span={5}>Số điện thoại:</Col>
                  <span style={{ fontWeight: "bold" }}>
                    {formatPhoneNumber(selectKhachHang.soDienThoai)}
                  </span>
                </Row>
                <br />
                <Row>
                  <Col span={5}>Email:</Col>
                  <span style={{ fontWeight: "bold" }}>
                    {selectKhachHang.email}
                  </span>
                </Row>
                <br />
              </>
            ) : (
              <>
                <Row>
                  <Col span={5}>Tên khách hàng:</Col>
                  <span style={{ fontWeight: "bold" }}>Khách hàng lẻ</span>
                </Row>
                <br />
              </>
            )}
            <Divider />
            <TableSanPham
              id={id}
              passTotalPriceToParent={passTotalPriceToParent}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <Switch defaultChecked={checked} onChange={onChangeGiaoHang} /> Giao
            hàng
            <Divider />
            {checked ? (
              <>
                <Card title="Thông tin nhận hàng">
                  <ThongTinGiaoHang />
                </Card>
                <Divider />
              </>
            ) : null}
            {/* Voucher */}
            <Row>
              <Col span={24}>
                <p>Voucher: </p>
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                  placeholder="Tìm kiếm Voucher"
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                />
              </Col>
            </Row>
            {/* Tạm tính */}
            <Row>
              <Col span={5}>
                <p>Tạm tính: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p>{formatCurrency(totalPriceFromTable)}</p>
              </Col>
            </Row>
            {/* Phí vận chuyển */}
            <Row>
              <Col span={7}>
                <p>Phí vận chuyển: </p>
              </Col>
              <Col span={14}></Col>
              <Col span={3}>
                <p>0 đ</p>
              </Col>
            </Row>
            {/* Giảm giá */}
            <Row>
              <Col span={5}>
                <p>Giảm giá: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p>
                  {formatCurrency(
                    selectedVoucher
                      ? selectedVoucher.hinhThucGiam.id === 1
                        ? selectedVoucher.giaTriGiam
                        : selectedVoucher.hinhThucGiam.id === 2
                        ? (totalPriceFromTable / 100) *
                          selectedVoucher.giaTriGiam
                        : 0
                      : 0
                  )}
                </p>
              </Col>
            </Row>
            {/* Tổng tiền */}
            <Row>
              <Col span={5}>
                <p>Tổng tiền: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p>516.000</p>
              </Col>
            </Row>
            <p>Ghi chú: </p>
            <TextArea
              rows={4}
              value={ghiChu}
              onChange={handleGhiChuChange}
              id="ghiChu"
            />
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ width: "100%", marginTop: 20, fontWeight: "bold" }}
                  onClick={() => handleLuuHoaDon(id)}
                >
                  Lưu hóa đơn
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GioHangTaiQuay;
