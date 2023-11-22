import { FileExcelOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import request from "~/utils/request";

interface DataType {
  key: string;
  ten: string;
  soLuongTon: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên Sản phẩm",
    dataIndex: "ten",
    key: "ten",
    render: (_, record) => {
      return record.ten;
    },
  },
  {
    title: "Số lượng tồn",
    dataIndex: "soLuongTon",
    key: "soLuongTonge",
    render: (_, record) => {
      return record.soLuongTon;
    },
  },
];

const TableSoLuongTon: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const fetchData = async () => {
    try {
      const response = await request.get("thong-ke/so-luong-ton", {
        params: { page: page, pageSize: pageSize },
      });
      setData(response.data.content);
      setTotalPage(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <>
      <Row style={{ marginRight: 25 }}>
        <Col span={1}></Col>
        <Col span={22}>
          <Table
            title={() => (
              <>
                <span style={{ fontWeight: "bold" }}>
                  DANH SÁCH SẢN PHẨM TỒN
                </span>
                <Button
                  style={{ float: "right", backgroundColor: "green" }}
                  type="primary"
                >
                  <FileExcelOutlined /> Xuất File Excel
                </Button>
              </>
            )}
            pagination={{
              total: totalPage,
              onChange(page, pageSize) {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
            style={{ marginTop: 50 }}
            columns={columns}
            dataSource={data}
          />
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
};

export default TableSoLuongTon;
