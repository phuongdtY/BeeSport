import { EditOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
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
  Table,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import request from "~/utils/request";
import ModalAddThuongHieu from "./ModalAddThuongHieu";
import TableUpdateSanpham from "./TableUpdateSanPham";

const UpdateSanPham: React.FC = () => {
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [dataThuongHieu, setDataThuongHieu] = useState([]);
  const [openModalTH, setOpenModalTH] = useState(false);

  let { id } = useParams();

  const getDataSanPham = async () => {
    try {
      const res = await request.get(`san-pham/${id}`);
      form.setFieldsValue({
        ten: res.data?.ten,
        thuongHieu: res.data.thuongHieu.id,
        moTa: res.data.moTa,
      });
    } catch (error) {
      message.error("Lấy dữ liệu sản phẩm thất bại");
      console.log(error);
    }
  };
  // api gọi loại đế
  const getDataThuongHieu = async () => {
    try {
      const res = await request.get("thuong-hieu/list");
      setDataThuongHieu(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataThuongHieu();
    getDataSanPham();
  }, []);
  const addThuongHieu = (newData) => {
    getDataThuongHieu();
    form.setFieldsValue({
      thuongHieu: newData.id,
    });
  };
  const onFinish = async (data) => {
    try {
      await request.put(`san-pham/${id}`, {
        ten: data.ten,
        moTa: data.moTa,
        thuongHieu: {
          id: data.ThuongHieu,
        },
        trangThai: "ACTIVE",
      });
      message.success("sửa sản phẩm thành công");
    } catch (error) {
      console.log(error);
      message.error("Sửa sản phẩm thất bại");
    }
  };
  return (
    <>
      <Card title="Thông Tin Sản Phẩm">
        <Form
          onFinish={onFinish}
          style={{ marginLeft: 100, maxWidth: 900 }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="ten"
            initialValue={null}
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
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
                options={dataThuongHieu.map((values: any) => ({
                  label: values.ten,
                  value: values.id,
                }))}
              />
            </Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenModalTH(true);
              }}
            />
          </Space.Compact>
          <Form.Item label="Mô tả" name="moTa">
            <TextArea />
          </Form.Item>
          <Form.Item>
            <Space style={{ marginLeft: 690 }}>
              <Button type="dashed" htmlType="reset" icon={<RedoOutlined />}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                Chỉnh Sửa
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <ModalAddThuongHieu
        openModal={openModalTH}
        closeModal={() => {
          setOpenModalTH(false);
        }}
        addThuongHieu={addThuongHieu}
      />
      <Card title="Chi Tiết Sản Phẩm">
        <TableUpdateSanpham idSanPham={id} />
      </Card>
    </>
  );
};
export default UpdateSanPham;
