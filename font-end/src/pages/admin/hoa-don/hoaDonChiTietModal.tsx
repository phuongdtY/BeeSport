import { Modal, Form, Select, Col, Row, Input, Space } from "antd";


interface DiaChiProps {
  open: boolean;
  fee: number;
  onUpdate: (values: any) => void;
  onCancel: () => void;

  onProvinceChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}
// const onChange = (value: string) => {
//   console.log(`selected ${value}`);
// };
// const onSearch = (value: string) => {
//   console.log("search:", value);
// };
// const filterOption = (
//   input: string,
//   option?: { label: string; value: string }
// ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const DiaChiComponent: React.FC<DiaChiProps> = ({
  open,
  onUpdate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Thêm sản phẩm"}
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onUpdate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      
    </Modal>
  );
};

export default DiaChiComponent;
