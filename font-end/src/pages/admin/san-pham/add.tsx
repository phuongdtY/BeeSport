import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import * as React from "react";
import { useState, useEffect } from "react";
import { DataType } from "~/interfaces/thuongHieu.type";
import request from "~/utils/request";

const AddSanPham: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataTH, setDataTH] = useState<DataType[]>([]);
  const [selectedTH, setSelectedTH] = useState<string | undefined>(undefined);
  // api gọi thương hiệu
  const fetchData = async () => {
    try {
      const res = await request.get("thuong-hieu");
      setDataTH(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(); // Gọi fetchData để lấy dữ liệu khi component được tạo
    console.log(selectedTH);
    form.setFieldsValue({
      thuongHieu: selectedTH,
    });
  }, [selectedTH]);

  const onCreate = async (values: any) => {
    try {
      const res = await request.post("thuong-hieu", values);
      fetchData();
      setSelectedTH(res.data.id);
      message.success("Thêm thương hiệu thành công");
    } catch (error) {
      console.log(error);
      message.error("Thêm thương hiệu thất bại");
    }
    setOpen(false);
  };
  return (
    <>
      <Card title="THÊM SẢN PHẨM">
        <Form form={form}>
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
          <Row>
            <Col span={8}>
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
                    setOpen(true);
                  }}
                />
              </Space.Compact>
            </Col>
            <Col span={8}>
              <Space.Compact block>
                <Form.Item
                  style={{ width: "100%" }}
                  name="thuongHieu"
                  label="Loại đế"
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
                      (option?.label ?? "").includes(input)
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
                    setOpen(true);
                  }}
                />
              </Space.Compact>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xong
            </Button>
          </Form.Item>
        </Form>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
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
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
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
export default AddSanPham;
