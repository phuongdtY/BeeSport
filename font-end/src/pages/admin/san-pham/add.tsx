import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  ColorPicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { DataType as DataTypeTH } from "~/interfaces/thuongHieu.type";
import { DataType as DataTypeLD } from "~/interfaces/loaiDe.type";
import { DataType as DataTypeKC } from "~/interfaces/kichCo.type";
import { DataType as DataTypeDHS } from "~/interfaces/diaHinhSan.type";
import { DataType as DataTypeMS } from "~/interfaces/mauSac.type";
import request from "~/utils/request";
import { Color } from "antd/es/color-picker";

import TableSanPham from "./TableAddSanPham";
import { DataTypeSanPham } from "~/interfaces/sanPham.type";
import ModalAddSanPham from "./ModalAddSanPham";

const AddSanPham: React.FC = () => {
  const [openThuongHieu, setOpenThuongHieu] = useState(false);
  const [openLoaiDe, setOpenLoaiDe] = useState(false);
  const [openModalSP, setOpenModalSP] = useState(false);
  const [openKichCo, setOpenKichCo] = useState(false);
  const [openMauSac, setOpenMauSac] = useState(false);
  const [openDiaHinhSan, setOpenDiaHinhSan] = useState(false);
  const [form] = Form.useForm();
  const [dataSP, setDataSP] = useState<DataTypeTH[]>([]);
  const [dataLD, setDataLD] = useState<DataTypeLD[]>([]);
  const [dataKC, setDataKC] = useState<DataTypeKC[]>([]);
  const [dataDHS, setDataDHS] = useState<DataTypeDHS[]>([]);
  const [dataMS, setDataMS] = useState<DataTypeMS[]>([]);
  const [selectedSP, setSelectedSP] = useState<string | undefined>(undefined);
  const [selectedLD, setSelectedLD] = useState<string | undefined>(undefined);
  const [selectedKC, setSelectedKC] = useState<string | undefined>(undefined);
  const [selectedDHS, setSelectedDHS] = useState<string | undefined>(undefined);
  const [selectedMS, setSelectedMS] = useState<string | undefined>(undefined);
  const [selectedSanPham, setSelectedSanPham] = useState<number>();
  const [selectedLoaiDe, setSelectedLoaiDe] = useState<string[]>([]);
  const [selectedDiaHinhSan, setSelectedDiaHinhSan] = useState<string[]>([]);
  const [selectedMauSac, setSelectedMauSac] = useState<string[]>([]);
  const [selectedKichCo, setSelectedKichCo] = useState<string[]>([]);
  const [fakeData, setFakeData] = useState<DataTypeSanPham[]>([]);
  const { confirm } = Modal;

  const addSanPham = (newData) => {
    fetchDataSP();
    form.setFieldsValue({
      sanPham: newData.id,
    });
  };
  const offModalSP = () => {
    setOpenModalSP(false);
  };
  const handledSanPham = (value: number) => {
    setSelectedSanPham(value);
  };
  const handleLoaiDe = (value: string[]) => {
    setSelectedLoaiDe(value);
  };
  const handleDiaHinhSan = (value: string[]) => {
    setSelectedDiaHinhSan(value);
  };
  const handleMauSac = (values: string[]) => {
    setSelectedMauSac(values);
  };
  const handleKichCo = (values: string[]) => {
    setSelectedKichCo(values);
  };

  // api gọi thương hiệu
  const fetchDataSP = async () => {
    try {
      const res = await request.get("san-pham/null-ctsp");
      setDataSP(res.data);
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
      const res = await request.get("kich-co/list");
      setDataKC(res.data);
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
    fetchDataSP();
    fetchDataMS();
    fetchDataKC();
    fetchDataDHS();
    fetchDataLD();
    form.setFieldsValue({
      loaiDe: selectedLD,
      diaHinhSan: selectedDHS,
    });
  }, [selectedLD, selectedDHS]);

  const onCreateTH = async (values: any) => {
    try {
      const res = await request.post("thuong-hieu", values);
      // fetchDataTH();
      setSelectedSP(res.data.id);
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
  const handleFakeDataChange = (newFakeData) => {
    setFakeData(newFakeData);
  };
  const onFinish = async (values: any) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc thêm sản phẩm này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await request.post("/chi-tiet-san-pham", fakeData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          message.success("Thêm list sản phẩm thành công");
        } catch (error) {
          message.error("Thêm list sản phẩm thất bại");
          console.log(error);
        }
      },
    });
  };

  return (
    <>
      {/* Sản phẩm */}
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
      >
        <Card title="THÊM SẢN PHẨM">
          {/* Thương hiệu combobox */}
          <Space.Compact block>
            <Form.Item
              style={{ width: "100%" }}
              name="sanPham"
              label="Tên Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tên sản phẩm!",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={handledSanPham}
                placeholder="Chọn sản phẩm..."
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                options={dataSP.map((values: DataTypeTH) => ({
                  label: values.ten,
                  value: values.id,
                }))}
              />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenModalSP(true);
              }}
            />
          </Space.Compact>
          <ModalThuongHieu
            open={openThuongHieu}
            onCreate={onCreateTH}
            onCancel={() => {
              setOpenThuongHieu(false);
            }}
          />

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
                onChange={handleLoaiDe}
                showSearch
                placeholder="Chọn loại đế"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                options={dataLD.map((values: DataTypeTH) => ({
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
                placeholder="Chọn địa hình sân"
                onChange={handleDiaHinhSan}
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                options={dataDHS.map((values: DataTypeTH) => ({
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
                mode="multiple"
                placeholder="Chọn màu sắc"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                options={dataMS.map((values: DataTypeTH) => ({
                  label: values.ten,
                  value: values.id,
                }))}
                onChange={handleMauSac}
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
                mode="multiple"
                placeholder="Chọn kích cỡ"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                options={dataKC.map((values: DataTypeKC) => ({
                  label: values.kichCo,
                  value: values.id,
                }))}
                onChange={handleKichCo}
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
          <TableSanPham
            onFakeDataChange={handleFakeDataChange}
            dataKC={dataKC}
            dataMS={dataMS}
            selectedSanPham={selectedSanPham}
            selectedDiaHinhSan={selectedDiaHinhSan}
            selectedLoaiDe={selectedLoaiDe}
            selectedKichCo={selectedKichCo}
            selectedMauSac={selectedMauSac}
          />

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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xong
          </Button>
        </Form.Item>
      </Form>
      <ModalAddSanPham
        addSanPham={addSanPham}
        openModal={openModalSP}
        closeModal={offModalSP}
      />
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
