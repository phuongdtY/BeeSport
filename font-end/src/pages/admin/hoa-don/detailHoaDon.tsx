import {
  CheckOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  LoadingOutlined,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Skeleton,
  Space,
  Steps,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useState, useEffect, ChangeEvent } from "react";
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
import { DataTypeGiaoDich } from "~/interfaces/giaoDich.type";
import { DataTypePhuongThucThanhToan } from "~/interfaces/phuongThucThanhToan.type";
import { DataType as DataTypeCtsp } from "~/interfaces/ctsp.type";
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
import {
  formatGiaTien,
  formatGiaTienVND,
  formatNgayTao,
} from "~/utils/formatResponse";
import React from "react";
import { FaBoxOpen, FaShippingFast } from "react-icons/fa";

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

interface Item {
  title: String | null;
  subTitle: String | null;
  description: String | null;
  icon: React.ReactNode;
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: 100,
  overflow: "auto",
  border: "1px solid #40a9ff",
};

const style: React.CSSProperties = {
  width: "100%",
  height: 1000,
};

const getTargetElement = () => document.getElementById("pdfReaderHoaDon");
const downloadPdf = () => generatePDF(getTargetElement, optionPrintPDF);

const detailHoaDon: React.FC = () => {
  const [itemTimeline, setItemTimeline] = useState<Item[]>([]);
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
  const [listGiaoDich, setListGiaoDich] = useState<DataTypeGiaoDich[]>([]);
  const [orderStatus, setOrderStatus] = useState(data?.trangThaiHoaDon);
  const [diaChiThongTin, setDiaChiThongTin] = useState(data?.diaChiNguoiNhan);
  const [phiShipThongTin, setphiShipThongTin] = useState(data?.phiShip);
  const [tongTien, setTongTien] = useState(0);
  const [tienShip, setTienShip] = useState(0);

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
      title: "Hình ảnh",
      dataIndex: "images",
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
      dataIndex: "hoaDonChiTietItem",
      key: "hoaDonChiTietItem",
      align: "center",
      sorter: true,
      width: "20%",
      render: (text, record, index) => (
        <InputNumber
          value={record.soLuong}
          inputMode="numeric"
          onChange={(newSoLuong) => {
            handleSoLuongChange(index, newSoLuong);
          }}
        />
      ),
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
      dataIndex: "thanhTienFormat",
      key: "thanhTienFormat",
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
            <Button
              type="link"
              disabled={orderStatus?.ten === "PENDING" ? false : true}
              style={{ padding: 0 }}
            >
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

  const columnsGiaoDich: ColumnsType<DataTypeGiaoDich> = [
    {
      title: "STT",
      key: "index",
      align: "center",
      rowScope: "row",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Số tiền",
      dataIndex: "soTienGiaoDich",
      key: "soTienGiaoDich",
      align: "center",
      sorter: true,
      width: "15%",
      render: (item, record) => {
        return formatGiaTienVND(record.soTienGiaoDich);
      },
    },
    {
      title: "Thời gian",
      dataIndex: "ngayTao",
      key: "ngayTao",
      align: "center",
      sorter: true,
      width: "15%",
      render: (item, record) => {
        return formatNgayTao(record.ngayTao);
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "phuongThucThanhToan",
      key: "phuongThucThanhToan",
      align: "center",
      sorter: true,
      width: "20%",
      render: (phuongThucThanhToan, record) => (
        <Tag color={phuongThucThanhToan?.id == 1 ? "green" : "blue"}>
          {phuongThucThanhToan.ten}
        </Tag>
      ),
    },
    {
      title: "Trạng thái giao dịch",
      dataIndex: "trangThaiGiaoDich",
      key: "trangThaiGiaoDich",
      align: "center",
      sorter: true,
      width: "20%",
      render: (trangThaiGiaoDich, record) => (
        <Tag color={trangThaiGiaoDich.mauSac}>{trangThaiGiaoDich.moTa}</Tag>
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
        nguoiNhan: res.data?.hoaDonResponse.nguoiNhan,
        sdtNguoiNhan: res.data?.hoaDonResponse.sdtNguoiNhan,
        ghiChu: res.data?.hoaDonResponse.ghiChu,
      });
      setTotalElements(res.data?.hoaDonChiTietResponsePage.totalElements);
      setData(res.data?.hoaDonResponse);
      setOrderStatus(res.data?.hoaDonResponse.trangThaiHoaDon);
      setDiaChiThongTin(res.data?.hoaDonResponse.diaChiNguoiNhan);
      setphiShipThongTin(res.data?.hoaDonResponse.phiShip);
      handleChagneImage(res.data?.hoaDonChiTietResponsePage.content);
      setLoadingTable(false);
      setTongTien(
        tongTien == 0
          ? res.data?.hoaDonResponse.tongTien
          : tinhTongTien(Number(tienShip))
      );
      setTienShip(res.data?.hoaDonResponse.phiShip);
    } catch (error) {
      console.log(error);
      setLoadingTable(false);
    }
  };

  const fetchGiaoDichList = async () => {
    setLoadingTable(true);
    try {
      const res = await request.get("giao-dich/list/" + id);
      setListGiaoDich(res.data);
      setLoadingTable(false);
    } catch (error) {
      console.log(error);
      setLoadingTable(false);
    }
  };

  const handleChagneImage = async (list: DataTypeHoaDonChiTiet[]) => {
    const sanPhamData = list;

    const imagePromises = sanPhamData.map((item) =>
      fetchImages(item.chiTietSanPham.sanPham.id, item.chiTietSanPham.mauSac.id)
    );

    const images = await Promise.all(imagePromises);

    const updatedSanPhamData = sanPhamData.map((item, index) => ({
      ...item,
      maMauSac: item.chiTietSanPham.mauSac.ma,
      soKichCo: item.chiTietSanPham.kichCo.kichCo,
      donGiaFromat: formatGiaTien(item.donGia),
      thanhTienFormat: formatGiaTien(
        Number(item.soLuong) * Number(item.donGia)
      ),
      tongTienSoLuong: Number(item.soLuong) * Number(item.donGia),
      hoaDonChiTietItem: item,
      images: images[index],
    }));
    setListHoaDonChiTiet(updatedSanPhamData);
  };

  const fetchDataTimeline = async () => {
    try {
      const timelineRes = await request.get("/timeline/" + id);
      const timelineItem1: Item[] = timelineRes.data.map((item: any) => ({
        title: item.trangThai.moTa,
        subTitle: formatNgayTao(item.ngayTao),
        description:
          (item.ghiChu === null ? "" : item.ghiChu) +
          "    " +
          (item.hoaDon.nguoiSua === null ? "" : item.hoaDon.nguoiSua),
        icon: handleIconTimeline(item.trangThai.ten),
      }));
      setItemTimeline(timelineItem1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconTimeline = (value: string) => {
    switch (value) {
      case "PENDING":
        return <UserOutlined />;
      case "CANCELLED":
        return <SolutionOutlined />;
      case "APPROVED":
        return <CheckOutlined />;
      case "CONFIRMED":
        return <SolutionOutlined />;
      case "SHIPPING":
        return <FaShippingFast />;
      case "PICKUP":
        return <FaBoxOpen />;
      default:
        return null;
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
          const res = await request.delete(`hoa-don/${id}`);
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

  // lấy ảnh
  const fetchImages = async (idSanPham: number, idMauSac: number) => {
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
    fetchGiaoDichList();
    fetchProvinces();
    fetchDataTimeline();
    // console.log(tongTien + " | onupdate useEff");
  }, [params, tongTien]);
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
            diaChiNguoiNhan: diaChiThongTin,
            emailNguoiNhan: values.emailNguoiNhan,
            ghiChu: values.ghiChu,
            nguoiNhan: values.nguoiNhan,
            trangThaiHoaDon: data?.trangThaiHoaDon.ten,
            loaiHoaDon: data?.loaiHoaDon.ten,
            sdtNguoiNhan: data?.sdtNguoiNhan,
            phiShip: Number(values.phiShip),
            tongTien: tongTien,
          });
          if (res.data) {
            fetchDataTimeline();
            setData(res.data);
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
        trangThaiHoaDon: orderStatus?.ten,
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
      fetchHoaDonData();
      setTienShip(feeResponse);
      setTongTien(tinhTongTien(Number(feeResponse)));
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

  const handleUpdateSoLuongSanPham = async () => {
    try {
      await request.put(
        "hoa-don/hoa-don-chi-tiet/" + id,
        listHoaDonChiTiet?.map((item) => ({
          id: item.id,
          soLuong: item.soLuong,
        }))
      );
      fetchHoaDonData();
      message.success("Cập nhật giỏ hàng thành công");
    } catch (error) {
      message.error("Cập nhật giỏ hàng thất bại");
      console.log(error);
    }
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
  const pickupStatus = {
    ten: "PICKUP",
    moTa: "Đang lấy hàng",
    mauSac: "info",
  };
  const cancelledStatus = {
    ten: "CANCELLED",
    moTa: "Đã hủy",
    mauSac: "volcano",
  };
  const approvedStatus = {
    ten: "APPROVED",
    moTa: "Đã hoàn thành",
    mauSac: "magenta",
  };
  const [formData] = Form.useForm();
  // xử lý button xác nhận và vận chuyển
  const handleStatus = async (
    values: UpdatedRequest,
    status: any,
    title: string
  ) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: (
        <Form.Item name="ghiChuTimeLine" label="Ghi chú timeline">
          <TextArea />
        </Form.Item>
      ),
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        setOrderStatus(status);
        try {
          const ghiChuTimeLineValue = form.getFieldValue("ghiChuTimeLine");
          console.log(ghiChuTimeLineValue);

          const res = await request.put("hoa-don/" + id, {
            ma: data?.ma,
            diaChiNguoiNhan: data?.diaChiNguoiNhan,
            emailNguoiNhan: values.emailNguoiNhan,
            ghiChu: values.ghiChu,
            trangThaiHoaDon: status.ten,
            loaiHoaDon: data?.loaiHoaDon.ten,
            nguoiNhan: values.nguoiNhan,
            sdtNguoiNhan: values.sdtNguoiNhan,
            phiShip: tienShip,
            tongTien: tinhTongTien(Number(tienShip)),
            tongTienKhiGiam: tinhTongTien(Number(tienShip)),
            ghiChuTimeLine: "Đang chờ sử lý",
            idPhuongThuc: 1,
          });
          setLoadingForm(false);
          setTongTien(tinhTongTien(Number(tienShip)));
          fetchDataTimeline();
          fetchHoaDonData();
          console.log(values);
          if (status.ten == "PENDING" && data?.loaiHoaDon.ten == "ONLINE") {
          }
          if (res.data) {
            message.success("Đã " + title + " hóa đơn thành công");
            if (status.ten == "PENDING" && data?.loaiHoaDon.ten == "ONLINE") {
              showExportHoaDonModal();
            }
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error(title + " hóa đơn thất bại");
          }
        }
      },
    });
  };
  const handleSoLuongChange = (index: number, newSoLuong: number | null) => {
    const newSoLuongValue = typeof newSoLuong === "number" ? newSoLuong : 0;
    const hdct = listHoaDonChiTiet[index];
    if (hdct) {
      const newData = [...listHoaDonChiTiet];
      const index = newData.indexOf(hdct);
      newData[index] = {
        ...hdct,
        soLuong: newSoLuongValue,
      };
      setListHoaDonChiTiet(newData);
    }
  };
  const handleTienShip = (event: any) => {
    setTienShip(event);
    console.log(tienShip);
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
            <Card style={{ marginBottom: "5ps" }}>
              <Row>
                <Col span={12}>
                  <h3>Timeline hóa đơn</h3>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ overflowX: "auto" }}>
                  <Steps
                    current={itemTimeline.length}
                    style={
                      itemTimeline.length > 3
                        ? { width: 1500, height: 140 }
                        : {}
                    }
                    items={itemTimeline}
                  />
                </Col>
              </Row>
            </Card>
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
                  <Form.Item name="trangThaiHoaDon" label="Trạng thái hóa đơn">
                    <Tag color={orderStatus?.mauSac}>{orderStatus?.moTa}</Tag>
                  </Form.Item>
                  <Form.Item
                    name="nguoiNhan"
                    label="Người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống",
                      },
                    ]}
                  >
                    {(orderStatus?.ten === "APPROVED" ||
                      orderStatus?.ten === "PICKUP" ||
                      orderStatus?.ten === "SHIPPING" ||
                      orderStatus?.ten === "CANCELLED") &&
                    data?.loaiHoaDon?.ten === "COUNTER" ? (
                      <span>{data?.nguoiNhan || "Khách hàng lẻ"}</span>
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                  <Form.Item
                    name="sdtNguoiNhan"
                    label="Số điện thoại người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống",
                      },
                    ]}
                  >
                    {(orderStatus?.ten === "APPROVED" ||
                      orderStatus?.ten === "PICKUP" ||
                      orderStatus?.ten === "SHIPPING" ||
                      orderStatus?.ten === "CANCELLED") &&
                    data?.loaiHoaDon?.ten === "COUNTER" ? (
                      <span>{data?.sdtNguoiNhan || "Khách hàng lẻ"}</span>
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="diaChiNguoiNhan"
                    label="Địa chỉ người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống",
                      },
                    ]}
                  >
                    <Space direction="horizontal">
                      <div style={{ width: "190px" }}>
                        <span>{diaChiThongTin}</span>
                      </div>
                      {orderStatus?.ten !== "APPROVED" && (
                        <Button onClick={showDiaChiModal}>Tùy chỉnh</Button>
                      )}
                    </Space>
                  </Form.Item>
                  <Form.Item
                    name="emailNguoiNhan"
                    label="Email người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống",
                      },
                    ]}
                  >
                    {orderStatus?.ten === "APPROVED" ? (
                      <span>{data?.emailNguoiNhan}</span>
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                  <Form.Item name="ghiChu" label="Ghi chú">
                    {orderStatus?.ten === "APPROVED" ? (
                      <span>{data?.ghiChu}</span>
                    ) : (
                      <TextArea />
                    )}
                  </Form.Item>
                  <Form.Item
                    name="phiShip"
                    label="Phí ship"
                    // initialValue={tienShip}
                  >
                    {orderStatus?.ten === "APPROVED" ? (
                      <span>{formatGiaTienVND(data?.phiShip)}</span>
                    ) : (
                      <InputNumber
                        value={tienShip}
                        style={{ width: "100%" }}
                        step={10000}
                        formatter={(value) => `${formatGiaTienVND(value)}`}
                        parser={(value: any) => value.replace(/\D/g, "")}
                        onChange={handleTienShip}
                      />
                    )}
                  </Form.Item>
                  <Form.Item name="tongTien" label="Tổng tiền">
                    <div style={{ width: "190px" }}>
                      <span>{formatGiaTien(tongTien)}</span>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      {((orderStatus?.ten === "PENDING" &&
                        data?.loaiHoaDon?.ten === "COUNTER") ||
                        (orderStatus?.ten === "CONFIRMED" &&
                          data?.loaiHoaDon?.ten === "COUNTER") ||
                        (orderStatus?.ten === "PENDING" &&
                          data?.loaiHoaDon?.ten === "ONLINE")) && (
                        <Button
                          type="primary"
                          onClick={async () => {
                            await handleStatus(
                              form.getFieldsValue(),
                              confirmedStatus,
                              "Xác nhận"
                            );
                          }}
                        >
                          Xác nhận
                        </Button>
                      )}

                      {((orderStatus?.ten === "PENDING" &&
                        data?.loaiHoaDon?.ten === "COUNTER") ||
                        (orderStatus?.ten === "CONFIRMED" &&
                          data?.loaiHoaDon?.ten === "COUNTER") ||
                        (orderStatus?.ten === "PENDING" &&
                          data?.loaiHoaDon?.ten === "ONLINE")) && (
                        <Button
                          type="primary"
                          danger
                          onClick={async () => {
                            await handleStatus(
                              form.getFieldsValue(),
                              cancelledStatus,
                              "Hủy"
                            );
                          }}
                        >
                          Hủy
                        </Button>
                      )}
                      {orderStatus?.ten === "PICKUP" && (
                        <Button
                          type="primary"
                          onClick={async () => {
                            await handleStatus(
                              form.getFieldsValue(),
                              shipingStatus,
                              "Giao hàng"
                            );
                          }}
                        >
                          Giao hàng
                        </Button>
                      )}
                      {((orderStatus?.ten === "CONFIRMED" &&
                        data?.loaiHoaDon?.ten === "COUNTER") ||
                        (orderStatus?.ten === "SHIPPING" &&
                          data?.loaiHoaDon?.ten === "ONLINE")) && (
                        <Button
                          type="primary"
                          onClick={async () => {
                            await handleStatus(
                              form.getFieldsValue(),
                              approvedStatus,
                              "Hoàn thành"
                            );
                          }}
                        >
                          Hoàn thành
                        </Button>
                      )}
                      {/* {orderStatus?.ten === "CONFIRMED" && showExportButton && (
                        <Button type="primary" onClick={showExportHoaDonModal}>
                          Export PDF
                        </Button>
                      )} */}
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row>
                <Space direction="horizontal">
                  <h3 style={{ width: "200px" }}>Giao dịch thanh toán</h3>
                  <Button type="primary">Thành toán</Button>
                </Space>
              </Row>
              <Table<DataTypeGiaoDich>
                columns={columnsGiaoDich as ColumnsType<DataTypeGiaoDich>}
                dataSource={listGiaoDich}
                loading={loadingTable}
                showSorterTooltip={false}
              />
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
                  {((orderStatus?.ten === "PENDING" &&
                    data?.loaiHoaDon?.ten === "COUNTER") ||
                    (orderStatus?.ten === "CONFIRMED" &&
                      data?.loaiHoaDon?.ten === "COUNTER") ||
                    (orderStatus?.ten === "PENDING" &&
                      data?.loaiHoaDon?.ten === "ONLINE")) && (
                    <Button onClick={handleUpdateSoLuongSanPham}>
                      Cập nhật lại giỏ hàng
                    </Button>
                  )}
                  {((orderStatus?.ten === "PENDING" &&
                    data?.loaiHoaDon?.ten === "COUNTER") ||
                    (orderStatus?.ten === "CONFIRMED" &&
                      data?.loaiHoaDon?.ten === "COUNTER") ||
                    (orderStatus?.ten === "PENDING" &&
                      data?.loaiHoaDon?.ten === "ONLINE")) && (
                    <Button onClick={showSanPhamModal}>Thêm sản phẩm</Button>
                  )}
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
                dataSource={listHoaDonChiTiet}
                onChange={onChangeTable}
                loading={loadingTable}
                showSorterTooltip={false}
              />
            </Card>
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
        fee={Number(tienShip)}
      />
      <HoaDonChiTietComponent
        isModalVisible={sanPhamOpen}
        setIsModalVisible={setSanPhamOpen}
        idHoaDon={Number(id)}
        loadData={fetchHoaDonData}
      />
      <ExportHoaDonPDF
        open={hoaDonOpen}
        onCancel={handleCancelExportHoaDon}
        id={Number(id)}
      />
    </>
  );
};

export default detailHoaDon;
