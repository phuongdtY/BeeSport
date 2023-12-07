import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import { BsCashCoin, BsCreditCard2Back } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import ThongTinGiaoHang from "./ThongTinGiaoHang";
import TextArea from "antd/es/input/TextArea";
import TableSanPham from "./TableSanPham";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import request from "~/utils/request";
import ModalAddKhachHang from "./ModalAddKhachHang";
import { formatGiaTienVND, formatPhoneNumber } from "~/utils/formatResponse";
import dayjs from "dayjs";

const GioHangTaiQuay: React.FC<{ id: number; loadHoaDon: () => void }> = ({
  id,
  loadHoaDon,
}) => {
  const [checked, setChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectKhachHangOptions, setSelectKhachHangOptions] = useState([]);
  const [selectKhachHang, setSelectKhachHang] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalPriceFromTable, setTotalPriceFromTable] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [hoaDon, setHoaDon] = useState(null); // State để lưu đối tượng hóa đơn
  const [ghiChu, setGhiChu] = useState("null"); // State để lưu đối tượng hóa đơn
  const [address, setAddress] = useState(""); // Sử dụng state để lưu địa chỉ
  const [phiShip, setPhiShip] = useState(0);
  const [isCashSelected, setIsCashSelected] = useState(false); // State để kiểm tra xem "Tiền mặt" được chọn hay không
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [tienKhachDua, setTienKhachDua] = useState(0);
  const [giaTriGiam, setGiaTriGiam] = useState(0); // New state for discount amount
  const [selectedVoucher, setSelectedVoucher] = useState([]);
  const [tongTienKhiGiam, setTongTienKhiGiam] = useState(0);
  const [listChiTiet, setListChiTiet] = useState(null);
  const { confirm } = Modal;

  const calculateRemainingAmountForVoucher = () => {
    // Sắp xếp các voucher theo giaToiThieu theo thứ tự tăng dần
    const sortedVouchers = vouchers.sort(
      (a, b) => a.donToiThieu - b.donToiThieu
    );

    // Tìm voucher đầu tiên mà tổng số tiền nhỏ hơn giaToiThieu
    const nextVoucher = sortedVouchers.find(
      (voucher) => totalPriceFromTable < voucher.donToiThieu
    );

    if (nextVoucher) {
      const remainingAmount = nextVoucher.donToiThieu - totalPriceFromTable;

      return { remainingAmount, nextVoucher };
    } else {
      return { remainingAmount: 0, nextVoucher: null }; // Không còn voucher nào khả dụng
    }
  };

  const handleTienKhachDuaChange = (event) => {
    const giaTriTienKhachDua = event.target.value;
    setTienKhachDua(giaTriTienKhachDua);
  };

  const { remainingAmount, nextVoucher } = calculateRemainingAmountForVoucher();

  const getVouchers = async () => {
    try {
      const response = await request.get("/voucher/list");

      if (response.status === 200) {
        const fetchedVouchers = response.data;

        if (totalPriceFromTable === 0) {
          setSelectedVoucher(null); // Reset the selected voucher if total price is 0
          setGiaTriGiam(0); // Reset giaTriGiam if total price is 0
          return; // Exit the function early as no voucher can be applied
        }

        // Sort vouchers by donToiThieu in ascending order
        const sortedVouchers = fetchedVouchers.sort(
          (a, b) => a.donToiThieu - b.donToiThieu
        );

        let newSelectedVoucher = null; // Initialize a variable to track the new selected voucher
        let newGiaTriGiam = 0; // Initialize the discount value for the new selected voucher

        sortedVouchers.forEach((voucher) => {
          if (
            totalPriceFromTable >= voucher.donToiThieu &&
            (!newSelectedVoucher ||
              voucher.donToiThieu > newSelectedVoucher.donToiThieu)
          ) {
            // Check if the current voucher meets the condition and has a higher donToiThieu than the current selectedVoucher
            newSelectedVoucher = voucher; // Set the new selected voucher
            if (voucher.hinhThucGiam.id === 1) {
              newGiaTriGiam = voucher.giaTriGiam;
            } else {
              const giam = (totalPriceFromTable / 100) * voucher.giaTriGiam;
              newGiaTriGiam =
                giam > voucher.giamToiDa ? voucher.giamToiDa : giam;
            }
          }
        });

        if (newSelectedVoucher) {
          setSelectedVoucher(newSelectedVoucher); // Set the new selected voucher
          setGiaTriGiam(newGiaTriGiam); // Set the discount value for the new selected voucher
        } else {
          setSelectedVoucher(null); // Reset the selected voucher if none is selected
          setGiaTriGiam(0); // Reset giaTriGiam if no voucher is selected
        }

        setVouchers(sortedVouchers); // Set the sorted vouchers
      } else {
        message.error("Error fetching vouchers");
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      message.error("Error fetching vouchers");
    }
  };

  const [customerInfo, setCustomerInfo] = useState({
    // Initialize with default values if needed
    nguoiNhan: "",
    sdtNguoiNhan: "",
    emailNguoiNhan: "",
  });

  const tienTraKhach = tienKhachDua - tongTienKhiGiam;

  const giaTriTienTraKhach = tienTraKhach < 0 ? 0 : tienTraKhach;

  // Xử lý sự kiện khi radio "Tiền mặt" được chọn
  const handleCashRadioChange = (e) => {
    setIsCashSelected(e.target.value === 0);
  };

  const handleCustomerInfoChange = (formValues) => {
    setCustomerInfo({
      nguoiNhan: formValues.nguoiNhan,
      sdtNguoiNhan: formValues.sdtNguoiNhan,
      emailNguoiNhan: formValues.emailNguoiNhan,
    });
  };

  // Xử lý sự kiện thay đổi địa chỉ (address) từ ThongTinGiaoHang
  const handleFullAddressChange = (addressValue) => {
    setAddress(addressValue);
  };

  // Xử lý sự kiện thay đổi phí ship (phiShip) từ ThongTinGiaoHang
  const handleFeeResponseChange = (feeValue) => {
    setPhiShip(feeValue);
  };

  // Hàm để lấy thông tin chi tiết hóa đơn dựa trên id
  const fetchHoaDonDetails = async (idHoaDon) => {
    try {
      // Gọi API để lấy thông tin hóa đơn dựa trên idHoaDon
      const response = await request.get(`/hoa-don/${idHoaDon}`);
      setListChiTiet(response.data.hoaDonChiTietList);

      if (response.status === 200) {
        const hoaDon = response.data; // Dữ liệu hóa đơn từ máy chủ
        setHoaDon(hoaDon); // Lưu hóa đơn vào state
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
      fetchHoaDonDetails(id);
    }
  }, [id]);

  const passTotalPriceToParent = (price) => {
    setTotalPriceFromTable(price);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

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
    const idTaiKhoan = selectKhachHang ? selectKhachHang.id : null;
    const tongTien = totalPriceFromTable;
    // Tạo đối tượng hóa đơn
    const hoaDonData = {
      id: id,
      ma: hoaDon.ma,
      loaiHoaDon: "COUNTER",
      taiKhoan: idTaiKhoan !== null ? { id: idTaiKhoan } : null,
      tongTien: tongTien,
      tongTienKhiGiam: tongTienKhiGiam,
      voucher:
        selectedVoucher != null || undefined
          ? {
              id: selectedVoucher.id,
            }
          : null,
      phiShip: phiShip, // Thêm phiShip vào hoaDonData
      diaChiNguoiNhan: address, // Thêm address vào hoaDonData
      donToiThieu: 12000,
      trangThaiHoaDon: "CONFIRMED",
      ghiChu: ghiChu,
      nguoiNhan: customerInfo.nguoiNhan,
      sdtNguoiNhan: customerInfo.sdtNguoiNhan,
      emailNguoiNhan: customerInfo.emailNguoiNhan,
      idPhuongThuc: 1,
    };

    return hoaDonData;
  };

  const handleLuuHoaDon = async (id) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn lưu hóa đơn không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        const hoaDonData = getHoaDonData();

        const hoaDonCho = {
          ...hoaDonData,
          trangThaiHoaDon: "CONFIRMED",
        };

        if (totalPriceFromTable == 0) {
          // Nếu không có chi tiết hóa đơn nào trong hoaDonData, hiển thị thông báo cho người dùng
          message.warning("Chưa có sản phẩm nào trong giỏ hàng.");
          return; // Ngăn chặn việc lưu hóa đơn nếu không có sản phẩm trong giỏ hàng
        }

        try {
          const response = await request.put(`/hoa-don/${id}`, hoaDonCho);
          if (response.status === 200) {
            loadHoaDon();
            message.success("Hóa đơn đã được lưu thành công.");
          } else {
            message.error("Có lỗi xảy ra khi lưu hóa đơn.");
          }
        } catch (error) {
          console.error("Error saving invoice:", error);
          message.error("Có lỗi xảy ra khi lưu hóa đơn.");
        }
      },
    });
  };

  const handleThanhToan = async (id) => {
    fetchHoaDonDetails(id);
    console.log(listChiTiet);

    // Lấy danh sách các mặt hàng có số lượng không hợp lệ
    const invalidQuantityItems = listChiTiet.filter(
      (item) => item.soLuong > item.chiTietSanPham.soLuong
    );

    // Kiểm tra nếu có mặt hàng không hợp lệ
    if (invalidQuantityItems.length > 0) {
      // Lấy tên của các mặt hàng không hợp lệ
      const invalidItemNames = invalidQuantityItems.map(
        (item) =>
          `${item.chiTietSanPham.sanPham.ten} [ ${item.chiTietSanPham.mauSac.ten} - ${item.chiTietSanPham.kichCo.kichCo} ]`
      );

      // Hiển thị thông báo với tên các mặt hàng không hợp lệ
      message.warning(
        `Sản phẩm ${invalidItemNames.join(", ")} có số lượng không hợp lệ`
      );
      return; // Ngăn chặn việc thanh toán nếu có mặt hàng không hợp lệ
    }
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn thanh toán hóa đơn không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        if (totalPriceFromTable == 0) {
          // Nếu không có chi tiết hóa đơn nào trong hoaDonData, hiển thị thông báo cho người dùng
          message.warning("Chưa có sản phẩm nào trong giỏ hàng.");
          return; // Ngăn chặn việc lưu hóa đơn nếu không có sản phẩm trong giỏ hàng
        }

        if (selectedRadio !== 1) {
          // Nếu tiền trả lại khách là số âm, hiển thị thông báo và ngăn chặn việc thanh toán
          if (tienTraKhach < 0) {
            message.error("Số tiền khách đưa không đủ để thanh toán.");
            return;
          }
        }

        // Tạo đối tượng hóa đơn với trạng thái APPROVE
        const hoaDonData = getHoaDonData();
        const trangThai = isChecked ? "CONFIRMED" : "APPROVED";
        const ngayHomNay = dayjs().endOf("day");
        const hoaDonThanhToan = {
          ...hoaDonData,
          trangThaiHoaDon: trangThai,
          ngayThanhToan: ngayHomNay,
          tongTienKhiGiam: tongTienKhiGiam,
        };

        console.log(hoaDonData);

        try {
          const response = await request.put(`/hoa-don/${id}`, hoaDonThanhToan);
          if (response.status === 200) {
            loadHoaDon();
            message.success("Hóa đơn đã được thanh toán thành công.");
          } else {
            message.error("Có lỗi xảy ra khi thanh toán hóa đơn.");
          }
        } catch (error) {
          console.error("Error making payment:", error);
          message.error("Có lỗi xảy ra khi thanh toán hóa đơn.");
        }
      },
    });
  };

  useEffect(() => {
    getVouchers();
  }, [vouchers, totalPriceFromTable]);

  useEffect(() => {
    const tienGiam = totalPriceFromTable + phiShip - giaTriGiam;
    setTongTienKhiGiam(tienGiam);
  }, [totalPriceFromTable, phiShip, giaTriGiam]);

  useEffect(() => {
    calculateRemainingAmountForVoucher();
    if (!checked) {
      setPhiShip(0);
    }
  }, [checked, totalPriceFromTable]);

  useEffect(() => {
    const voucher = vouchers.find(
      (voucher) => totalPriceFromTable >= voucher.donToiThieu
    );
    if (voucher) {
      setGiaTriGiam(voucher.giaTriGiam);
    } else {
      setGiaTriGiam(0);
    }
    setSelectedRadio(0);
    setIsCashSelected(true);
  }, []);

  useEffect(() => {
    loadSelectKhachHang();
  }, [selectedRadio]);

  useEffect(() => {
    // When the component mounts, trigger the selection manually
    setSelectedRadio(0); // Assuming the 'Tiền mặt' radio has a value of 0
    setIsCashSelected(true);
    setIsPaymentSelected(true); // Set to true to display the 'Thanh toán' button
  }, []); // Empty dependency array to run this effect only once on mount

  const onChangeGiaoHang = (checked: boolean) => {
    setIsChecked(checked);
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
            <Switch checked={isChecked} onChange={onChangeGiaoHang} /> Giao hàng
            <Divider />
            {checked ? (
              <>
                <Card title="Thông tin nhận hàng">
                  <ThongTinGiaoHang
                    onFullAddressChange={handleFullAddressChange}
                    onFeeResponseChange={handleFeeResponseChange}
                    onFormValuesChange={handleCustomerInfoChange}
                  />
                </Card>
                <Divider />
              </>
            ) : null}
            {/* Tạm tính */}
            <Row>
              <Col span={5}>
                <p>Tạm tính: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p>{formatGiaTienVND(totalPriceFromTable)}</p>
              </Col>
            </Row>
            {/* Phí vận chuyển */}
            {checked ? (
              <Row>
                <Col span={7}>
                  <p>Phí vận chuyển: </p>
                </Col>
                <Col span={10}></Col>
                <Col span={7}>
                  <InputNumber
                    value={phiShip}
                    style={{ width: "100%" }}
                    min={1000}
                    step={10000}
                    formatter={(value) => `${formatGiaTienVND(value)}`}
                    parser={(value: any) => value.replace(/\D/g, "")}
                    onChange={(value) => setPhiShip(value)}
                  />
                </Col>
              </Row>
            ) : null}
            {/* Giảm giá */}
            <Row>
              <Col span={5}>
                <p>Giảm giá: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p>
                  {selectedVoucher && selectedVoucher.hinhThucGiam
                    ? selectedVoucher.hinhThucGiam.id === 1
                      ? `${formatGiaTienVND(giaTriGiam)}`
                      : `${
                          selectedVoucher.giaTriGiam &&
                          (totalPriceFromTable / 100) *
                            selectedVoucher.giaTriGiam <=
                            selectedVoucher.giamToiDa
                            ? `${formatGiaTienVND(
                                (totalPriceFromTable / 100) *
                                  selectedVoucher.giaTriGiam
                              )}`
                            : `${formatGiaTienVND(selectedVoucher.giamToiDa)}`
                        }`
                    : "0 đ"}
                </p>
              </Col>
            </Row>
            {selectedVoucher && (
              <Row>
                <Space direction="vertical">
                  <span style={{ color: "green", fontWeight: "bolder" }}>
                    Đã áp dụng voucher: {selectedVoucher.ten}
                    <br />
                    {selectedVoucher.hinhThucGiam
                      ? selectedVoucher.hinhThucGiam.id === 2
                        ? `Giảm: ${
                            selectedVoucher.giaTriGiam
                          }% cho đơn hàng từ ${formatGiaTienVND(
                            selectedVoucher.donToiThieu
                          )} giảm tối đa ${formatGiaTienVND(
                            selectedVoucher.giamToiDa
                          )}`
                        : `Giảm: ${formatGiaTienVND(
                            selectedVoucher.giaTriGiam
                          )} cho đơn hàng từ ${formatGiaTienVND(
                            selectedVoucher.donToiThieu
                          )}`
                      : "Thông tin giảm giá không khả dụng"}
                  </span>
                  {nextVoucher ? (
                    <>
                      <span style={{ color: "orange", fontStyle: "italic" }}>
                        Gợi ý: Mua thêm {formatGiaTienVND(remainingAmount)} để
                        được giảm{" "}
                        {nextVoucher.hinhThucGiam && nextVoucher.giaTriGiam
                          ? nextVoucher.hinhThucGiam.id === 2
                            ? `${nextVoucher.giaTriGiam}%`
                            : `${formatGiaTienVND(nextVoucher.giaTriGiam)}`
                          : "Thông tin giảm giá không khả dụng"}
                      </span>
                    </>
                  ) : null}
                </Space>
              </Row>
            )}
            <Divider style={{ marginBottom: 0 }} />
            <Row>
              <Col span={5}>
                <p style={{ fontWeight: "bold" }}>Tổng tiền: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p style={{ fontWeight: "bold" }}>
                  {formatGiaTienVND(tongTienKhiGiam)}
                </p>
              </Col>
            </Row>
            <Divider style={{ marginTop: 0 }} />
            <p>Ghi chú: </p>
            <TextArea
              rows={4}
              value={ghiChu === "null" ? "" : ghiChu}
              onChange={handleGhiChuChange}
              id="ghiChu"
            />
            <Radio.Group
              buttonStyle="solid"
              value={selectedRadio}
              optionType="button"
              onChange={(e) => {
                const value = e.target.value;
                setSelectedRadio(value); // Đặt radio được chọn
                handleCashRadioChange(e); // Gọi hàm handleCashRadioChange của bạn
                setIsPaymentSelected(true); // Đặt biến state khi radio được chọn
              }}
              style={{ marginBottom: 15 }}
            >
              <Row gutter={[15, 15]} style={{ marginTop: 20 }}>
                <Radio.Button
                  value={0}
                  style={{
                    height: 70,
                    width: 220,
                    marginRight: 20,
                    marginLeft: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Space>
                    <BsCashCoin style={{ fontSize: 30, marginTop: 16 }} />
                    <span style={{ fontSize: 17, fontWeight: "bold" }}>
                      Tiền mặt
                    </span>
                  </Space>
                </Radio.Button>
                <Radio.Button
                  value={1}
                  style={{
                    height: 70,
                    width: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Space>
                    <BsCreditCard2Back
                      style={{ fontSize: 30, marginTop: 10 }}
                    />
                    <span style={{ fontSize: 17, fontWeight: "bold" }}>
                      Chuyển khoản
                    </span>
                  </Space>
                </Radio.Button>
              </Row>
            </Radio.Group>
            <br />
            {!checked && isCashSelected && (
              <>
                {/* Hiển thị hai ô input khi "Tiền mặt" được chọn */}
                <span>Tiền khách đưa: </span>
                <InputNumber
                  style={{ marginTop: 10, width: "100%" }}
                  value={tienKhachDua}
                  formatter={(value) => `${formatGiaTienVND(value)}`}
                  parser={(value: any) => value.replace(/\D/g, "")}
                  onChange={(value) => setTienKhachDua(value)}
                />
                <br />
                <span>Tiền trả khách: </span>
                <span
                  style={{ marginTop: 10, width: "100%", fontWeight: "bold" }}
                >
                  {formatGiaTienVND(giaTriTienTraKhach)}
                </span>
              </>
            )}
            {isPaymentSelected && !checked && (
              <Row>
                <Col span={24}>
                  <Button
                    type="primary"
                    style={{ width: "100%", marginTop: 20, fontWeight: "bold" }}
                    onClick={() => handleThanhToan(id)}
                  >
                    Thanh toán
                  </Button>
                </Col>
              </Row>
            )}
            {!isPaymentSelected && !checked && (
              <Row>
                <Col span={24}>
                  <Button
                    type="primary"
                    style={{ width: "100%", marginTop: 20, fontWeight: "bold" }}
                    onClick={() => handleLuuHoaDon(id)}
                  >
                    Xác nhận
                  </Button>
                </Col>
              </Row>
            )}
            {isPaymentSelected && checked && (
              <Row>
                <Col span={24}>
                  <Button
                    type="primary"
                    style={{ width: "100%", marginTop: 20, fontWeight: "bold" }}
                    onClick={() => handleLuuHoaDon(id)}
                  >
                    Xác nhận
                  </Button>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GioHangTaiQuay;
