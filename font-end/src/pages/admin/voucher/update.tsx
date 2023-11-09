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
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [inputSoLuong, setInputSoLuong] = useState('');

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleSelectChange2 = (value) => {
    setSelectedOption2(value);
  };

  const handleInputChange1 = (value) => {
    setInput1(value);
  };

  const handleInputChange2 = (value) => {
    setInput2(value);
  };

  const handleInputChangeSoLuong = (value) => {
    setInputSoLuong(value);
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
        const formattedStartDate = dayjs(res.data?.ngayBatDau, "YYYY-MM-DD");
        const formattedEndDate = dayjs(res.data?.ngayKetThuc, "YYYY-MM-DD");
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
        const selectedOptionValue = res.data?.hinhThucGiam?.id.toString();
        setSelectedOption(selectedOptionValue);
        form.setFieldsValue({
          id: res.data?.id,
          ma: res.data?.ma,
          ten: res.data?.ten,
          dateRange: [formattedStartDate, formattedEndDate],
          hinhThucGiam: res.data?.hinhThucGiam.id,
          giaToiThieu: res.data?.giaToiThieu,
          giaTriGiam: res.data?.giaTriGiam,
          giaTriGiamToiDa: res.data?.giaTriGiamToiDa,
          soLuong: res.data?.soLuong,
          trangThai: trangThaiValue,
        });

        if (res.data?.soLuong !== null && res.data?.soLuong !== undefined) {
          setInputSoLuong(res.data?.soLuong.toString());
          setSelectedOption2('2'); // Giới hạn
        } else {
          setInputSoLuong('');
          setSelectedOption2('1'); // Không giới hạn
        }

        setLoadingForm(false);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    getOne();
    fetchData();
  }, [id]);

  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật voucher này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        const soLuong = selectedOption2 === '2' ? inputSoLuong : null;
        try {
          const ngayBatDau = dayjs(values.dateRange[0]).format("YYYY-MM-DD");
          const ngayKetThuc = dayjs(values.dateRange[1]).format("YYYY-MM-DD");
          const res = await request.put("voucher/" + id, {
            id: values.id,
            ma: values.ma,
            ten: values.ten,
            ngayBatDau: ngayBatDau,
            ngayKetThuc: ngayKetThuc,
            hinhThucGiam: { id: values.hinhThucGiam },
            giaToiThieu: values.giaToiThieu,
            giaTriGiam: values.giaTriGiam,
            giaTriGiamToiDa: values.giaTriGiamToiDa,
            soLuong: soLuong,
          });
          console.log(values);
          if (res.data) {
            message.success("Cập nhật voucher thành công");
            navigate("/admin/voucher");
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          console.log(values);
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
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 750 }}
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
              label="Ngày Bắt Đầu - Kết Thúc"
              name="dateRange"
              rules={[{ required: true, message: "Vui lòng Chọn ngày bắt đầu, ngày kết thúc!" }]}
            >
              <DatePicker.RangePicker format="DD/MM/YYYY" style={{ width: "100%" }}
                value={startDate && endDate ? [startDate, endDate] : null} />
            </Form.Item>

            <Form.Item
              name="soLan"
              label="Số lần sử dụng"
              initialValue="Không giới hạn"
              rules={[{ required: true, message: 'Vui lòng chọn số lần' },
              {
                validator: (_, value) => {
                  if (selectedOption2 === '2' && value <= 0) {
                    return Promise.reject(new Error('Vui lòng nhập số lượng lớn hơn 0'));
                  }
                  return Promise.resolve();
                },
              },
              ]}
            >
              <Select value={selectedOption2} onChange={handleSelectChange2}>
                <Option value="1">Không giới hạn</Option>
                <Option value="2">Giới hạn</Option>
              </Select>

              {selectedOption2 === '2' && (
                <>
                  <Form.Item style={{ marginTop: '25px' }}
                    name="soLuong"
                    label="Số lượng"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' },
                    {
                      validator: (_, value) => {
                        if (selectedOption2 === '2' && value <= 0) {
                          return Promise.reject(new Error('Vui lòng nhập số lượng lớn hơn 0'));
                        }
                        return Promise.resolve();
                      },
                    },
                    ]}>
                    <InputNumber

                      style={{ width: '100%' }}
                      step={1}
                      value={inputSoLuong}
                      onChange={handleInputChangeSoLuong}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                </>
              )}

            </Form.Item>

            <Form.Item
              name="hinhThucGiam"
              label="Hình thức giảm giá"
              initialValue="Chọn hình thức giảm giá"
              rules={[{ required: true, message: 'Vui lòng chọn hình thức giảm giá' }]}
            >
              <Select value={selectedOption} onChange={handleSelectChange}>
                <Option value="1">Phần trăm</Option>
                <Option value="2">Giá tiền</Option>
              </Select>

              {selectedOption === '1' && (
                <>
                  <Form.Item style={{ marginTop: '25px' }}
                    name="giaToiThieu"
                    label="Giá trị đơn hàng tối thiểu"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu!' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      step={1000}
                      value={input1}
                      onChange={handleInputChange1}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} addonAfter="VND"
                    />
                  </Form.Item>

                  <Form.Item name="giaTriGiamToiDa"
                    label="Giá trị giảm tối đa"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm tối đa!' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      step={1000}
                      value={input2}
                      onChange={handleInputChange2}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} addonAfter="VND"
                    />
                  </Form.Item>

                  <Form.Item name="giaTriGiam"
                    label="Giá trị giảm"
                    rules={[
                      { required: true, message: 'Vui lòng nhập giá trị giảm!' },
                      {
                        validator: (_, value) => {
                          if (value <= 0) {
                            return Promise.reject(new Error('Giá trị giảm phải lớn hơn 0%'));
                          }
                          else if (value > 99) {
                            return Promise.reject(new Error('Chỉ giảm tối đa 99%'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <InputNumber min={0} max={1000} formatter={(value) => `${value}%`.replace('%', '')} style={{ width: '100%' }} addonAfter="%" />
                  </Form.Item>
                </>
              )}

              {selectedOption === '2' && (
                <>
                  <Form.Item style={{ marginTop: '25px' }}
                    name="giaToiThieu"
                    label="Giá trị đơn tối thiểu"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn tối thiểu!' },
                    {
                      validator: (_, value) => {
                        if (value <= 0) {
                          return Promise.reject(new Error('Giá trị đơn tối thiểu phải lớn hơn 0'));
                        }
                        return Promise.resolve();
                      },
                    },
                    ]}>
                    <InputNumber
                      style={{ width: '100%' }}
                      step={1000}
                      value={input1}
                      onChange={handleInputChange1}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} addonAfter="VND"
                    />
                  </Form.Item>

                  <Form.Item name="giaTriGiamToiDa"
                    label="Giá trị giảm"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm tối đa!' },
                    {
                      validator: (_, value) => {
                        if (value <= 0) {
                          return Promise.reject(new Error('Giá trị giảm tối đa lớn hơn 0'));
                        }
                        return Promise.resolve();
                      },
                    },]}>
                    <InputNumber
                      style={{ width: '100%' }}
                      step={1000}
                      value={input2}
                      onChange={handleInputChange2}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} addonAfter="VND"
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