import { Modal, Form, Select, Col, Row, Input, Space, Table } from "antd";
interface HoaDonChiTietProps {
  open: boolean;
  columnsHoaDonChiTiet: [];
  dataSourceHoaDonChiTiet: () => [];
  onUpdate: (values: any) => void;
  onCancel: () => void;
  onChangeTable: (pagination: any, filters: any, sorter: any) => void;
  totalElements: number;
}
const HoaDonChiTietComponent: React.FC<HoaDonChiTietProps> = ({
  columnsHoaDonChiTiet,
  dataSourceHoaDonChiTiet,
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Thêm sản phẩm"}
      open={open}
      onCancel={onCancel}
      //   onOk={() => {
      //     form
      //       .validateFields()
      //       .then((values) => {
      //         onUpdate(values);
      //       })
      //       .catch((info) => {
      //         console.log("Validate Failed:", info);
      //       });
      //   }}
    >
      <Table
        columns={columnsHoaDonChiTiet}
        dataSource={dataSourceHoaDonChiTiet()}
        pagination={false}
        showSorterTooltip={false}
        scroll={{ x: 2000, y: 0 }}
        bordered
      />
    </Modal>
  );
};

export default HoaDonChiTietComponent;
