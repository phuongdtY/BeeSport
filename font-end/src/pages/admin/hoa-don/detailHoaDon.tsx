import {
  DeleteOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataType as DataTypeHoaDon,
  UpdatedRequest,
  UpdateDiaChiHoaDon,
} from "~/interfaces/hoaDon.type";
import {
  DataType as DataTypeHoaDonChiTiet,
  DataParams,
} from "~/interfaces/hoaDonChiTiet.type";
import request from "~/utils/request";
const { confirm } = Modal;
import generatePDF, { Options } from "react-to-pdf";
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import DiaChiComponent from "./diaChiModal";
import HoaDonChiTietComponent from "./hoaDonChiTietModal";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import ExportHoaDonPDF from "./exportHoaDonPDF";
import { formatGiaTien } from "~/utils/formatResponse";

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
  const [sanPhamOpen, setSanPhamOpen] = useState(false);
  const [hoaDonOpen, setHoaDonOpen] = useState(false);
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  const [data, setData] = useState<DataTypeHoaDon | null>(null);
  const [listHoaDonChiTiet, setListHoaDonChiTiet] = useState<
    DataTypeHoaDonChiTiet[]
  >([]);
  const [orderStatus, setOrderStatus] = useState(data?.trangThaiHoaDon);
  const [diaChiThongTin, setDiaChiThongTin] = useState(data?.diaChiNguoiNhan);
  const [phiShipThongTin, setphiShipThongTin] = useState(data?.phiShip);
  const [tongTien, setTongTien] = useState(data?.tongTien);
  const [idHoaDonTamThoi, setIdHoaDonTamThoi] = useState(data?.id);
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
      dataIndex: "donGiaFromat",
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
    {
      title: "Xóa",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: true,
      width: "20%",
      render: (id) => (
        <Space>
          <Tooltip title="Xóa">
            <Button type="link" style={{ padding: 0 }}>
              <DeleteOutlined
                onClick={() => handleClickDelete(id)}
                style={{ color: "red" }}
              />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const [showExportButton, setShowExportButton] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [params, setParams] = useState<DataParams>({
    page: 1,
    pageSize: 10,
  });

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
  // API hóa đơn theo đối tượng
  const getParams = (params: DataParams) => ({
    page: listHoaDonChiTiet.length !== 0 ? params.page : 1,
    pageSize: params.pageSize,
    searchText: params.searchText,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  });
  const fetchHoaDonData = async () => {
    setLoadingTable(true);
    try {
      const res = await request.get("hoa-don/test-hoa-don/" + id, {
        params: {
          ...getParams(params),
        },
      });
      form.setFieldsValue({
        diaChiNguoiNhan: res.data?.hoaDonResponse.diaChiNguoiNhan,
        emailNguoiNhan: res.data?.hoaDonResponse.emailNguoiNhan,
        sdtNguoiNhan: res.data?.hoaDonResponse.sdtNguoiNhan,
        ghiChu: res.data?.hoaDonResponse.ghiChu,
      });
      setTotalElements(res.data?.hoaDonChiTietResponsePage.totalElements);
      setData(res.data?.hoaDonResponse);
      setOrderStatus(res.data?.hoaDonResponse.trangThaiHoaDon);
      setDiaChiThongTin(res.data?.hoaDonResponse.diaChiNguoiNhan);
      setphiShipThongTin(res.data?.hoaDonResponse.phiShip);
      setListHoaDonChiTiet(res.data?.hoaDonChiTietResponsePage.content);
      setLoadingTable(false);
      setTongTien(res.data?.hoaDonResponse.tongTien);
      setIdHoaDonTamThoi(res.data.hoaDonResponse.id);
    } catch (error) {
      console.log(error);

      setLoadingTable(false);
    }
  };
  const handleSearch = (value: string) => {
    setParams({
      ...params,
      searchText: value,
    });
    console.log(value);
  };

  const onChangeTable = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataTypeHoaDonChiTiet> | any
  ) => {
    filters;
    const page = pagination.current !== undefined ? pagination.current : 1;
    const pageSize =
      pagination.pageSize !== undefined ? pagination.pageSize : 10;
    setParams({
      ...params,
      page: page,
      pageSize: pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
  };
  // đóng mở modal địa chỉ hóa đơn
  const showDiaChiModal = () => {
    setDiaChiOpen(true);
  };
  const handleCancel = () => {
    setDiaChiOpen(false);
  };
  // đóng mở modal thêm sản phẩm
  const showSanPhamModal = () => {
    setSanPhamOpen(true);
  };
  const handleCancelSanPham = () => {
    setSanPhamOpen(false);
  };
  // đóng mở modal export hóa đơn
  const showExportHoaDonModal = () => {
    setHoaDonOpen(true);
  };
  const handleCancelExportHoaDon = () => {
    setHoaDonOpen(false);
  };
  // xử lý theo handle
  const deleteRequest = async (id: number) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc xóa sản phẩm này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoadingTable(true);
          const res = await request.delete(`hoa-don/${id}`);
          setLoadingTable(false);
          fetchHoaDonData();
          if (res.data) {
            message.success("Xóa sản phẩm thành công");
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Xóa sản phẩm thất bại");
          }
        }
      },
    });
  };
  const handleClickDelete = async (id: number) => {
    deleteRequest(id);
  };
  const handleProvinceChange = (provinceId: string) => {
    fetchDistricts(provinceId);
  };
  const handleDistrictChange = (districtId: string) => {
    fetchWards(districtId);
  };
  // load dữ liệu useEffect
  useEffect(() => {
    fetchHoaDonData();
    fetchProvinces();
  }, [params]);
  // cập nhật hóa đơn
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
            phiShip: data?.phiShip,
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
  // lấy tên của địa chỉ và cập nhật địa chỉ
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
      donGiaFromat: formatGiaTien(item.donGia),
      thanhTien: formatGiaTien(Number(item.soLuong) * Number(item.donGia)),
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
  // xử lý button xác nhận và vận chuyển
  const handleConfirm = async (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật hóa đơn này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        setOrderStatus(confirmedStatus);
        try {
          const res = await request.put("hoa-don/" + id, {
            ma: data?.ma,
            diaChiNguoiNhan: data?.diaChiNguoiNhan,
            emailNguoiNhan: values.emailNguoiNhan,
            ghiChu: values.ghiChu,
            trangThaiHoaDon: "CONFIRMED",
            loaiHoaDon: data?.loaiHoaDon.ten,
            nguoiNhan: data?.nguoiNhan,
            sdtNguoiNhan: values.sdtNguoiNhan,
            phiShip: data?.phiShip,
            tongTien: data?.tongTien,
          });
          setLoadingForm(false);
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
      },
    });
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
          phiShip: data?.phiShip,
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
      // downloadPdf();
      setOrderStatus(shipingStatus);
    }
  };
  const someFunction = () => {
    4;
    console.log("Button clicked!");
  };
  const onSuccess = () => {
    setLoadingTable(false);
  };
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
            <div>
              <Card style={{ marginBottom: "5px" }}>
                <Row>
                  <Col span={12}>
                    <h3>Thông tin người mua</h3>
                  </Col>
                </Row>
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
                    <Form.Item name="emailNguoiNhan" label="Email người nhận">
                      <Input />
                    </Form.Item>
                    <Form.Item name="ghiChu" label="Ghi chú">
                      <TextArea />
                    </Form.Item>
                    <Form.Item name="phiShip" label="Phí ship">
                      <div style={{ width: "190px" }}>
                        <span>{formatGiaTien(Number(phiShipThongTin))}</span>
                      </div>
                    </Form.Item>
                    <Form.Item name="tongTien" label="Tổng tiền">
                      <div style={{ width: "190px" }}>
                        <span>{formatGiaTien(tongTien)}</span>
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Space>
                        {/* {orderStatus?.ten === "PENDING" && ( */}
                        <Button
                          type="primary"
                          onClick={async () => {
                            await handleConfirm(form.getFieldsValue());
                          }}
                        >
                          Xác nhận
                        </Button>
                        {/* )} */}

                        {/* {orderStatus?.ten === "CONFIRMED" &&
                          showExportButton && ( */}
                        <Button type="primary" onClick={showExportHoaDonModal}>
                          Export PDF
                        </Button>

                        {/* )} */}
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card>
                <Row>
                  <Space direction="horizontal">
                    <h3 style={{ width: "200px" }}>Danh sách sản phẩm</h3>
                    <Input
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Tìm kiếm theo Tên..."
                      style={{ width: "200px" }}
                      allowClear
                      prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                    />
                    <Button onClick={showSanPhamModal}>Thêm sản phẩm</Button>
                  </Space>
                </Row>
                <Table
                  pagination={{
                    pageSizeOptions: ["1", "5", "10"],
                    showSizeChanger: true,
                    total: totalElements,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                  }}
                  columns={columns}
                  dataSource={dataSourceDanhSachSanPham()}
                  onChange={onChangeTable}
                  loading={loadingTable}
                  showSorterTooltip={false}
                />
              </Card>
            </div>
          </Form>
        </Skeleton>
      </Card>
      {/* Chỗ để modal */}
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
      <HoaDonChiTietComponent
        loadTable={fetchHoaDonData}
        open={sanPhamOpen}
        onCancel={handleCancelSanPham}
        idHoaDon={idHoaDonTamThoi}
        setLoading={setLoadingTable}
        onSuccess={onSuccess}
      />
      <ExportHoaDonPDF
        open={hoaDonOpen}
        onCancel={handleCancelExportHoaDon}
        id={data?.id}
      />
    </>
  );
};

export default detailHoaDon;
