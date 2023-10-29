import { Modal, Form, Select, Col, Row, Input, Space, Table } from "antd";
interface HoaDonChiTietProps {
  open: boolean;
  columnsHoaDonChiTiet: [];
  dataSourceHoaDonChiTiet: [];
  onUpdate: (values: any) => void;
  onCancel: () => void;
  onChangeTable: (pagination: any, filters: any, sorter: any) => void;
  totalElements: number;
}
const HoaDonChiTietComponent: React.FC<HoaDonChiTietProps> = ({
  columnsHoaDonChiTiet,
  dataSourceHoaDonChiTiet,
  open,
  totalElements,
  onChangeTable,
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
        pagination={{
          pageSizeOptions: ["1", "5", "10"],
          showSizeChanger: true,
          total: totalElements,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        dataSource={dataSourceHoaDonChiTiet}
        onChange={onChangeTable}
        showSorterTooltip={false}
      />
    </Modal>
  );
};

export default HoaDonChiTietComponent;
