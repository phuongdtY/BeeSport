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
const { Title, Text } = Typography;

const index: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const [quantity, setQuantity] = useState<number[]>([]);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "SẢN PHẨM",
      dataIndex: "chiTietSanPham", // dataIndex sẽ trỏ đến thuộc tính chứa tên sản phẩm
      key: "ten",
      align: "left",
      width: "30%",
      render: (chiTietSanPham) => (
        <Space>
          <Image
            width={80}
            height={80}
            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRUKrIF74VaGT5GEgMYDiNh7EUJOWo6VmDC_pxi2pEj7z87m93yRc3TqDCxxhucROPdWoRZC-8j_c59XQVGh1KmixzEgoII97htTdCeJqWKUufGwsDVQV6AWg&usqp=CAE"
            fallback="data:image/png;base64,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"
          />{" "}
          <span>{chiTietSanPham.sanPham.ten}</span>
        </Space>
      ),
    },
    {
      title: "ĐƠN GIÁ",
      dataIndex: "chiTietSanPham",
      key: "giaTien",
      align: "center",
      render: (chiTietSanPham) => (
        <span style={{ color: "red", fontWeight: "bolder" }}>
          {formatGiaTien(chiTietSanPham.giaTien)}
        </span>
      ),
    },
    {
      title: "SỐ LƯỢNG",
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
      title: "THÀNH TIỀN",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "center",
      render: (text, record) => (
        <span style={{ color: "red", fontWeight: "bold" }}>
          {formatGiaTien(record.chiTietSanPham.giaTien * record.soLuong)}
        </span>
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Lấy dữ liệu giỏ hàng thất bại");
    }
  };
  useEffect(() => {
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
    console.log(updatedData);

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
            GIỎ HÀNG
          </Title>
        }
      >
        <Row>
          <Col span={17}>
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
          {/* tổng tiền */}
          <Col span={6}>
            <Card title="TỔNG ĐƠN HÀNG">
              <Row>
                <Col span={18}>
                  <span style={{ fontWeight: "bold" }}>TỔNG TIỀN</span>
                </Col>
                <Col span={6}>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {formatGiaTien(totalAmount)}
                  </span>
                </Col>
              </Row>
            </Card>
            <Link to={"/thanh-toan"}>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  height: "50px",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                Thanh toán
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default index;
