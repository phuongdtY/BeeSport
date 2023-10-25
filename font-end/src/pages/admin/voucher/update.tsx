import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Skeleton,
  Space,
  DatePicker,
  message,
  Select,
  InputNumber
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest } from "~/interfaces/voucher.type";
const [options, setOptions] = useState([]);
import request from "~/utils/request";
const { confirm } = Modal;
const UpdateVoucher: React.FC = () => {
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  useEffect(() => {
    const getOne = async () => {
      setLoadingForm(true);
      try {
        const res = await request.get("voucher/" + id);
        const trangThaiValue = res.data?.trangThai.ten === "ACTIVE" ? "Hoạt động" :
          res.data?.trangThai.ten === "EXPIRED" ? "Hết hạn" :
            res.data?.trangThai.ten === "INACTIVE" ? "Không hoạt động" :
              res.data?.trangThai.ten === "UPCOMING" ? "Sắp tới" : "";
        form.setFieldsValue({
          ten: res.data?.ten,
          hinhThucGiam: { id: res.data?.hinhThucGiam },
          giaToiThieu: res.data?.giaToiThieu,
          giaTriGiam: res.data?.giaTriGiam,
          giaTriGiamToiDa: res.data?.giaTriGiamToiDa,
          trangThai: trangThaiValue,
        });
        setLoadingForm(false);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    getOne();
  }, [id]);
  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật voucher này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await request.put("voucher/" + id, {
            ten: values.ten,
            // trangThai: values.trangThai == true ? "ACTIVE" : "INACTIVE",
            ngayBatDau: values.ngayBatDau,
            ngayKetThuc: values.ngayKetThuc,
            hinhThucGiam: { id: values.hinhThucGiam },
            giaToiThieu: values.giaToiThieu,
            giaTriGiam: values.giaTriGiam,
            giaTriGiamToiDa: values.giaTriGiamToiDa,
          });
          if (res.data) {
            message.success("Cập nhật voucher thành công");
            navigate("/admin/voucher");
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Cập nhật voucher thất bại");
          }
        }
      },
    });
  };
  return (
    <>
      <Card title="CẬP NHẬT VOUCHER">
        <Skeleton loading={loadingForm}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish}
            layout="horizontal"
            form={form}
          >
            <Form.Item
              name="ma"
              label="Mã"
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: "Vui lòng nhập mã voucher!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="ten"
              label="Tên"
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: "Vui lòng nhập tên voucher!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ngayBatDau"
              label="Ngày Bắt Đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng Chọn ngày và giờ bắt đầu!"
                }
              ]}>
              {/* <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ bắt đầu" /> */}
              <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ bắt đầu" />
            </Form.Item>
            <Form.Item name="ngayKetThuc"
              label="Ngày Kết Thúc"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}>
              {/* <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ kết thúc" /> */}
              <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" placeholder="Chọn ngày và giờ kết thúc" />
            </Form.Item>
            <Form.Item
              name="hinhThucGiam"
              label="Hình thức giảm giá"
              initialValue="Chọn hình thức giảm giá"
              rules={[{ required: true, message: "Vui lòng chọn hình thức giảm giá" }]}>
              <Select>
                {options.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.ten}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="giaToiThieu"
              label="Giá tối thiểu"
              rules={[{ required: true, message: "Vui lòng nhập giá tối thiểu!" }]}>
              <InputNumber style={{ width: "100%" }} step={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
            <Form.Item
              name="giaTriGiam"
              label="Giá trị giảm"
              rules={[{ required: true, message: "Vui lòng nhập giá trị giảm!" }]}>
              <InputNumber style={{ width: "100%" }} step={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
            <Form.Item
              name="giaTriGiamToiDa"
              label="Giá trị giảm tối đa"
              rules={[{ required: true, message: "Vui lòng nhập giá trị giảm tối đa!" }]}>
              <InputNumber style={{ width: "100%" }} step={1000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>
            <Form.Item
              name="trangThai"
              label="Trạng Thái"
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: "Vui lòng nhập mã voucher!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 17 }}>
              <Space>
                <Button type="dashed" htmlType="reset">
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Skeleton>
      </Card>
    </>
  );
};

export default UpdateVoucher;
