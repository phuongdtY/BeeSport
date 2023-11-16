import { Modal, Form, Select, Col, Row, Input } from "antd";

interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

interface DiaChiProps {
  open: boolean;
  fee: number;
  onUpdate: (values: any) => void;
  onCancel: () => void;

  provinces: Option[];
  districts: Option[];
  wards: Option[];

  onProvinceChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}
const DiaChiComponent: React.FC<DiaChiProps> = ({
  open,
  fee,
  onUpdate,
  onCancel,
  provinces,
  districts,
  wards,
  onProvinceChange,
  onDistrictChange,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Tùy chỉnh đỉa chỉ"}
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Row>
          <Col span={7} style={{ marginRight: "15px" }}>
            <span style={{ fontWeight: "bold" }}>Tỉnh/ Thành Phố:</span>
            <Form.Item name="thanhPho" rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Tỉnh / Thành ",
                },
              ]}>
              <Select
                options={provinces}
                placeholder="Tỉnh/ Thành Phố"
                onChange={onProvinceChange}
                style={{ width: "150px" }}
              />
            </Form.Item>
          </Col>
          <Col span={7} style={{ marginRight: "15px" }}>
            <span style={{ fontWeight: "bold" }}>Quận / Huyện:</span>
            <Form.Item name="quanHuyen" rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Quận / Huyện",
                },
              ]}>
              <Select
                options={districts}
                placeholder="Quận / Huyện"
                onChange={onDistrictChange}
                style={{ width: "150px" }}
              />
            </Form.Item>
          </Col>
          <Col span={7} style={{ width: "100px" }}>
            <span style={{ fontWeight: "bold" }}>Phường / Xã:</span>
            <Form.Item name="phuongXa" rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Phường / Xã",
                },
              ]}>
              <Select
                options={wards}
                placeholder="Phường / Xã"
                style={{ width: "150px" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="diaChiCuThe"
          label="Địa chỉ cụ thể:"
          style={{ fontWeight: "bold" }}
        >
          <Input />
        </Form.Item>
        <span> Phí Ship: {fee}</span>
      </Form>
    </Modal>
  );
};

export default DiaChiComponent;
