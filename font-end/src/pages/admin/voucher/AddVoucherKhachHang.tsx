import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Space,
  message,
  InputNumber,
  Select,
  TimeRangePickerProps,
  Table,
  Tooltip,
  Tag,
  Divider,
} from "antd";
import dayjs from "dayjs";
import request from "~/utils/request";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { CreatedRequest } from "~/interfaces/voucher.type";
import { formatGiaTienVND, formatSoLuong } from "~/utils/formatResponse";
import { ColumnsType } from "antd/es/table";
import { DataType } from "~/interfaces/khachHang.type";
const { Option } = Select;

function AddVoucherKhachHang() {
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataHinhThucGiamGia, setDataHinhThucGiamGia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("hinh-thuc-giam-gia");
        setDataHinhThucGiamGia(res.data.content);
        console.log(res.data.content);
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
        const data = {
          ten: values.ten,
          ngayBatDau: values.dateRange[0].format("YYYY-MM-DD HH:mm:ss"),
          ngayKetThuc: values.dateRange[1].format("YYYY-MM-DD HH:mm:ss"),
          hinhThucGiam: { id: values.hinhThucGiam },
          donToiThieu: values.donToiThieu,
          giaTriGiam:
            values.hinhThucGiam === 2 ? values.giaTriGiam : values.giamToiDa,
          giamToiDa: values.giamToiDa,
          soLuong: values.soLuong,
        };
        console.log(data);

        try {
          setLoading(true);
          await request.post("voucher", data);
          setLoading(false);
          message.success("Thêm voucher thành công");
          navigate("/admin/voucher");
        } catch (error: any) {
          console.log(error);
          message.error(error.response.data.message);
          setLoading(false);
        }
      },
    });
  };
  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Hạn 7 ngày", value: [dayjs(), dayjs().add(+7, "d")] },
    { label: "Hạn 14 ngày", value: [dayjs(), dayjs().add(+14, "d")] },
    { label: "Hạn 30 ngày", value: [dayjs(), dayjs().add(+30, "d")] },
    { label: "Hạn 90 ngày", value: [dayjs(), dayjs().add(+90, "d")] },
  ];
  const onChangeHinhThucGiamGia = () => {
    form.setFieldsValue({
      donToiThieu: 0,
      giaTriGiam: 0,
      giamToiDa: 0,
    });
  };

  // con
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      align: "center",
      rowScope: "row",
      width: "60px",
      render: (_, __, index) => (params.page - 1) * params.pageSize + index + 1,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Liên hệ",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Số lần sử dụng",
      dataIndex: "ten",
      key: "ten",
      width: 150,
    },
    {
      dataIndex: "key",
      align: "center",
      width: "1px",
      render: (key, record) => (
        <Button type="link" style={{ padding: 0 }}>
          <Tooltip title="Xóa">
            <DeleteOutlined
              style={{ color: "red" }}
              // onClick={() => deleteItem(key, record)}
            />
          </Tooltip>
        </Button>
      ),
    },
  ];

  return (
    <Row>
      <Col span={12}>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17 }}
        >
          <Form.Item
            name="ten"
            label="Tên voucher"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Vui lòng điền tên voucher!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="soLanSuDung" label="Khách hàng">
            <Select defaultValue={0}>
              <Option value={0}>Không giới hạn</Option>
              <Option value={1}>Giới hạn</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.soLanSuDung !== currentValues.soLanSuDung
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("soLanSuDung") === 1 ? (
                <Form.Item
                  name="soLuong"
                  label="Số lượng"
                  rules={[
                    { required: true, message: "Bạn chưa điền số lượng!" },
                  ]}
                >
                  <InputNumber
                    defaultValue={0}
                    style={{ width: "100%" }}
                    min={1}
                    formatter={(value) => formatSoLuong(value)}
                    parser={(value: any) => value.replace(/,/g, "")}
                  />
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item
            label="Thời gian áp dụng"
            name="dateRange"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày bắt đầu ~ ngày kết thúc !",
              },
            ]}
          >
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              presets={[
                {
                  label: (
                    <span aria-label="Current Time to End of Day">
                      Hiện tại ~ Cuối ngày
                    </span>
                  ),
                  value: () => [dayjs(), dayjs().endOf("day")],
                },
                ...rangePresets,
              ]}
              showTime
              format="DD/MM/YYYY HH:mm:ss"
            />
          </Form.Item>
          <Form.Item
            name="hinhThucGiam"
            label="Hình thức giảm giá"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hình thức giảm giá !",
              },
            ]}
          >
            <Select
              onChange={onChangeHinhThucGiamGia}
              placeholder="Chọn hình thức giảm giá"
              options={dataHinhThucGiamGia.map((values: any) => ({
                label: values.ten,
                value: values.id,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hinhThucGiam !== currentValues.hinhThucGiam
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("hinhThucGiam") === 1 ? (
                <>
                  <Form.Item
                    initialValue={0}
                    name="donToiThieu"
                    label="Đơn tối thiểu"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa điền đơn tối thiểu!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      step={5000}
                      formatter={(value) => `${formatGiaTienVND(value)}`}
                      parser={(value: any) => value.replace(/\D/g, "")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="giamToiDa"
                    label="Số tiền giảm"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa điền đơn tối thiểu!",
                      },
                    ]}
                  >
                    <InputNumber
                      // defaultValue={0}
                      style={{ width: "100%" }}
                      min={1000}
                      step={5000}
                      formatter={(value) => `${formatGiaTienVND(value)}`}
                      parser={(value: any) => value.replace(/\D/g, "")}
                    />
                  </Form.Item>
                </>
              ) : getFieldValue("hinhThucGiam") === 2 ? (
                <>
                  <Form.Item
                    initialValue={0}
                    name="donToiThieu"
                    label="Đơn tối thiểu"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa điền đơn tối thiểu!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      step={5000}
                      formatter={(value) => `${formatGiaTienVND(value)}`}
                      parser={(value: any) => value.replace(/\D/g, "")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="giaTriGiam"
                    label="Giảm giá (%)"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa điền giảm giá(%)",
                      },
                      {
                        validator: (_, value) => {
                          if (value <= 1) {
                            return Promise.reject(
                              new Error("Giá trị giảm phải lớn hơn 0%")
                            );
                          } else if (value > 100) {
                            return Promise.reject(
                              new Error("Chỉ giảm tối đa 100%")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      defaultValue={0}
                      style={{ width: "100%" }}
                      min={1}
                      max={100}
                      step={1}
                      formatter={(value) => `${value}%`}
                      parser={(value: any) => value!.replace("%", "")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="giamToiDa"
                    label="Giảm tối đa"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa điền giảm tối đa!",
                      },
                      {
                        validator: (_, value) => {
                          if (value <= 0) {
                            return Promise.reject(
                              new Error("Giá trị giảm tối đa lớn hơn 0")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      defaultValue={0}
                      style={{ width: "100%" }}
                      min={1000}
                      step={5000}
                      formatter={(value) => `${formatGiaTienVND(value)}`}
                      parser={(value: any) => value.replace(/\D/g, "")}
                    />
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space style={{ float: "right" }}>
              <Button
                type="dashed"
                htmlType="reset"
                style={{ margin: "0 12px" }}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <div style={{ width: "600px" }}>
          <Divider>Danh Sách Khách Hàng</Divider>
          <Table columns={columns} />
        </div>
      </Col>
    </Row>
  );
}

export default AddVoucherKhachHang;
