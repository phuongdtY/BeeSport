import { Modal, Table, message } from "antd";
import { DataType as DataTypeCtsp } from "~/interfaces/ctsp.type";
import { ColumnsType } from "antd/es/table";
import request from "~/utils/request";
import { useEffect, useState } from "react";

interface HoaDonChiTietProps {
  open: boolean;
  onCancel: (value: boolean) => void;
}
const HoaDonChiTietComponent: React.FC<HoaDonChiTietProps> = ({
  open,
  onCancel,
}) => {
  const [dataSanPham, setDataSanPham] = useState([]);

  const columns: ColumnsType<DataTypeCtsp> = [
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
      dataIndex: "giaTien",
      key: "giaTien",
      align: "center",
      sorter: true,
      width: "5%",
    },
  ];
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

  // sử dụng useEffect
  useEffect(() => {
    if (open) {
      fetchDataChiTietSanPham();
    }
  }, [open]);

  const handleCancel = () => {
    onCancel(false);
  };
  return (
    <Modal width={1050} footer={null} title={"Thêm sản phẩm"} open={open} onCancel={handleCancel}>
      <Table
        pagination={false}
        showSorterTooltip={false}
        dataSource={dataSanPham}
        columns={columns}
        bordered
      />
    </Modal>
  );
};

export default HoaDonChiTietComponent;
