import * as React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
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
import { DataParams, DataType } from "~/interfaces/voucher.type";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import request from "~/utils/request";
import { formatGiaTienVND } from "~/utils/formatResponse";
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
      title: "STT",
      align: "center",
      rowScope: "row",
      width: "60px",
      render: (_, __, index) => (params.page - 1) * params.pageSize + index + 1,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
      sorter: true,
      ellipsis: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      sorter: true,
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      sorter: true,
      render: (soLuong) => {
        return soLuong === null ? "Không giới hạn" : soLuong;
      },
    },
    {
      title: "Ngày bắt đầu",
      align: "center",
      dataIndex: "ngayBatDau",
      key: "ngayBatDau",
      sorter: true,
      render: (ngayBatDau) => {
        return dayjs(ngayBatDau).format("DD/MM/YYYY HH:mm:ss"); // Định dạng ngày theo ý muốn của bạn
      },
    },
    {
      title: "Ngày kết thúc",
      align: "center",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      sorter: true,
      render: (ngayKetThuc) => {
        return dayjs(ngayKetThuc).format("DD/MM/YYYY HH:mm:ss"); // Định dạng ngày theo ý muốn của bạn
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "giaTriGiam",
      key: "giaTriGiam",
      align: "center",
      sorter: true,
      render: (giaTriGiam, object: any) => {
        if (object.hinhThucGiam.id === 2) {
          return formatGiaTienVND(giaTriGiam);
        } else if (object.hinhThucGiam.id === 1) {
          return giaTriGiam + "%";
        } else {
          return "";
        }
      },
    },
    // {
    //   title: "Đơn tối thiểu",
    //   dataIndex: "donToiThieu",
    //   key: "donToiThieu",
    //   sorter: true,
    //   render: (donToiThieu) => {
    //     return formatGiaTienVND(donToiThieu);
    //   },
    // },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      sorter: true,

      render: (trangThai) => (
        <Tag color={trangThai?.mauSac}>{trangThai?.moTa}</Tag>
      ),
    },
    {
      title: "Thao Tác",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Space>
          <Button type="link" style={{ padding: 0 }}>
            <Tooltip title="Chi tiết">
              <EyeOutlined style={{ color: "orange" }} />
            </Tooltip>
          </Button>
          <Tooltip title="Chỉnh sửa">
            <Link to={`/admin/voucher/update/${id}`}>
              <Button type="link" style={{ padding: 0 }}>
                <EditOutlined />
              </Button>
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getParams = (params: DataParams) => ({
    page: data.length !== 0 ? params.page : 1,
    pageSize: params.pageSize,
    searchText: params.searchText,
    trangThai: params.trangThai,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await request.get("voucher", {
          params: getParams(params),
        });
        console.log(res);
        setData(res.data.content);
        setTotalElements(res.data.totalElements);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        message.error("Lấy dữ liệu voucher thất bại");
      }
    };
    fetchData();
    data.map((ii) => console.log(ii));
  }, [params]);
  const handleSearch = (value: string) => {
    setParams({
      ...params,
      searchText: value,
    });
    console.log(value);
  };
  const onChangeStatus = (value: string) => {
    setParams({
      ...params,
      trangThai: value,
    });
    console.log(value);
  };
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
      <Card title="DANH SÁCH VOUCHER">
        <Row>
          <Col span={8}>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm kiếm theo Tên, Mã..."
              allowClear
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            />
          </Col>
          <Col span={8}></Col>
          <Col span={5}>
            <Form.Item label="Trạng thái" style={{ fontWeight: "bold" }}>
              <Select
                defaultValue=""
                style={{ width: 150 }}
                onChange={onChangeStatus}
                options={[
                  { value: "", label: "Tất cả" },
                  { value: "ACTIVE", label: "Đang hoạt động" },
                  { value: "EXPIRED", label: "Hết hạn" },
                  { value: "INACTIVE", label: "Ngừng hoạt động" },
                  { value: "UPCOMING", label: "Sắp diễn ra" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Link to="/admin/voucher/add">
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm voucher
              </Button>
            </Link>
          </Col>
        </Row>
        <Table
          columns={columns}
          pagination={{
            pageSizeOptions: ["1", "5", "10"],
            showSizeChanger: true,
            total: totalElements,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          dataSource={data.map((item, index) => ({
            ...item,
            key: index.toString(),
          }))}
          onChange={onChangeTable}
          loading={loading}
          showSorterTooltip={false}
        />
      </Card>
    </>
  );
};

export default index;
