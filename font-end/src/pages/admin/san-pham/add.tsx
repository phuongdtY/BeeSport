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
import { useState, useEffect, useMemo } from "react";
import { DataType as DataTypeTH } from "~/interfaces/thuongHieu.type";
import { DataType as DataTypeLD } from "~/interfaces/loaiDe.type";
import { DataType as DataTypeKC } from "~/interfaces/kichCo.type";
import { DataType as DataTypeDHS } from "~/interfaces/diaHinhSan.type";
import { DataType as DataTypeMS } from "~/interfaces/mauSac.type";
import request from "~/utils/request";
import { Color } from "antd/es/color-picker";

const AddSanPham: React.FC = () => {
  const [openThuongHieu, setOpenThuongHieu] = useState(false);
  const [openLoaiDe, setOpenLoaiDe] = useState(false);
  const [openKichCo, setOpenKichCo] = useState(false);
  const [openMauSac, setOpenMauSac] = useState(false);
  const [openDiaHinhSan, setOpenDiaHinhSan] = useState(false);
  const [form] = Form.useForm();
  const [dataTH, setDataTH] = useState<DataTypeTH[]>([]);
  const [dataLD, setDataLD] = useState<DataTypeLD[]>([]);
  const [dataKC, setDataKC] = useState<DataTypeKC[]>([]);
  const [dataDHS, setDataDHS] = useState<DataTypeDHS[]>([]);
  const [dataMS, setDataMS] = useState<DataTypeMS[]>([]);
  const [selectedTH, setSelectedTH] = useState<string | undefined>(undefined);
  const [selectedLD, setSelectedLD] = useState<string | undefined>(undefined);
  const [selectedKC, setSelectedKC] = useState<string | undefined>(undefined);
  const [selectedDHS, setSelectedDHS] = useState<string | undefined>(undefined);
  const [selectedMS, setSelectedMS] = useState<string | undefined>(undefined);

  // api gọi thương hiệu
  const fetchDataTH = async () => {
    try {
      const res = await request.get("thuong-hieu");
      setDataTH(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  // api gọi loại đế
  const fetchDataLD = async () => {
    try {
      const res = await request.get("loai-de");
      setDataLD(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // api gọi kích cỡ
  const fetchDataKC = async () => {
    try {
      const res = await request.get("kich-co");
      setDataKC(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // api gọi địa hình sân
  const fetchDataDHS = async () => {
    try {
      const res = await request.get("dia-hinh-san");
      setDataDHS(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // api gọi màu sắc
  const fetchDataMS = async () => {
    try {
      const res = await request.get("mau-sac");
      setDataMS(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTH();
    form.setFieldsValue({
      thuongHieu: selectedTH,
    });
  }, [selectedTH]);

  useEffect(() => {
    fetchDataLD();
    form.setFieldsValue({
      loaiDe: selectedLD,
    });
  }, [selectedLD]);

  useEffect(() => {
    fetchDataDHS();
    form.setFieldsValue({
      diaHinhSan: selectedDHS,
    });
  }, [selectedDHS]);

  useEffect(() => {
    fetchDataKC();
    form.setFieldsValue({
      kichCo: selectedKC,
    });
  }, [selectedKC]);

  useEffect(() => {
    fetchDataMS();
    form.setFieldsValue({
      mauSac: selectedMS,
    });
  }, [selectedMS]);

  const onCreateTH = async (values: any) => {
    try {
      const res = await request.post("thuong-hieu", values);
      fetchDataTH();
      setSelectedTH(res.data.id);
      message.success("Thêm thương hiệu thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm thương hiệu thất bại");
    }
    setOpenThuongHieu(false);
  };

  const onCreateLD = async (values: any) => {
    try {
      const res = await request.post("loai-de", values);
      fetchDataLD();
      setSelectedLD(res.data.id);
      message.success("Thêm loại đế thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm loại đế thất bại");
    }
    setOpenLoaiDe(false);
  };

  const onCreateKC = async (values: any) => {
    try {
      const res = await request.post("kich-co", values);
      fetchDataKC();
      setSelectedKC(res.data.kichCo);
      message.success("Thêm kích cỡ thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm kích cỡ thất bại");
    }
    setOpenKichCo(false);
  };

  const onCreateDHS = async (values: any) => {
    try {
      const res = await request.post("dia-hinh-san", values);
      fetchDataDHS();
      setSelectedDHS(res.data.id);
      message.success("Thêm địa hình sân thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm địa hình sân thất bại");
    }
    setOpenDiaHinhSan(false);
  };

  const onCreateMS = async (values: any) => {
    try {
      const res = await request.post("mau-sac", values);
      fetchDataMS();
      setSelectedMS(res.data.id);
      message.success("Thêm màu sắc thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm màu sắc thất bại");
    }
    setOpenMauSac(false);
  };

  return (
    <>
      {/* Sản phẩm */}
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
              {/* Thương hiệu combobox */}
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
                    options={dataTH.map((values: DataTypeTH) => ({
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
          onCreate={onCreateTH}
          onCancel={() => {
            setOpenThuongHieu(false);
          }}
        />
      </Card>
      {/* chi tiết sản phẩm */}
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
              </div>
            )}
          </Form.List>
          {/* loại đế */}
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
                options={dataLD.map((values: DataTypeLD) => ({
                  label: values.ten,
                  value: values.id,
                }))}
              />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenLoaiDe(true);
              }}
            />
          </Space.Compact>
          {/* địa hình sân */}
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
                options={dataDHS.map((values: DataTypeDHS) => ({
                  label: values.ten,
                  value: values.id,
                }))}
              />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenDiaHinhSan(true);
              }}
            />
          </Space.Compact>

          {/* kích cỡ */}
          <Space.Compact block>
            <Form.Item
              style={{ width: "100%" }}
              name="kichCo"
              label="Kích cỡ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kích cỡ !",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                placeholder="Chọn kích cỡ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (String(option?.kichCo) ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.kichCo - optionB.kichCo
                }
                options={dataKC.map((values: DataTypeKC) => ({
                  kichCo: values.kichCo,
                  value: values.kichCo,
                }))}
              />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenKichCo(true);
              }}
            />
          </Space.Compact>

          {/* màu sắc */}
          <Space.Compact block>
            <Form.Item
              style={{ width: "100%" }}
              name="mauSac"
              label="Màu sắc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn màu sắc !",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                placeholder="Chọn màu sắc"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={dataMS.map((values: DataTypeMS) => ({
                  label: values.ten,
                  value: values.id,
                }))}
              />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenMauSac(true);
              }}
            />
          </Space.Compact>
        </Form>
        <ModalLoaiDe
          open={openLoaiDe}
          onCreate={onCreateLD}
          onCancel={() => {
            setOpenLoaiDe(false);
          }}
        />
        <ModalKichCo
          open={openKichCo}
          onCreate={onCreateKC}
          onCancel={() => {
            setOpenKichCo(false);
          }}
        />
        <ModalDiaHinhSan
          open={openDiaHinhSan}
          onCreate={onCreateDHS}
          onCancel={() => {
            setOpenDiaHinhSan(false);
          }}
        />
        <ModalMauSac
          open={openMauSac}
          onCreate={onCreateMS}
          onCancel={() => {
            setOpenMauSac(false);
          }}
        />
      </Card>
    </>
  );
};
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: string) => void;
  onCancel: () => void;
}

// modal thương hiệu
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
//  modal loại đế
const ModalLoaiDe: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Thêm loại đế"
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
        title="Thêm loại đế"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="ten"
          label="Tên loại đế"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên loại đế!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// modal kích cỡ
const ModalKichCo: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Thêm kích cỡ"
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
        title="Thêm kích cỡ"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="kichCo"
          label="Kích cỡ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập kích cỡ !",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// modal địa hình sân
const ModalDiaHinhSan: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Thêm địa hình sân"
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
        title="Thêm địa hình sân"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="ten"
          label="tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa hình sân !",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// modal màu sắc
const ModalMauSac: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [colorHex, setColorHex] = useState<Color | string>("");
  const hexString = useMemo(
    () =>
      typeof colorHex === "string"
        ? colorHex.toUpperCase()
        : colorHex.toHexString().toUpperCase(),
    [colorHex]
  );
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
            values.ma = hexString;
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        title="Thêm mầu sắc"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          label="Mã"
          name="ma"
          initialValue={null}
          rules={[{ required: true, message: "Vui lòng nhập mã màu sắc!" }]}
        >
          <ColorPicker format={"hex"} onChange={setColorHex} showText />
        </Form.Item>
        <Form.Item
          name="ten"
          label="Tên"
          rules={[
            {
              whitespace: true,
              required: true,
              message: "Vui lòng nhập tên màu sắc!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddSanPham;
