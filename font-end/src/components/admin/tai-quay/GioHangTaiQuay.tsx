import { Button, Card, Col, Divider, Row, Select, Space, Switch } from "antd";
import React, { useState, useEffect } from "react";
import ThongTinGiaoHang from "./ThongTinGiaoHang";
import TextArea from "antd/es/input/TextArea";
import TableSanPham from "./TableSanPham";
import { PlusOutlined } from "@ant-design/icons";
import request, { request4s } from "~/utils/request";
import ModalAddKhachHang from "./ModalAddKhachHang";
import { formatPhoneNumber } from "~/utils/formatResponse";

const GioHangTaiQuay: React.FC<{ id: number }> = ({ id }) => {
  const [checked, setChecked] = useState(false);
  const [selectKhachHangOptions, setSelectKhachHangOptions] = useState([]);
  const [selectKhachHang, setSelectKhachHang] = useState<any>(null);
  const [voucherOptions, setVoucherOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalPriceFromTable, setTotalPriceFromTable] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleVoucherSelect = (value, option) => {
    const selectedVoucher = voucherOptions.find(
      (voucher) => voucher.id === value
    );

    const hinhThucGiamGia = selectedVoucher.hinhThucGiam;
    const giaTriGiam = selectedVoucher.giaTriGiam;

    console.log(selectedVoucher);

    setSelectedVoucher(selectedVoucher);
  };

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

  useEffect(() => {}, [totalPriceFromTable]);

  useEffect(() => {
    loadSelectKhachHang();
    request4s
      .get("voucher/list")
      .then((response) => {
        const options = response.data.map((voucher) => ({
          ...voucher,
        }));
        setVoucherOptions(options);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách voucher từ API: ", error);
      });
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
                  onChange={handleVoucherSelect}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={voucherOptions.map((voucher) => ({
                    value: voucher.id,
                    label:
                      voucher.hinhThucGiam.id === 1
                        ? `${voucher.ten} - Giảm: ${formatCurrency(
                            voucher.giaTriGiam
                          )}`
                        : `${voucher.ten} - Giảm: ${voucher.giaTriGiam}% `,
                  }))}
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
            <TextArea rows={4} />
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ width: "100%", marginTop: 20, fontWeight: "bold" }}
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
