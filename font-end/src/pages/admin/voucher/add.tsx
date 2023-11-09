import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Space, message, InputNumber, Select } from 'antd';
import request from "~/utils/request";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { CreatedRequest } from "~/interfaces/voucher.type";
const { Option } = Select;

const AddVoucher: React.FC = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { confirm } = Modal;
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
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
  }, []);

  const onFinish = (values: CreatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc thêm voucher này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          const ngayBatDau = values.dateRange[0];
          const ngayKetThuc = values.dateRange[1];
          await request.post("voucher", {
            ten: values.ten,
            ngayBatDau: ngayBatDau,
            ngayKetThuc: ngayKetThuc,
            hinhThucGiam: { id: values.hinhThucGiam },
            giaToiThieu: values.giaToiThieu,
            giaTriGiam: values.giaTriGiam,
            giaTriGiamToiDa: values.giaTriGiamToiDa,
            soLuong: values.soLuong,
          });
          console.log(values.hinhThucGiam);
          setLoading(false);
          message.success("Thêm voucher thành công");
          navigate("/admin/voucher");
        } catch (error: any) {
          console.log(values.hinhThucGiam);
          // console.log(error);
          message.error(error.response.data.message);
          setLoading(false);
        }
      },
    });
  };

  return (
    <Card title="THÊM VOUCHER">
      <Row>
        <Col span={16}>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 750 }}
          >
            <Form.Item
              name="ten"
              label="Tên voucher"
              rules={[{ required: true, whitespace: true, message: "Vui lòng nhập tên voucher!" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày Bắt Đầu - Kết Thúc"
              name="dateRange"
              rules={[{ required: true, message: "Vui lòng Chọn ngày bắt đầu, ngày kết thúc!" }]}
            >
              <DatePicker.RangePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="soLan"
              label="Số lần sử dụng"
              initialValue="Không giới hạn"
              rules={[{ required: true, message: 'Vui lòng chọn số lần' }]}
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
                    <InputNumber defaultValue={1} min={0} max={1000} formatter={(value) => `${value}%`.replace('%', '')} style={{ width: '100%' }} addonAfter="%" />
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="dashed" htmlType="reset" style={{ margin: "0 12px" }}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Thêm
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </Card>
  );
};

export default AddVoucher;
