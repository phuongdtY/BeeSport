import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import request from "~/utils/request";
import ModalSanPham from "./ModalSanPham";

interface DataGioHang {
  key: React.Key;
  ten: string;
}

const tableGioHang: ColumnsType<DataGioHang> = [
  {
    title: "#",
    dataIndex: "rowIndex",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "ten",
  },
];

const TableSanPham: React.FC = () => {
  const [dataGioHang, setDataGioHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getDataGioHang = async () => {
    try {
      const response = await request.get("loai-de");
      setDataGioHang(response.data.content);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getDataGioHang(); // Gọi API khi component được tạo
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Table
        title={() => (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Giỏ hàng</div>
            <Button
              type="primary"
              style={{ float: "right", marginBottom: 15 }}
              onClick={showModal}
            >
              Thêm Sản phẩm
            </Button>
            <ModalSanPham
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          </>
        )}
        columns={tableGioHang}
        dataSource={dataGioHang}
      />
    </>
  );
};

export default TableSanPham;
