import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import * as React from "react";
import { useState, useEffect } from "react";
import { DataType } from "~/interfaces/thuongHieu.type";
import request from "~/utils/request";

const AddSanPham: React.FC = () => {
  const [openThuongHieu, setOpenThuongHieu] = useState(false);
  const [openMauSac, setOpenMauSac] = useState(false);
  const [form] = Form.useForm();
  const [dataTH, setDataTH] = useState<DataType[]>([]);
  const [dataLD, setDataLD] = useState<DataType[]>([]);
  const [selectedTH, setSelectedTH] = useState<string | undefined>(undefined);
  // api gọi thương hiệu
  const fetchDataTH = async () => {
    try {
      const res = await request.get("thuong-hieu");
      setDataTH(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataLD = async () => {
    try {
      const res = await request.get("loai-de");
      setDataLD(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTH();
    fetchDataLD();
    console.log(selectedTH);
    form.setFieldsValue({
      thuongHieu: selectedTH,
    });
  }, [selectedTH]);

  const onCreate = async (values: any) => {
    try {
      const res = await request.post("loai-de", values);
      fetchDataTH();
      setSelectedTH(res.data.id);
      message.success("Thêm loại đế thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm loại đế thất bại");
    }
    setOpenThuongHieu(false);
  };
  return (
    <>
      <Card title="THÊM SẢN PHẨM">
        <Row>
          <Col span={4}></Col>
          <Col span={14}>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
              <Form.Item
                name="ten"
                label="Tên sản phẩm"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Vui lòng nhập tên sản phẩm!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="moTa" label="Mô tả">
                <TextArea />
              </Form.Item>

              <Space.Compact block>
                <Form.Item
                  style={{ width: "100%" }}
                  name="thuongHieu"
                  label="Thương hiệu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn thương hiệu!",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Chọn thương hiệu"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={dataTH.map((values: DataType) => ({
                      label: values.ten,
                      value: values.id,
                    }))}
                  />
                </Form.Item>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setOpenThuongHieu(true);
                  }}
                />
              </Space.Compact>

              <Space.Compact block>
                <Form.Item
                  style={{ width: "100%" }}
                  name="loaiDe"
                  label="Loại đế"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại đế!",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Chọn loại đế"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={dataLD.map((values: DataType) => ({
                      label: values.ten,
                      value: values.id,
                    }))}
                  />
                </Form.Item>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setOpenThuongHieu(true);
                  }}
                />
              </Space.Compact>
              <Space.Compact block>
                <Form.Item
                  style={{ width: "100%" }}
                  name="diaHinhSan"
                  label="Địa hình sân"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn địa hình sân!",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Chọn địa hình sân"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={dataLD.map((values: DataType) => ({
                      label: values.ten,
                      value: values.id,
                    }))}
                  />
                </Form.Item>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setOpenThuongHieu(true);
                  }}
                />
              </Space.Compact>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Xong
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={4}></Col>
        </Row>
        <ModalThuongHieu
          open={openThuongHieu}
          onCreate={onCreate}
          onCancel={() => {
            setOpenThuongHieu(false);
          }}
        />
      </Card>
      <Card title="Chi tiết sản phẩm">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          name="dynamic_form_complex"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{ items: [{}] }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Item ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item name={[field.name, "name"]}>
                      <Table
                        // components={components}
                        rowClassName={() => "editable-row"}
                        bordered
                        // dataSource={dataSource}
                        // columns={columns as ColumnTypes}
                      />
                    </Form.Item>
                  </Card>
                ))}

                <Button type="dashed" onClick={() => setOpenMauSac(true)} block>
                  + Thêm màu sắc
                </Button>
                <ModalMauSac
                  open={openMauSac}
                  onCreate={onCreate}
                  onCancel={() => {
                    setOpenMauSac(false);
                  }}
                />
              </div>
            )}
          </Form.List>
        </Form>
      </Card>
    </>
  );
};
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: string) => void;
  onCancel: () => void;
}
const ModalThuongHieu: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Thêm thương hiệu"
      okText="Thêm"
      cancelText="Thoát"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        title="Thêm thương hiệu"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="ten"
          label="Tên thương hiệu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thương hiệu!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const ModalMauSac: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [dataMauSac, setDataMauSac] = useState<any[]>([]);
  const fetchDataMS = async () => {
    try {
      const res = await request.get("mau-sac");
      setDataMauSac(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (open) {
      fetchDataMS();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      title="Chọn màu sắc"
      okText="Thêm"
      cancelText="Thoát"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item name="mauSac" label="Màu sắc">
          <Radio.Group buttonStyle="solid">
            <Row gutter={[15, 15]}>
              {dataMauSac.map((color) => (
                <Col key={color.id}>
                  <Radio.Button value={color.id}>
                    <Space>
                      <ColorPicker
                        value={color.ma}
                        size="small"
                        disabled
                        style={{ marginTop: 3 }}
                      />
                      <span>{color.ten}</span>
                    </Space>
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="ten"
          label="Giá tiền"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá sản phẩm!",
            },
          ]}
        >
          <InputNumber<string>
            style={{ width: 200 }}
            defaultValue="1"
            stringMode
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddSanPham;
