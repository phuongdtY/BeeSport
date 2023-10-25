import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  ColorPicker,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataType as DataTypeHoaDon,
  UpdatedRequest,
} from "~/interfaces/hoaDon.type";
import { DataType as DataTypeHoaDonChiTiet } from "~/interfaces/hoaDonChiTiet.type";
import request from "~/utils/request";
const { confirm } = Modal;
import generatePDF, { Options } from "react-to-pdf";
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";

const options: Options = {
  filename: "hoa-don.pdf",
  page: {
    margin: 20,
  },
};

const getTargetElement = () => document.getElementById("pdfReaderHoaDon");
const downloadPdf = () => generatePDF(getTargetElement, options);

const detailHoaDon: React.FC = () => {
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  const [data, setData] = useState<DataTypeHoaDon | null>(null);
  const [listHoaDonChiTiet, setListHoaDonChiTiet] = useState<
    DataTypeHoaDonChiTiet[] | null
  >(null);
  const [orderStatus, setOrderStatus] = useState(data?.trangThaiHoaDon);
  const columns: ColumnsType<DataTypeHoaDonChiTiet> = [
    {
      title: "STT",
      key: "index",
      align: "center",
      rowScope: "row",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "chiTietSanPham",
      key: "chiTietSanPham",
      align: "center",
      sorter: true,
      width: "40%",
      render: (chiTietSanPham) => (
        <Space>
          <span>
            <div
              dangerouslySetInnerHTML={{
                __html: `${chiTietSanPham.sanPham.ten}<br /> <br />[${chiTietSanPham.mauSac.ten}-${chiTietSanPham.kichCo.kichCo}-${chiTietSanPham.loaiDe.ten}-${chiTietSanPham.diaHinhSan.ten}]`,
              }}
            />
          </span>
        </Space>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
      sorter: true,
      width: "10%",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
      align: "center",
      sorter: true,
      width: "15%",
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "center",
      sorter: true,
      width: "15%",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
      align: "center",
      sorter: true,
      width: "20%",
    },
  ];
  const [showExportButton, setShowExportButton] = useState(true);
  useEffect(() => {
    const fetchHoaDonData = async () => {
      setLoadingForm(true);
      try {
        const res = await request.get("hoa-don/" + id);
        form.setFieldsValue({
          diaChiNguoiNhan: res.data?.diaChiNguoiNhan,
          emailNguoiNhan: res.data?.emailNguoiNhan,
          ghiChu: res.data?.ghiChu,
        });
        setData(res.data);
        setOrderStatus(res.data?.trangThaiHoaDon);
        setListHoaDonChiTiet(res.data.hoaDonChiTietList);
        setLoadingForm(false);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    fetchHoaDonData();
  }, [id]);
  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật hóa đơn này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await request.put("hoa-don/" + id, {
            ma: data?.ma,
            diaChiNguoiNhan: values.diaChiNguoiNhan,
            emailNguoiNhan: values.emailNguoiNhan,
            ghiChu: values.ghiChu,
            trangThaiHoaDon: data?.trangThaiHoaDon.ten,
            loaiHoaDon: data?.loaiHoaDon.ten,
            nguoiNhan: data?.nguoiNhan,
            sdtNguoiNhan: data?.sdtNguoiNhan,
            tongTien: data?.tongTien,
          });
          if (res.data) {
            message.success("Cập nhật hóa đơn thành công");
            navigate("/admin/hoa-don");
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Cập nhật loại đế thất bại");
          }
        }
      },
    });
  };
  // hiển thị danh sách sản phẩm trong cột
  const dataSourceDanhSachSanPham = () => {
    return listHoaDonChiTiet?.map((item) => ({
      ...item,
      maMauSac: item.chiTietSanPham.mauSac.ma,
      soKichCo: item.chiTietSanPham.kichCo.kichCo,
      thanhTien: Number(item.soLuong) * Number(item.donGia),
    }));
  };
  // tính tổng tiền của hóa đơn đó cần trả
  const phiShip = Number(data?.phiShip);
  let total = 0;
  total += phiShip;
  listHoaDonChiTiet?.forEach((item) => {
    const thanhTien = Number(item.soLuong) * Number(item.donGia);
    total += thanhTien;
  });
  //

  // trạng thái của hóa đơn xử lý button
  const confirmedStatus = {
    ten: "CONFIRMED",
    moTa: "Đã xác nhận",
    mauSac: "success",
  };

  const shipingStatus = {
    ten: "SHIPPING",
    moTa: "Đang vận chuyển",
    mauSac: "geekblue",
  };

  // xử lý button xác nhận
  const handleConfirm = async (values: UpdatedRequest) => {
    setOrderStatus(confirmedStatus);
    try {
      const res = await request.put("hoa-don/" + id, {
        ma: data?.ma,
        diaChiNguoiNhan: values.diaChiNguoiNhan,
        emailNguoiNhan: values.emailNguoiNhan,
        ghiChu: values.ghiChu,
        trangThaiHoaDon: "CONFIRMED",
        loaiHoaDon: data?.loaiHoaDon.ten,
        nguoiNhan: data?.nguoiNhan,
        sdtNguoiNhan: data?.sdtNguoiNhan,
        tongTien: data?.tongTien,
      });
      if (res.data) {
        message.success("Cập nhật hóa đơn thành công");
      } else {
        console.error("Phản hồi API không như mong đợi:", res);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        console.error("Lỗi không xác định:", error);
        message.error("Cập nhật loại đế thất bại");
      }
    }
  };

  const handleDeliver = async (values: UpdatedRequest) => {
    if (orderStatus?.ten === "CONFIRMED") {
      setShowExportButton(false);
      try {
        const res = await request.put("hoa-don/" + id, {
          ma: data?.ma,
          diaChiNguoiNhan: values.diaChiNguoiNhan,
          emailNguoiNhan: values.emailNguoiNhan,
          ghiChu: values.ghiChu,
          trangThaiHoaDon: "SHIPPING",
          loaiHoaDon: data?.loaiHoaDon.ten,
          nguoiNhan: data?.nguoiNhan,
          sdtNguoiNhan: data?.sdtNguoiNhan,
          tongTien: data?.tongTien,
        });
        if (res.data) {
          message.success("Cập nhật hóa đơn thành công");
        } else {
          console.error("Phản hồi API không như mong đợi:", res);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          message.error(error.response.data.message);
        } else {
          console.error("Lỗi không xác định:", error);
          message.error("Cập nhật loại đế thất bại");
        }
      }
      downloadPdf();
      setOrderStatus(shipingStatus);
    }
  };
  //
  return (
    <>
      <Card title="Hóa đơn chi tiết">
        <Skeleton loading={loadingForm}>
          <Form
            labelCol={{ span: 10 }}
            style={{ maxWidth: 1000 }}
            onFinish={onFinish}
            layout="horizontal"
            form={form}
          >
            <div id="pdfReaderHoaDon">
              <Card
                title={"Thông tin người mua"}
                style={{ marginBottom: "5px" }}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item name="ma" label="Mã hóa đơn">
                      <span>{data?.ma}</span>
                    </Form.Item>
                    <Form.Item name="loaiHoaDon" label="Loại hóa đơn">
                      <Tag color={data?.loaiHoaDon?.mauSac}>
                        {data?.loaiHoaDon.moTa}
                      </Tag>
                    </Form.Item>
                    <Form.Item
                      name="trangThaiHoaDon"
                      label="Trạng thái hóa đơn"
                    >
                      <Tag color={orderStatus?.mauSac}>{orderStatus?.moTa}</Tag>
                    </Form.Item>
                    <Form.Item name="nguoiNhan" label="Người nhận">
                      <span>{data?.nguoiNhan}</span>
                    </Form.Item>
                    <Form.Item
                      name="sdtNguoiNhan"
                      label="Số điện thoại người nhận"
                    >
                      <span>{data?.sdtNguoiNhan}</span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="diaChiNguoiNhan"
                      label="Địa chỉ người nhận"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name="emailNguoiNhan" label="Email người nhận">
                      <Input />
                    </Form.Item>
                    <Form.Item name="ghiChu" label="Ghi chú">
                      <TextArea />
                    </Form.Item>
                    <Form.Item>
                      <Space>
                        {orderStatus?.ten === "PENDING" && (
                          <Button
                            type="primary"
                            onClick={async () => {
                              await handleConfirm(form.getFieldsValue());
                            }}
                          >
                            Xác nhận
                          </Button>
                        )}

                        {orderStatus?.ten === "CONFIRMED" &&
                          showExportButton && (
                            <Button
                              type="primary"
                              onClick={async () => {
                                await handleDeliver(form.getFieldsValue());
                              }}
                            >
                              Export PDF
                            </Button>
                          )}
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card title={"Danh sách sản phẩm"}>
                <Table
                  columns={columns}
                  dataSource={dataSourceDanhSachSanPham()}
                />
                <span>Tổng tiền: {total}</span>
              </Card>
            </div>
          </Form>
        </Skeleton>
      </Card>
    </>
  );
};

export default detailHoaDon;
