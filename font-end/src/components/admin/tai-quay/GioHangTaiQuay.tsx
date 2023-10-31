import { Button, Card, Col, Divider, Row, Select, Space, Switch } from "antd";
import React, { useState, useEffect } from "react";
import ThongTinGiaoHang from "./ThongTinGiaoHang";
import TextArea from "antd/es/input/TextArea";
import TableSanPham from "./TableSanPham";
import { PlusOutlined } from "@ant-design/icons";
import request from "~/utils/request";
import ModalAddKhachHang from "./ModalAddKhachHang";

const GioHangTaiQuay: React.FC<{ id: number }> = ({ id }) => {
  const [checked, setChecked] = useState(false);
  const [selectKhachHangOptions, setSelectKhachHangOptions] = useState([]);
  const [selectKhachHang, setSelectKhachHang] = useState<any>(null);
  const [selectVoucher, setSelectVoucher] = useState<string | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // Call your API to fetch the list of khach hang options
    request
      .get("khach-hang/list")
      .then((response) => {
        const data = response.data;
        setSelectKhachHangOptions(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onChangeGiaoHang = (checked: boolean) => {
    setChecked(checked);
  };

  const onChangeKhachHang = (value: string) => {
    // Find the selected khachHang object from selectKhachHangOptions based on the value
    const selectedKhachHang = selectKhachHangOptions.find(
      (khachHang) => khachHang.id === value
    );

    setSelectKhachHang(selectedKhachHang);
  };

  const onChangeVoucher = (value: string) => {
    setSelectVoucher(value);
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
                    {selectKhachHang.soDienThoai}
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
            <TableSanPham id={id} />
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
                  onChange={onChangeVoucher}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "1",
                      label: "Giảm giá Tết Dương Lịch",
                    },
                    {
                      value: "2",
                      label: "Giảm giá Tết Nguyên Đán",
                    },
                    {
                      value: "3",
                      label: "Giảm giá Sinh nhật",
                    },
                  ]}
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
                <p>500.000</p>
              </Col>
            </Row>
            {/* Phí vận chuyển */}
            <Row>
              <Col span={7}>
                <p>Phí vận chuyển: </p>
              </Col>
              <Col span={14}></Col>
              <Col span={3}>
                <p>50.000</p>
              </Col>
            </Row>
            {/* Giảm giá */}
            <Row>
              <Col span={5}>
                <p>Giảm giá: </p>
              </Col>
              <Col span={16}></Col>
              <Col span={3}>
                <p>34.000</p>
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
