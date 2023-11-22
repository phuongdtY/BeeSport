import * as React from "react";
import { useState, useEffect } from "react";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
  Typography,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
// lấy tạm data địa hình sân
import { DataParams, DataType } from "~/interfaces/diaHinhSan.type";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import request from "~/utils/request";
import { formatGiaTien } from "~/utils/formatResponse";
import HinhAnhSanPham from "./HinhAnhSanPham";
import ThanhToan from "../thanh-toan/ThanhToan";
const { Title, Text } = Typography;

const index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [noteUpdated, setNoteUpdated] = useState(false);

  const [data, setData] = useState<DataType[]>([]);
  const { confirm } = Modal;
  const confirmDelete = (id) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xóa sản phẩm này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => handleDeleteItem(id), // Pass the ID to the function
    });
  };
  const handleDeleteItem = async (id) => {
    try {
      setLoading(true);
      await request.delete(`gio-hang-chi-tiet/${id}`);
      setLoading(false);
      message.success("Xóa sản phẩm thành công");
      fetchData();
    } catch (error) {
      message.error("Xóa sản phẩm thất bại");
      setLoading(false);
    }
  };
  const gioHang = async () => {
    try {
      setLoading(true);
      const res = await request.get(`gio-hang/${id}`);
      setNote(res.data.ghiChu);
      setLoading(false);
    } catch (error) {
      message.error("Xóa sản phẩm thất bại");
      setLoading(false);
    }
  };

  const [updatedQuantities, setUpdatedQuantities] = useState([]);
  const handleIncrement = (record: DataType) => {
    const newData = [...data];
    const index = newData.indexOf(record);
    newData[index].soLuong += 1;
    setData(newData);

    // Add the item ID to updatedQuantities if not already in the array
    if (!updatedQuantities.includes(record.id)) {
      setUpdatedQuantities((prev) => [...prev, record.id]);
    }
  };

  const handleDecrement = (record: DataType) => {
    if (record.soLuong > 1) {
      const newData = [...data];
      const index = newData.indexOf(record);
      newData[index].soLuong -= 1;
      setData(newData);

      // Add the item ID to updatedQuantities if not already in the array
      if (!updatedQuantities.includes(record.id)) {
        setUpdatedQuantities((prev) => [...prev, record.id]);
      }
    }
  };

  const [params, setParams] = useState<DataParams>({
    page: 1,
    pageSize: 10,
  });
  const totalAmount = data.reduce((acc, item) => {
    const itemPrice = item.chiTietSanPham.giaTien; // Unit price
    const itemQuantity = item.soLuong; // Quantity
    const itemTotalPrice = itemPrice * itemQuantity; // Total price for the item
    return acc + itemTotalPrice;
  }, 0);

  const columns: ColumnsType<DataType> = [
    {
      title: "Thông tin sản phẩm",
      dataIndex: "chiTietSanPham",
      key: "ten",
      align: "left",
      render: (chiTietSanPham) => (
        <Space>
          <HinhAnhSanPham chiTietSanPham={chiTietSanPham} />
          <Space direction="vertical">
            <Text strong>{chiTietSanPham.sanPham.ten}</Text>
            <Text>{`[${chiTietSanPham.mauSac.ten} - ${chiTietSanPham.kichCo.kichCo} - ${chiTietSanPham.loaiDe.ten} - ${chiTietSanPham.diaHinhSan.ten}]`}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "chiTietSanPham",
      key: "giaTien",
      align: "center",
      render: (_, record) => (
        <Text type="danger" style={{ fontWeight: "bold" }}>
          {formatGiaTien(record.chiTietSanPham.giaTien)}
        </Text>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      render: (soLuong: number, record: DataType) => (
        <Space.Compact>
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleDecrement(record)}
          />
          <Input
            style={{ textAlign: "center", width: 40 }}
            value={soLuong.toString()}
            readOnly
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleIncrement(record)}
          />
        </Space.Compact>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "center",
      render: (text, record) => (
        <Text type="danger" style={{ fontWeight: "bold" }}>
          {formatGiaTien(record.chiTietSanPham.giaTien * record.soLuong)}
        </Text>
      ),
    },

    {
      dataIndex: "id",
      align: "center",
      width: "1px",
      render: (id) => (
        <Space>
          <Tooltip title="Xóa">
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => confirmDelete(id)}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const id = localStorage.getItem("gioHang");
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await request.get("/gio-hang-chi-tiet/detail-gio-hang/" + id);
      setData(res.data);
      console.log(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Lấy dữ liệu giỏ hàng thất bại");
    }
  };
  useEffect(() => {
    gioHang();
    fetchData();
  }, [params]);

  const onChangeTable = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | any
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
  const onUpdateCart = async () => {
    if (updatedQuantities.length === 0) {
      return;
    }
    const updatedData = data
      .filter((item) => updatedQuantities.includes(item.id))
      .map((item) => ({
        id: item.id,
        soLuong: item.soLuong,
      }));
    try {
      setLoading(true);
      await request.put("/gio-hang-chi-tiet/update/" + id, updatedData);
      fetchData();
      setLoading(false);
      message.success("Cập nhật giỏ hàng thành công");
    } catch (error) {
      message.error("Cập nhật giỏ hàng thất bại");
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        title={
          <Title level={4} style={{ fontWeight: "bold" }}>
            Giỏ hàng của bạn
          </Title>
        }
      >
        <Row>
          <Col span={15}>
            <Card>
              <Table
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                loading={loading}
                showSorterTooltip={false}
                pagination={false}
                footer={() => (
                  <Space>
                    <Link to="/">
                      <Button type="dashed">
                        <ArrowLeftOutlined />
                        TIẾP TỤC MUA SẮM
                      </Button>
                    </Link>
                    <Button onClick={onUpdateCart} type="primary">
                      CẬP NHẬT GIỎ HÀNG
                    </Button>
                  </Space>
                )}
              />
            </Card>
          </Col>
          <Col span={1}></Col>
          <Col span={8}>
            <ThanhToan tamTinh={totalAmount} dataSanPham={data} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default index;
