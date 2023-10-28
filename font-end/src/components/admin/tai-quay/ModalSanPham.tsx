import { Modal, Table } from "antd";
import React, { useState, useEffect } from "react";
import request from "~/utils/request";

interface ModalSanPhamProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

const ModalSanPham: React.FC<ModalSanPhamProps> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  const [dataSanPham, setDataSanPham] = useState([]);

  const columns = [
    {
      title: "Mã",
      dataIndex: "sanPham",
      key: "ma",
      render: (item) => {
        return item.ma;
      },
    },
    {
      title: "Tên",
      dataIndex: "sanPham",
      key: "ten",
      render: (item) => {
        return item.ten;
      },
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      request.get("chi-tiet-san-pham/list").then((response) => {
        setDataSanPham(response.data);
        console.log(response.data);
      });
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal
        title="Thêm Sản phẩm"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Table dataSource={dataSanPham} columns={columns} />
      </Modal>
    </>
  );
};

export default ModalSanPham;
