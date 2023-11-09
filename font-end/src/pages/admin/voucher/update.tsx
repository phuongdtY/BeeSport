import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Skeleton, Space, DatePicker, message, Select, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest } from "~/interfaces/voucher.type";
import request from "~/utils/request";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DataType } from "~/interfaces/voucher.type";
dayjs.extend(customParseFormat);

const { confirm } = Modal;
const { Option } = Select;

const UpdateVoucher: React.FC = () => {
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();
  let { id } = useParams();
  const [data, setData] = useState<DataType | null>(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleInputChange1 = (value) => {
    setInput1(value);
  };

  const handleInputChange2 = (value) => {
    setInput2(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("hinh-thuc-giam-gia");
        setOptions(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const getOne = async () => {
      setLoadingForm(true);
      try {
        const res = await request.get("voucher/" + id);
        const trangThaiValue = res.data?.trangThai.ten === "ACTIVE" ? "Hoạt động" :
          res.data?.trangThai.ten === "EXPIRED" ? "Hết hạn" :
            res.data?.trangThai.ten === "INACTIVE" ? "Không hoạt động" :
              res.data?.trangThai.ten === "UPCOMING" ? "Sắp tới" : "";
        const ngayBatDauValue = dayjs(res.data?.ngayBatDau);
        const ngayKetThucValue = dayjs(res.data?.ngayKetThuc);
        form.setFieldsValue({
          id: res.data?.id,
          ma: res.data?.ma,
          ten: res.data?.ten,
          ngayBatDau: ngayBatDauValue,
          ngayKetThuc: ngayKetThucValue,
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
            id: values.id,
            ma: values.ma,
            ten: values.ten,
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
              name="id"
              label="Id"
              style={{ display: 'none' }} // Ẩn trường id
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="ma"
              label="Mã"
              rules={[
                {
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
              rules={[{ required: true, message: "Vui lòng Chọn ngày bắt đầu!" }]} >
              <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày bắt đầu" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="ngayKetThuc"
              label="Ngày Kết Thúc"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}>
              <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày kết thúc" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="hinhThucGiam"
              label="Hình thức giảm giá"
              initialValue="Chọn hình thức giảm giá"
              rules={[{ required: true, message: 'Vui lòng chọn hình thức giảm giá' }]}
            >
              <Select value={selectedOption} onChange={handleSelectChange}>
                <Option value="1">Phần Trăm</Option>
                <Option value="2">Giá tiền</Option>
              </Select>

              {selectedOption === '1' && (
                <Form.Item style={{ marginTop: '25px' }}
                  name="giaTriGiam"
                  label="Giá trị giảm"
                  rules={[
                    { required: true, message: 'Vui lòng nhập giá trị giảm!' },
                    {
                      validator: (_, value) => {
                        if (value > 100) {
                          return Promise.reject(new Error('Chỉ giảm tối đa 100%'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber min={0} max={1000} formatter={(value) => `${value}%`.replace('%', '')} />
                </Form.Item>
              )}

              {selectedOption === '2' && (
                <>
                  <Form.Item style={{ marginTop: '25px' }}
                    name="giaToiThieu"
                    label="Giá tối thiểu"
                    rules={[{ required: true, message: 'Vui lòng nhập giá tối thiểu!' }]}>
                    <InputNumber
                      style={{ width: '100%' }}
                      step={1000}
                      value={input1}
                      onChange={handleInputChange1}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                  <Form.Item name="giaTriGiamToiDa"
                    label="Giá trị giảm tối đa"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm tối đa!' }]}>
                    <InputNumber
                      style={{ width: '100%' }}
                      step={1000}
                      value={input2}
                      onChange={handleInputChange2}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                </>
              )}
            </Form.Item>
            <Form.Item
              name="trangThai"
              label="Trạng Thái"
              style={{ display: 'none' }} // Ẩn trường trạng thái
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