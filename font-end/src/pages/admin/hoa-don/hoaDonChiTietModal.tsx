import { Modal, Form, Select, Col, Row, Input, Space, Table } from "antd";
interface HoaDonChiTietProps {
  open: boolean;
  columnsHoaDonChiTiet: [];
  onUpdate: (values: any) => void;
  onCancel: () => void;
}
const HoaDonChiTietComponent: React.FC<HoaDonChiTietProps> = ({
  columnsHoaDonChiTiet,
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
      <Table ></Table>
    </Modal>
  );
};

export default HoaDonChiTietComponent;
