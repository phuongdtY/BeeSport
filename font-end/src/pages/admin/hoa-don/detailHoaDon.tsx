import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataType as DataTypeHoaDon,
  UpdatedRequest,
  UpdateDiaChiHoaDon,
} from "~/interfaces/hoaDon.type";
import { DataType as DataTypeHoaDonChiTiet } from "~/interfaces/hoaDonChiTiet.type";
import request from "~/utils/request";
const { confirm } = Modal;
import generatePDF, { Options } from "react-to-pdf";
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import DiaChiComponent from "./diaChiModal";

const optionPrintPDF: Options = {
  filename: "hoa-don.pdf",
  page: {
    margin: 20,
  },
};

interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const getTargetElement = () => document.getElementById("pdfReaderHoaDon");
const downloadPdf = () => generatePDF(getTargetElement, optionPrintPDF);

const detailHoaDon: React.FC = () => {
  const [diaChiOpen, setDiaChiOpen] = useState(false);
  const showDiaChiModal = () => {
    setDiaChiOpen(true);
  };
  const handleCancel = () => {
    setDiaChiOpen(false);
  };
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  const [data, setData] = useState<DataTypeHoaDon | null>(null);
  const [listHoaDonChiTiet, setListHoaDonChiTiet] = useState<
    DataTypeHoaDonChiTiet[] | null
  >(null);
  const [orderStatus, setOrderStatus] = useState(data?.trangThaiHoaDon);
  const [diaChiThongTin, setDiaChiThongTin] = useState(data?.diaChiNguoiNhan);
  const [phiShipThongTin, setphiShipThongTin] = useState(data?.phiShip);
  const [tongTien, setTongTien] = useState(data?.tongTien);
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
  const [showExportButton, setShowExportButton] = useState(true);
  // API địa chỉ
  const fetchProvinces = async () => {
    try {
      const provinceRes = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );

      const provinceOptions: Option[] = provinceRes.data.data.map(
        (province: any) => ({
          value: province.ProvinceID,
          label: province.ProvinceName,
          isLeaf: false,
        })
      );
      setProvinces(provinceOptions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchHoaDonData = async () => {
      setLoadingForm(true);
      try {
        const res = await request.get("hoa-don/" + id);
        form.setFieldsValue({
          diaChiNguoiNhan: res.data?.diaChiNguoiNhan,
          emailNguoiNhan: res.data?.emailNguoiNhan,
          sdtNguoiNhan: res.data?.sdtNguoiNhan,
          ghiChu: res.data?.ghiChu,
        });
        setData(res.data);
        setOrderStatus(res.data?.trangThaiHoaDon);
        setDiaChiThongTin(res.data?.diaChiNguoiNhan);
        setphiShipThongTin(res.data?.phiShip);
        setListHoaDonChiTiet(res.data.hoaDonChiTietList);
        setLoadingForm(false);
        setTongTien(res.data?.tongTien);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    fetchHoaDonData();
    fetchProvinces();
  }, [id]);
  const fetchDistricts = async (idProvince: string) => {
    try {
      const districtRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?`,
        {
          params: {
            province_id: idProvince,
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );

      const districtOptions: Option[] = districtRes.data.data.map(
        (district: any) => ({
          value: district.DistrictID,
          label: district.DistrictName,
          isLeaf: false,
        })
      );
      setDistricts(districtOptions);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchWards = async (idDistrict: string) => {
    try {
      const wardRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          params: {
            district_id: idDistrict,
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );

      const wardOptions: Option[] = wardRes.data.data.map((ward: any) => ({
        value: ward.WardCode,
        label: ward.WardName,
        isLeaf: false,
      }));
      setWards(wardOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvinceChange = (provinceId: string) => {
    fetchDistricts(provinceId);
  };
  const handleDistrictChange = (districtId: string) => {
    fetchWards(districtId);
  };

  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật hóa đơn này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await request.put("hoa-don/" + id, {
            ma: data?.ma,
            diaChiNguoiNhan: values.diaChiNguoiNhan,
            emailNguoiNhan: values.emailNguoiNhan,
            ghiChu: values.ghiChu,
            trangThaiHoaDon: data?.trangThaiHoaDon.ten,
            loaiHoaDon: data?.loaiHoaDon.ten,
            nguoiNhan: data?.nguoiNhan,
            sdtNguoiNhan: data?.sdtNguoiNhan,
            tongTien: data?.tongTien,
          });
          if (res.data) {
            message.success("Cập nhật hóa đơn thành công");
            navigate("/admin/hoa-don");
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Cập nhật hóa đơn thất bại");
          }
        }
      },
    });
  };

  const getProvinceLabelFromId = (id: number | null | undefined) => {
    const province = provinces.find((p) => p.value === id);
    return province?.label;
  };

  const getDistrictLabelFromId = (id: number | null | undefined) => {
    const district = districts.find((d) => d.value === id);
    return district?.label;
  };

  const getWardLabelFromId = (id: number | null | undefined) => {
    const ward = wards.find((w) => w.value === id);
    return ward?.label;
  };

  const onUpdateDiaChi = async (value: UpdateDiaChiHoaDon) => {
    const provinceLabel = getProvinceLabelFromId(value.thanhPho);
    const districtLabel = getDistrictLabelFromId(value.quanHuyen);
    const wardLabel = getWardLabelFromId(value.phuongXa);
    try {
      const feeRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
        {
          params: {
            service_type_id: "2",
            to_district_id: value.quanHuyen,
            to_ward_code: value.phuongXa,
            height: "9",
            length: "29",
            weight: "300",
            width: "18",
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            shop_id: "4611572",
            ContentType: "application/json",
          },
        }
      );

      const feeResponse = feeRes.data.data.total;

      const res = await request.put("hoa-don/" + id, {
        ma: data?.ma,
        diaChiNguoiNhan:
          value.diaChiCuThe +
          ", " +
          wardLabel +
          ", " +
          districtLabel +
          ", " +
          provinceLabel,
        phiShip: feeResponse,
        emailNguoiNhan: data?.emailNguoiNhan,
        ghiChu: data?.ghiChu,
        trangThaiHoaDon: data?.trangThaiHoaDon.ten,
        loaiHoaDon: data?.loaiHoaDon.ten,
        nguoiNhan: data?.nguoiNhan,
        sdtNguoiNhan: data?.sdtNguoiNhan,
        tongTien: tinhTongTien(feeResponse),
      });
      setDiaChiThongTin(
        value.diaChiCuThe +
          ", " +
          wardLabel +
          ", " +
          districtLabel +
          ", " +
          provinceLabel
      );
      setphiShipThongTin(feeResponse);
      setTongTien(tinhTongTien(feeResponse));
      if (res.data) {
        message.success("Cập nhật địa chỉ hóa đơn thành công");
      } else {
        console.error("Phản hồi API không như mong đợi:", res);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        console.error("Lỗi không xác định:", error);
        message.error("Cập nhật địa chỉ hóa đơn thất bại");
      }
    }
  };

  // hiển thị danh sách sản phẩm trong cột
  const dataSourceDanhSachSanPham = () => {
    return listHoaDonChiTiet?.map((item) => ({
      ...item,
      maMauSac: item.chiTietSanPham.mauSac.ma,
      soKichCo: item.chiTietSanPham.kichCo.kichCo,
      thanhTien: Number(item.soLuong) * Number(item.donGia),
    }));
  };
  // tính tổng tiền của hóa đơn đó cần trả
  const tinhTongTien = (tienShip: number) => {
    return (
      (listHoaDonChiTiet || [])
        .map((item) => ({
          ...item,
          thanhTien: Number(item.soLuong) * Number(item.donGia),
        }))
        .reduce((sum, item) => sum + item.thanhTien, 0) + tienShip
    );
  };

  // trạng thái của hóa đơn xử lý button
  const confirmedStatus = {
    ten: "CONFIRMED",
    moTa: "Đã xác nhận",
    mauSac: "success",
  };

  const shipingStatus = {
    ten: "SHIPPING",
    moTa: "Đang vận chuyển",
    mauSac: "geekblue",
  };

  // xử lý button xác nhận
  const handleConfirm = async (values: UpdatedRequest) => {
    setOrderStatus(confirmedStatus);
    try {
      const res = await request.put("hoa-don/" + id, {
        ma: data?.ma,
        diaChiNguoiNhan: values.diaChiNguoiNhan,
        emailNguoiNhan: values.emailNguoiNhan,
        ghiChu: values.ghiChu,
        trangThaiHoaDon: "CONFIRMED",
        loaiHoaDon: data?.loaiHoaDon.ten,
        nguoiNhan: data?.nguoiNhan,
        sdtNguoiNhan: data?.sdtNguoiNhan,
        tongTien: data?.tongTien,
      });
      if (res.data) {
        message.success("Cập nhật hóa đơn thành công");
      } else {
        console.error("Phản hồi API không như mong đợi:", res);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        console.error("Lỗi không xác định:", error);
        message.error("Cập nhật hóa đơn thất bại");
      }
    }
  };

  const handleDeliver = async (values: UpdatedRequest) => {
    if (orderStatus?.ten === "CONFIRMED") {
      setShowExportButton(false);
      try {
        const res = await request.put("hoa-don/" + id, {
          ma: data?.ma,
          diaChiNguoiNhan: values.diaChiNguoiNhan,
          emailNguoiNhan: values.emailNguoiNhan,
          ghiChu: values.ghiChu,
          trangThaiHoaDon: "SHIPPING",
          loaiHoaDon: data?.loaiHoaDon.ten,
          nguoiNhan: data?.nguoiNhan,
          sdtNguoiNhan: data?.sdtNguoiNhan,
          tongTien: data?.tongTien,
        });
        if (res.data) {
          message.success("Cập nhật hóa đơn thành công");
        } else {
          console.error("Phản hồi API không như mong đợi:", res);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          message.error(error.response.data.message);
        } else {
          console.error("Lỗi không xác định:", error);
          message.error("Cập nhật hóa đơn thất bại");
        }
      }
      downloadPdf();
      setOrderStatus(shipingStatus);
    }
  };

  //
  return (
    <>
      <Card title="Hóa đơn chi tiết">
        <Skeleton loading={loadingForm}>
          <Form
            labelCol={{ span: 11 }}
            style={{ maxWidth: 1000 }}
            onFinish={onFinish}
            layout="horizontal"
            form={form}
          >
            <div id="pdfReaderHoaDon">
              <Card
                title={"Thông tin người mua"}
                style={{ marginBottom: "5px" }}
              >
                <Row>
                  <Col span={10}>
                    <Form.Item name="ma" label="Mã hóa đơn">
                      <span>{data?.ma}</span>
                    </Form.Item>
                    <Form.Item name="loaiHoaDon" label="Loại hóa đơn">
                      <Tag color={data?.loaiHoaDon?.mauSac}>
                        {data?.loaiHoaDon.moTa}
                      </Tag>
                    </Form.Item>
                    <Form.Item
                      name="trangThaiHoaDon"
                      label="Trạng thái hóa đơn"
                    >
                      <Tag color={orderStatus?.mauSac}>{orderStatus?.moTa}</Tag>
                    </Form.Item>
                    <Form.Item name="nguoiNhan" label="Người nhận">
                      <span>{data?.nguoiNhan}</span>
                    </Form.Item>
                    <Form.Item
                      name="sdtNguoiNhan"
                      label="Số điện thoại người nhận"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item
                      name="diaChiNguoiNhan"
                      label="Địa chỉ người nhận"
                    >
                      <Space direction="horizontal">
                        <div style={{ width: "190px" }}>
                          <span>{diaChiThongTin}</span>
                        </div>
                        <Button onClick={showDiaChiModal}>Tùy chỉnh</Button>
                      </Space>
                    </Form.Item>
                    <DiaChiComponent
                      open={diaChiOpen}
                      onUpdate={onUpdateDiaChi}
                      onCancel={handleCancel}
                      provinces={provinces}
                      districts={districts}
                      wards={wards}
                      onProvinceChange={handleProvinceChange}
                      onDistrictChange={handleDistrictChange}
                      fee={Number(phiShipThongTin)}
                    />
                    <Form.Item name="emailNguoiNhan" label="Email người nhận">
                      <Input />
                    </Form.Item>
                    <Form.Item name="ghiChu" label="Ghi chú">
                      <TextArea />
                    </Form.Item>
                    <Form.Item name="phiShip" label="Phí ship">
                      <div style={{ width: "190px" }}>
                        <span>{phiShipThongTin}</span>
                      </div>
                    </Form.Item>
                    <Form.Item name="tongTien" label="Tổng tiền">
                      <div style={{ width: "190px" }}>
                        <span>{tongTien}</span>
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Space>
                        {orderStatus?.ten === "PENDING" && (
                          <Button
                            type="primary"
                            onClick={async () => {
                              await handleConfirm(form.getFieldsValue());
                            }}
                          >
                            Xác nhận
                          </Button>
                        )}

                        {orderStatus?.ten === "CONFIRMED" &&
                          showExportButton && (
                            <Button
                              type="primary"
                              onClick={async () => {
                                await handleDeliver(form.getFieldsValue());
                              }}
                            >
                              Export PDF
                            </Button>
                          )}
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card title={"Danh sách sản phẩm"}>
                <Table
                  columns={columns}
                  dataSource={dataSourceDanhSachSanPham()}
                />
              </Card>
            </div>
          </Form>
        </Skeleton>
      </Card>
    </>
  );
};

export default detailHoaDon;
