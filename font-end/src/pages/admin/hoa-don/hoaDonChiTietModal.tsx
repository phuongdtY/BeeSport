import {
  Button,
  Col,
  ColorPicker,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { DataType as DataTypeCtsp } from "~/interfaces/ctsp.type";
import { ColumnsType } from "antd/es/table";
import request from "~/utils/request";
import { useEffect, useState } from "react";
import { formatGiaTien } from "~/utils/formatResponse";
import { ExclamationCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
interface HoaDonChiTietProps {
  open: boolean;
  onCancel: (value: boolean) => void;
  idHoaDon: number | undefined;
  setLoading: () => void;
}
const HoaDonChiTietComponent: React.FC<HoaDonChiTietProps> = ({
  open,
  onCancel,
  idHoaDon,
  setLoading,
}) => {
  const [dataSanPham, setDataSanPham] = useState<DataTypeCtsp[]>([]);
  const [loaiDeOptions, setLoaiDeOptions] = useState([]);
  const [mauSacOptions, setMauSacOptions] = useState([]);
  const [kichCoOptions, setKichCoOptions] = useState([]);
  const [diaHinhSanOptions, setDiaHinhSanOptions] = useState([]);
  const [thuongHieuOptions, setThuongHieuOptions] = useState([]);

  const [selectedLoaiDe, setSelectedLoaiDe] = useState<string | undefined>(
    undefined
  );
  const [selectedMauSac, setSelectedMauSac] = useState<string | undefined>(
    undefined
  );
  const [selectedKichCo, setSelectedKichCo] = useState<string | undefined>(
    undefined
  );
  const [selectedDiaHinhSan, setSelectedDiaHinhSan] = useState<
    string | undefined
  >(undefined);
  const [selectedThuongHieu, setSelectedThuongHieu] = useState<
    string | undefined
  >(undefined);

  const columns: ColumnsType<DataTypeCtsp> = [
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
      dataIndex: "chiTietSanPhamItem",
      key: "chiTietSanPhamItem",
      align: "center",
      sorter: true,
      width: "40%",
      render: (chiTietSanPhamItem) => (
        <span>
          <div
            dangerouslySetInnerHTML={{
              __html: `${chiTietSanPhamItem.sanPham.ten}<br /> [${chiTietSanPhamItem.mauSac.ten}-${chiTietSanPhamItem.kichCo.kichCo}-${chiTietSanPhamItem.loaiDe.ten}-${chiTietSanPhamItem.diaHinhSan.ten}]`,
            }}
          />
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      sorter: true,
      width: "5%",
    },
    {
      title: "Giá tiền",
      dataIndex: "donGiaFromat",
      key: "giaTien",
      align: "center",
      sorter: true,
      width: "5%",
    },
    {
      title: "Thao tác",
      dataIndex: "chiTietSanPhamItem",
      key: "chiTietSanPhamItem",
      align: "center",
      sorter: true,
      width: "5%",
      render: (chiTietSanPhamItem) => (
        <Space>
          <Tooltip title="Thêm">
            <Button type="link" style={{ padding: 0 }}>
              <PlusCircleOutlined
                onClick={() => handleClickCreate(chiTietSanPhamItem)}
                style={{ color: "green" }}
              />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  interface OptionSelect {
    id: number;
    ma: string;
    ten: string;
    kichCo: number;
  }
  // lấy API của sản phẩm
  const fetchDataChiTietSanPham = async () => {
    try {
      const res = await request.get("chi-tiet-san-pham/list");
      setDataSanPham(res.data);
      console.log(dataSanPham);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu sản phẩm thất bại");
    }
  };
  // lấy API của loại đế
  const fetchDataLoaiDe = async () => {
    try {
      const res = await request.get("loai-de/list");
      setLoaiDeOptions(res.data);
      console.log(dataSanPham);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu loại đế thất bại");
    }
  };
  // lấy API của màu sắc
  const fetchDataMauSac = async () => {
    try {
      const res = await request.get("mau-sac/list");
      setMauSacOptions(res.data);
      console.log(dataSanPham);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu màu sắc thất bại");
    }
  };
  // lấy API của địa hình sân
  const fetchDataDiaHinhSan = async () => {
    try {
      const res = await request.get("dia-hinh-san/list");
      setDiaHinhSanOptions(res.data);
      console.log(dataSanPham);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu địa hình sân thất bại");
    }
  };
  // lấy API của kích cỡ
  const fetchDataKichCo = async () => {
    try {
      const res = await request.get("kich-co/list");
      setKichCoOptions(res.data);
      console.log(dataSanPham);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu kích cỡ thất bại");
    }
  };
  // lấy API của thương hiệu
  const fetchDataThuongHieu = async () => {
    try {
      const res = await request.get("thuong-hieu/list");
      setThuongHieuOptions(res.data);
      console.log(dataSanPham);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu thương hiệu thất bại");
    }
  };

  // dataSourceTable
  const dataSourceDanhSachSanPham = () => {
    return dataSanPham?.map((item) => ({
      ...item,
      chiTietSanPhamItem: item,
      donGiaFromat: formatGiaTien(item.giaTien),
      idCtsp: item.id,
    }));
  };

  const createRequest = async (ctsp: DataTypeCtsp) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc thêm sản phẩm này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await request.post("hoa-don/add-san-pham/" + idHoaDon, {
            soLuong: 1,
            donGia: ctsp.giaTien,
            trangThaiHoaDonChiTiet: "APPROVED",
            chiTietSanPham: {
              id: ctsp.id,
            },
          });
          if (res.data) {
            setLoading();
            message.success("Thêm sản phẩm thành công");
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

  // sử dụng useEffect
  useEffect(() => {
    if (open) {
      fetchDataChiTietSanPham();
      fetchDataLoaiDe();
      fetchDataKichCo();
      fetchDataDiaHinhSan();
      fetchDataMauSac();
      fetchDataThuongHieu();
    }
  }, [open]);

  const handleClickCreate = (ctsp: DataTypeCtsp) => {
    createRequest(ctsp);
  };

  const handleCancel = () => {
    onCancel(false);
  };
  return (
    <Modal
      width={1050}
      footer={null}
      title={"Thêm sản phẩm"}
      open={open}
      onCancel={handleCancel}
    >
      <Row style={{ marginBottom: 50, marginLeft: 50 }}>
        {/* select loại đế */}
        <Col span={4} style={{ marginRight: 15 }}>
          <span>Loại đế:</span>
          <Select
            value={selectedLoaiDe}
            placeholder="Chọn Loại đế"
            style={{ width: "100%" }}
            onChange={(value: string) => setSelectedLoaiDe(value)}
          >
            {loaiDeOptions.map((option: OptionSelect) => (
              <Select.Option key={option.id} value={option.id}>
                {option.ten}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* select màu sắc */}
        <Col span={4} style={{ marginRight: 15 }}>
          <span>Màu sắc:</span>
          <Select
            value={selectedMauSac}
            placeholder="Chọn màu sắc"
            style={{ width: "100%" }}
            onChange={(value: string) => setSelectedMauSac(value)}
          >
            {mauSacOptions.map((option: OptionSelect) => (
              <Select.Option key={option.id} value={option.id}>
                <ColorPicker
                  value={option.ma}
                  size="small"
                  disabled
                  style={{ margin: 5 }}
                />
                {option.ten}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* select kích cỡ */}
        <Col span={4} style={{ marginRight: 15 }}>
          <span>Kích cỡ:</span>
          <Select
            value={selectedKichCo}
            placeholder="Chọn kích cỡ"
            style={{ width: "100%" }}
            onChange={(value: string) => setSelectedKichCo(value)}
          >
            {kichCoOptions.map((option: OptionSelect) => (
              <Select.Option key={option.id} value={option.id}>
                {option.kichCo}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* select địa hình sân */}
        <Col span={4} style={{ marginRight: 15 }}>
          <span>Địa hình sân:</span>
          <Select
            value={selectedDiaHinhSan}
            placeholder="Chọn địa hình sân"
            style={{ width: "100%" }}
            onChange={(value: string) => setSelectedDiaHinhSan(value)}
          >
            {diaHinhSanOptions.map((option: OptionSelect) => (
              <Select.Option key={option.id} value={option.id}>
                {option.ten}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* select thương hiệu */}
        <Col span={4} style={{ marginRight: 15 }}>
          <span>Thương hiệun:</span>
          <Select
            value={selectedThuongHieu}
            placeholder="Chọn thương hiệu"
            style={{ width: "100%" }}
            onChange={(value: string) => setSelectedThuongHieu(value)}
          >
            {thuongHieuOptions.map((option: OptionSelect) => (
              <Select.Option key={option.id} value={option.id}>
                {option.ten}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Table
        pagination={false}
        showSorterTooltip={false}
        dataSource={dataSourceDanhSachSanPham()}
        columns={columns}
        bordered
      />
    </Modal>
  );
};

export default HoaDonChiTietComponent;
