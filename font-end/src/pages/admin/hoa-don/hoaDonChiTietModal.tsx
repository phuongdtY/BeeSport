import { Modal, Form, Table } from "antd";
import { DataType as DataTypeCtsp } from "~/interfaces/ctsp.type";
import { ColumnsType } from "antd/es/table";

type ColumnsTypeHoaDonChiTiet = ColumnsType<DataTypeCtsp>; 

interface HoaDonChiTietProps {
  open: boolean;
  columnsHoaDonChiTiet: ColumnsTypeHoaDonChiTiet;
  dataSourceDanhSachChiTietSanPham: () => DataTypeCtsp[];
  onCancel: () => void;
}
const HoaDonChiTietComponent: React.FC<HoaDonChiTietProps> = ({
  columnsHoaDonChiTiet,
  dataSourceDanhSachChiTietSanPham,
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Thêm sản phẩm"}
      open={open}
      onCancel={onCancel}
    >
      <Table
        columns={columnsHoaDonChiTiet}
        dataSource={dataSourceDanhSachChiTietSanPham()}
        pagination={false}
        showSorterTooltip={false}
        scroll={{ x: 2000, y: 0 }}
        bordered
      />
    </Modal>
  );
};

export default HoaDonChiTietComponent;
