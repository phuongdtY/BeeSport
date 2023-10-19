import React, { useState, useEffect } from "react";
import request from "~/utils/request";
import { fetchData } from "~/api/apivoucher";
import {
  Space,
  Card,
  Tag,
  Form,
  Input,
  Button,
  Dropdown,
  Select,
  Modal,
  Col,
  Row,
  Table,
  Divider,
} from "antd";
import type { MenuProps } from "antd";
import { GrMoreVertical } from "react-icons/gr";
import { Link } from "react-router-dom";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import {
  UserAddOutlined,
  EditOutlined,
  // DeleteOutlined,
  SearchOutlined,
  ReadOutlined,
//   ManOutlined,
//   WomanOutlined,
//   UserOutlined,
} from "@ant-design/icons";
import { formatNgayTao } from "~/utils/formatResponse";
import {
  DataType,
  TableParams,
  DescriptionItemProps,
} from "~/interfaces/voucher.type";

const DescriptionItem: React.FC<DescriptionItemProps> = ({
  title,
  content,
  children,
}) => (
  <Space>
    <p style={{ fontWeight: "bold" }}>{title}:</p>
    <p>{content}</p>
    <p>{children}</p>
  </Space>
);

const index: React.FC = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [contentModal, setContentModal] = useState<DataType>();
  const [data, setData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getParams = (params: TableParams) => ({
    currentPage: data.length !== 0 ? params.pagination?.current : 1,
    pageSize: params.pagination?.pageSize,
    searchText: params.searchText,
    trangThai: params.trangThai,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      key: "stt",
      fixed: "left",
      align: "center",
      rowScope: "row",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      fixed: "left",
      key: "ma",
      sorter: true,
      ellipsis: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      fixed: "left",
      key: "ten",
      sorter: true,
      ellipsis: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày bắt đầu",
      align: "center",
      dataIndex: "ngayBatDau",
      key: "ngayBatDau",
      sorter: true,
    },
    {
      title: "Ngày kết thúc",
      align: "center",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      sorter: true,
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      sorter: true,
      render: (trangThai) =>
        <div>
          {trangThai.ten == "ACTIVE" ? (
            <Tag color="success">Đang hoạt động</Tag>
          ) : trangThai.ten == "EXPIRED" ? (
            <Tag color="warning">Hết hạn</Tag>
          ) : trangThai.ten == "INACTIVE" ? (
            <Tag color="error">Không hoạt động</Tag>
          ) : trangThai.ten == "UPCOMING" ? (
            <Tag color="info">Sắp diễn ra</Tag>
          ) : (
            <Tag color="default">Trạng thái không xác định</Tag>
          )}
        </div>    
    },
    {
      title: "Thao Tác",
      dataIndex: "id",
      fixed: "right",
      align: "center",
      key: "id",
      width: 90,
      render: (id) => {
        const showModal = () => {
          setModal1Open(true);
          request
            .get("voucher/" + id)
            .then((res) => setContentModal(res.data))
            .catch((err) => console.log(err));
        };

        const actionItems: MenuProps["items"] = [
          {
            icon: <ReadOutlined />,
            label: (
              <Button
                type="link"
                onClick={showModal}
                style={{ color: "#000000", padding: 0 }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ flex: "1" }}>Xem chi tiết</span>
                </span>
              </Button>
            ),
            key: "0",
          },
          {
            icon: <EditOutlined />,
            label: <Link to={`/admin/voucher/edit/${id}`}>Chỉnh sửa</Link>,
            key: "1",
          },
          {
            type: "divider",
          },
        ];

        return (
          <Dropdown menu={{ items: actionItems }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button
                  type="text"
                  icon={
                    <GrMoreVertical
                      style={{ fontSize: "20", color: "#bfbfbf" }}
                    />
                  }
                />
              </Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchDataAndLoadData = async () => {
      setLoading(true);
      const fetchedData = await fetchData(getParams(tableParams));
      setData(fetchedData.content);
      setCurrentPage(fetchedData.pageable.pageNumber + 1);
      setPageSize(fetchedData.pageable.pageSize);
      setLoading(false);
      const updatedTableParams = {
        ...tableParams,
        pagination: {
          showSizeChanger: true,
          ...tableParams.pagination,
          total: fetchedData.totalElements,
          showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} items`,
        },
      };

      // Kiểm tra xem tableParams thực sự đã thay đổi
      if (JSON.stringify(updatedTableParams) !== JSON.stringify(tableParams)) {
        setTableParams(updatedTableParams);
      }
      console.log(fetchedData.content);
    };

    fetchDataAndLoadData();
  }, [tableParams]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>, // Đổi kiểu dữ liệu của filters
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    const sortField = Array.isArray(sorter)
      ? (sorter[0].field || "").toString()
      : (sorter.field || "").toString();
    const sortOrder = Array.isArray(sorter)
      ? (sorter[0].order || "").toString()
      : (sorter.order || "").toString();

    // Loại bỏ các giá trị null khỏi filters
    const cleanedFilters: Record<string, FilterValue> = {};
    for (const key in filters) {
      if (filters[key] !== null) {
        cleanedFilters[key] = filters[key] as FilterValue;
      }
    }

    setTableParams({
      ...tableParams,
      pagination,
      sortField,
      sortOrder,
      filters: cleanedFilters, // Sử dụng cleanedFilters thay vì filters ban đầu
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleSearch = (searchValue: string) => {
    setTableParams({
      ...tableParams,
      searchText: searchValue,
    });
  };
  const onChangeStatus = (value: string) => {
    setTableParams({
      ...tableParams,
      trangThai: value,
    });
  };
  return (
    <>
      <Card title="DANH SÁCH VOUCHER" bordered={true}>
        <Modal
          title="Chi Tiết Voucher"
          style={{ top: 20 }}
          open={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
          okText=" "
          okType="link"
          cancelText="Đóng"
        >
          <Divider />
          <DescriptionItem title="Mã" content={contentModal?.ma} />
          <Divider style={{ margin: 0 }} />
          <Divider />
          <DescriptionItem title="Tên" content={contentModal?.ten} />
          <Divider style={{ margin: 0 }} />
          <Divider />
          <DescriptionItem title="Ngày bắt đầu" content={contentModal?.ngayBatDau} />
          <Divider style={{ margin: 0 }} />
          <Divider />
          <DescriptionItem title="Ngày kết thúc" content={contentModal?.ngayKetThuc} />
          <Divider style={{ margin: 0 }} />
          <DescriptionItem title="Ngày tạo" content={contentModal?.ngayTao} />
          <Divider style={{ margin: 0 }} />
          {/* <DescriptionItem title="Trạng thái" />
            {(() => {
              if (trangThai == 'ACTIVE') {
                return <Tag color="success">Kích hoạt</Tag>;
              } else if (trangThai == 'EXPIRED') {
                return <Tag color="warning">Trạng thái 2</Tag>;
              } else if (trangThai == 'INACTIVE') {
                return <Tag color="info">Trạng thái 3</Tag>;
              } else if (trangThai == 'UPCOMING') {
                return <Tag color="error">Ngừng kích hoạt</Tag>;
              } else {
                return <Tag color="default">Unknown</Tag>; // Trạng thái mặc định nếu không khớp với bất kỳ trường hợp nào
              }
            })()}
          </DescriptionItem> */}
        </Modal>
        <Row>
          <Col span={8}>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm kiếm theo Tên, Mã"
              allowClear
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            />
          </Col>
          <Col span={4}></Col>
          <Col span={9}>
            <Space>
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
            </Space>
          </Col>
          <Col span={3}>
            <Link to="/admin/voucher/add">
              <Button type="primary" icon={<UserAddOutlined />}>
                Thêm voucher
              </Button>
            </Link>
          </Col>
        </Row>
        <Table
          pagination={tableParams.pagination}
          columns={columns}
          dataSource={data.map((item, index) => ({
            ...item,
            key: index.toString(),
          }))}
          loading={loading}
          onChange={handleTableChange}
          showSorterTooltip={false}
          scroll={{ y: 365 }}
        />
      </Card>
    </>
  );
};

export default index;
