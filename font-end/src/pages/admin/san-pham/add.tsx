import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { DataType as DataTypeTH } from "~/interfaces/thuongHieu.type";
import { DataType as DataTypeLD } from "~/interfaces/loaiDe.type";
import { DataType as DataTypeKC } from "~/interfaces/kichCo.type";
import { DataType as DataTypeDHS } from "~/interfaces/diaHinhSan.type";
import { DataType as DataTypeMS } from "~/interfaces/mauSac.type";
import request from "~/utils/request";
import { Color } from "antd/es/color-picker";
import { ColumnsType } from "antd/es/table";
import { json } from "react-router-dom";

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
  const [selectedLoaiDe, setSelectedLoaiDe] = useState<string[]>([]);
  const [selectedDiaHinhSan, setSelectedDiaHinhSan] = useState<string[]>([]);
  const [selectedMauSac, setSelectedMauSac] = useState<string[]>([]);
  const [selectedKichCo, setSelectedKichCo] = useState<string[]>([]);
  const [sanPhamId, setSanPhamId] = useState<number>();

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

  const createFakeData = () => {
    const fakeData = [];
    selectedMauSac.forEach((mauSac) => {
      selectedKichCo.forEach((kichCo) => {
        const uniqueId = `${mauSac}-${kichCo}`; // Create a unique ID
        fakeData.push({
          key: uniqueId,
          giaTien: 100000,
          soLuong: 10,
          loaiDe: {
            id: selectedLoaiDe,
          },
          diaHinhSan: {
            id: selectedDiaHinhSan,
          },
          sanPham: {
            id: 18,
          },
          mauSac: {
            id: mauSac,
          },
          kichCo: {
            id: kichCo,
          },
        });
      });
    });
    return fakeData;
  };

  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    setFakeData(createFakeData());
  }, [selectedMauSac, selectedKichCo]);
  const deleteItemFromFakeData = (key) => {
    const updatedData = fakeData.filter((item) => item.key !== key);
    setFakeData(updatedData);
    console.log(fakeData);
  };
  const handleEditSoLuong = (key, newSoLuong) => {
    // Find the item in the fake data array and update the "soLuong" field
    setFakeData((prevFakeData: any) =>
      prevFakeData.map((item) =>
        item.key === key ? { ...item, soLuong: newSoLuong } : item
      )
    );
  };
  const handleEditGiaTien = (key, newGiaTien) => {
    // Find the item in the fake data array and update the "giaTien" field
    setFakeData((prevFakeData: any) =>
      prevFakeData.map((item) =>
        item.key === key ? { ...item, giaTien: newGiaTien } : item
      )
    );
  };
  const groupedData = {};

  fakeData.forEach((data) => {
    if (!groupedData[data.mauSac]) {
      groupedData[data.mauSac] = [];
    }
    groupedData[data.mauSac].push(data);
  });
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [currentPage, setCurrentPage] = useState(1); // Default current page

  // Handler for page change
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  const tables = Object.keys(groupedData).map((mauSac) => {
    return (
      <div key={mauSac} style={{ marginBottom: 50 }}>
        <Alert
          style={{ textAlign: "center", fontWeight: "bold" }}
          message={mauSac}
          type="info"
        />
        <Table
          dataSource={groupedData[mauSac]}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            onChange: (page, pageSize) => handlePageChange(page, pageSize),
          }}
          columns={[
            {
              title: "#",
              rowScope: "row",
              render: (text, record, index) =>
                index + 1 + pageSize * (currentPage - 1),
            },

            {
              title: "Kích Cỡ",
              align: "center",
              dataIndex: "kichCo",
            },
            {
              title: "Số lượng",
              align: "center",
              dataIndex: "soLuong",
              render: (soLuong, record) => (
                <InputNumber
                  value={soLuong}
                  min={1}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(newSoLuong) =>
                    handleEditSoLuong(record.key, newSoLuong)
                  }
                />
              ),
            },

            {
              title: "Giá tiền",
              align: "center",
              dataIndex: "giaTien",
              render: (giaTien, record) => (
                <InputNumber
                  value={giaTien}
                  style={{ width: "100%" }}
                  min={0}
                  step={1000}
                  formatter={(value) => `${formatCurrency(value)}`}
                  parser={(value) => value!.replace(/\D/g, "")}
                  onChange={(newGiaTien) =>
                    handleEditGiaTien(record.key, newGiaTien)
                  }
                />
              ),
            },
            {
              dataIndex: "key",
              align: "center",
              width: "10%",
              render: (key) => (
                <Button
                  type="link"
                  style={{ padding: 0 }}
                  onClick={() => deleteItemFromFakeData(key)}
                >
                  <Tooltip title={key}>
                    <DeleteOutlined style={{ color: "red" }} />
                  </Tooltip>
                </Button>
              ),
            },
            {
              title: "Ảnh",
              key: "anh",
              align: "center",
              render: (key) => (
                <Button type="link" style={{ padding: 0 }}>
                  <Tooltip title={key}>
                    <DeleteOutlined style={{ color: "red" }} />
                  </Tooltip>
                </Button>
              ),
            },
          ]}
        />
        <Button
          type="dashed"
          style={{ textAlign: "center" }}
          icon={<PlusOutlined />}
          block
        >
          Thêm kích cỡ {mauSac}
        </Button>
      </div>
    );
  });
  function formatCurrency(value: any) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(value).replace("₫", "VNĐ");
  }

  const onFinish = async (values) => {
    const fakeData1 = [
      {
        soLuong: 5,
        giaTien: 100.0,
        loaiDe: { id: 2 },
        diaHinhSan: { id: 2 },
        sanPham: { id: 19 },
        mauSac: { id: 2 },
        kichCo: { id: 2 },
      },
      {
        soLuong: 3,
        giaTien: 75.0,
        loaiDe: { id: 1 },
        diaHinhSan: { id: 1 },
        sanPham: { id: 19 },
        mauSac: { id: 1 },
        kichCo: { id: 1 },
      },
    ];
    try {
      const response = await request.post("chi-tiet-san-pham", {
        fakeData1,
      });
      console.log("Response from server:", response.data);
      message.success("Thêm list sản phẩm thành công");
    } catch (error) {
      message.error("Thêm list sản phẩm thất bại");
      console.error(error);
    }
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
          <Row>
            <Col span={4}></Col>
            <Col span={14}>
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
              <Form.Item name="moTa" label="Mô tả">
                <TextArea />
              </Form.Item>
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

          <div>{tables}</div>

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
