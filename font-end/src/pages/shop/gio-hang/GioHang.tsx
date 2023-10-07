import * as React from "react";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { DataParams, DataType } from "~/interfaces/diaHinhSan.type";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import request from "~/utils/request";

const index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [params, setParams] = useState<DataParams>({
    page: 1,
    pageSize: 10,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "Hình Ảnh",
      align: "center",
      rowScope: "row",
      width: "15%",
      render: (_, __, index) => (params.page - 1) * params.pageSize + index + 1,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "30%",
    },
    {
      title: "Đơn Giá",
      align: "center",
      rowScope: "row",
      width: "20%",
    },
    {
      title: "Số Lượng",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "10%",
    },
    {
      title: "Thành Tiền",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "20%",
    },
    {
      title: "Xóa",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      sorter: true,
      width: "5%",
      render: (id) => (
        <Space>
          <Button type="link" style={{ padding: 0 }}>
            
          </Button>
          <Tooltip title="Chỉnh sửa">
            <Link to={"#"}>
              <Button type="link" style={{ padding: 0 }}>
                <EditOutlined />
              </Button>
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await request.get("dia-hinh-san");
        setData(res.data.content);
        setTotalElements(res.data.totalElements);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        message.error("Lấy dữ liệu địa hình sân thất bại");
      }
    };
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
  return (
    <>
      <Card title="GIỎ HÀNG">
        <Row>
          <Col span={17}>
            <Card>
              <Table
                columns={columns}
                dataSource={data.map((item, index) => ({
                  ...item,
                  key: index.toString(),
                }))}
                onChange={onChangeTable}
                loading={loading}
                showSorterTooltip={false}
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
                    1.200.300
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
