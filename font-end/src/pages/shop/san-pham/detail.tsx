import {
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Col,
  ColorPicker,
  Divider,
  Form,
  Image,
  Input,
  Popover,
  Radio,
  Row,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataParams } from "~/interfaces/gioHang.type";
import { DataType } from "~/interfaces/loaiDe.type";
import { formatGiaTien } from "~/utils/formatResponse";
import request from "~/utils/request";
const { Title, Text } = Typography;
const detailSanPham: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [dataSanPham, setDataSanPham] = useState<any[]>([]);
  const [dataMauSac, setDataMauSac] = useState<DataType[]>([]);
  const [dataKichCo, setDataKichCo] = useState<any[]>([]);
  const [dataLoaiDe, setDataLoaiDe] = useState<DataType[]>([]);
  const [dataDHS, setDataDHS] = useState<any[]>([]);
  const [dataHinhAnh, setDataHinhAnh] = useState<any[]>([]);
  const [titleMauSac, setTitleMauSac] = useState("");
  const [titleKichCo, setTitleKichCo] = useState("");
  const [idMauSac, setIdMauSac] = useState(null);
  const [anhDaiDien, setAnhDaiDien] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [giaTienMin, setGiaTienMin] = useState(0);
  const [giaTienMax, setGiaTienMax] = useState(0);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm, mặc định là 1
  const [form] = Form.useForm();
  const { id } = useParams();
  const [selecteds, setSelecteds] = useState<DataParams>({});
  // Hàm xử lý khi bấm nút cộng
  const handleIncrement = () => {
    if (quantity < totalQuantity) {
      setQuantity(quantity + 1);
    }
  };

  // Hàm xử lý khi bấm nút trừ
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const fetchDataMS = async () => {
    try {
      const res = await request.get("/mau-sac/detail/" + id);
      setDataMauSac(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataSize = async () => {
    try {
      const res = await request.get("/kich-co/detail/" + id);
      setDataKichCo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataLoaiDe = async () => {
    try {
      const res = await request.get("/loai-de/detail/" + id);
      setDataLoaiDe(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataDHS = async () => {
    try {
      const res = await request.get("/dia-hinh-san/detail/" + id);
      setDataDHS(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  localStorage.setItem("gioHang", "1");

  const sanPham = async () => {
    try {
      const res = await request.get("/san-pham/" + id);
      setDataSanPham(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const hinhAnh = async () => {
    try {
      const res = await request.get("hinh-anh-san-pham", {
        params: {
          idSanPham: id,
          idMauSac: idMauSac,
        },
      });
      setDataHinhAnh(res.data);
      setAnhDaiDien(res.data[0].duongDan);
    } catch (error) {
      console.log(error);
    }
  };
  const sanPhamChiTiet = async () => {
    try {
      const res = await request.get("/chi-tiet-san-pham/" + id, {
        params: {
          idMauSac: selecteds.idMauSac,
          idKichCo: selecteds.idKichCo,
          idLoaiDe: selecteds.idLoaiDe,
          idDiaHinhSan: selecteds.idDiaHinhSan,
        },
      });
      const sanPhamList = res.data;
      setData(sanPhamList);

      const giaTienMin = sanPhamList.reduce((min, sanPham) => {
        return sanPham.giaTien < min ? sanPham.giaTien : min;
      }, sanPhamList[0].giaTien);

      const giaTienMax = sanPhamList.reduce((max, sanPham) => {
        return sanPham.giaTien > max ? sanPham.giaTien : max;
      }, sanPhamList[0].giaTien);

      setGiaTienMin(giaTienMin);
      setGiaTienMax(giaTienMax);
    } catch (error) {
      console.log(error);
    }
  };
  const totalQuantity = data.reduce((total, item) => total + item.soLuong, 0);

  const onFinish = async (values: any) => {
    try {
      const productResponse = await request.get(
        "/chi-tiet-san-pham/get-one/" + id,
        {
          params: {
            idMauSac: values.mauSac,
            idKichCo: values.kichCo,
            idDiaHinhSan: values.diaHinhSan,
            idLoaiDe: values.loaiDe,
          },
        }
      );
      if (productResponse.data) {
        await request.post("/gio-hang-chi-tiet", {
          gioHang: { id: 1 },
          soLuong: quantity, // Số lượng
          chiTietSanPham: { id: productResponse.data.id },
        });
        message.success("Thêm sản phẩm vào giỏ hàng thành công");
        navigate("/gio-hang");
      }
    } catch (error) {
      message.error("Thêm sản phẩm vào giỏ hàng thất bại");
      console.log(error);
    }
  };

  const handleMauSac = (event) => {
    setIdMauSac(event.id !== idMauSac ? event.id : null);

    setTitleMauSac(event.ten);
    setQuantity(1);
    setSelecteds({
      ...selecteds,
      idMauSac: event.id,
    });
  };
  const handleKichCo = (event) => {
    setTitleKichCo(event.kichCo);
    setQuantity(1);
    setSelecteds({
      ...selecteds,
      idKichCo: event.id,
    });
  };
  const [selectedValue, setSelectedValue] = useState(null);
  const handleLoaiDe = (e) => {
    setQuantity(1);
    const value = e.target.value;
    setSelectedValue((prevValue) => (prevValue === value ? null : value));
  };

  const handleDiaHinhSan = (event) => {
    setQuantity(1);
    const selectedValue = event.target.value;

    setSelecteds({
      ...selecteds,
      idDiaHinhSan: selectedValue,
    });
  };

  useEffect(() => {
    hinhAnh();
    sanPham();
    sanPhamChiTiet();
    fetchDataMS();
    fetchDataLoaiDe();
    fetchDataSize();
    fetchDataDHS();
  }, [selecteds]);
  const onChangeHinhAnh = (event) => {
    const selectedImageIndex = dataHinhAnh.findIndex(
      (image) => image.id === event.id
    );

    setAnhDaiDien(event.duongDan);
    setSelectedImageIndex(selectedImageIndex);
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % dataHinhAnh.length;
    setSelectedImageIndex(nextIndex);
    onChangeHinhAnh(dataHinhAnh[nextIndex]);
  };

  // Function to handle the previous image
  const handlePrevImage = () => {
    const prevIndex =
      (selectedImageIndex - 1 + dataHinhAnh.length) % dataHinhAnh.length;
    setSelectedImageIndex(prevIndex);
    onChangeHinhAnh(dataHinhAnh[prevIndex]);
  };

  return (
    <>
      <Row style={{ marginTop: 40 }}>
        <Col span={2}></Col>
        <Col span={9}>
          <div style={{ position: "relative", width: "100%" }}>
            <Image
              preview={false}
              width={500}
              height={500}
              fallback="http://localhost:8080/admin/api/file/view/fallback.jpg"
              src={`http://localhost:8080/admin/api/file/view/${anhDaiDien}`}
            />
            <Button
              type="default"
              shape="circle"
              style={{ position: "absolute", top: 250, left: 10 }}
              onClick={handlePrevImage}
            >
              <LeftOutlined />
            </Button>
            <Button
              shape="circle"
              style={{ position: "absolute", top: 250, right: 75 }}
              onClick={handleNextImage}
            >
              <RightOutlined />
            </Button>
          </div>
          {dataHinhAnh.length > 0 && (
            <Radio.Group
              buttonStyle="solid"
              defaultValue={dataHinhAnh[selectedImageIndex]?.id}
              value={dataHinhAnh[selectedImageIndex]?.id}
            >
              <Row gutter={[15, 15]}>
                {dataHinhAnh.map((record) => (
                  <Col key={record.id}>
                    <Radio.Button
                      value={record.id}
                      style={{ margin: 0, padding: 0, height: 61 }}
                      onClick={() => onChangeHinhAnh(record)}
                    >
                      <Image
                        preview={false}
                        width={60}
                        height={60}
                        fallback="http://localhost:8080/admin/api/file/view/fallback.jpg"
                        src={`http://localhost:8080/admin/api/file/view/${record.duongDan}`}
                      />
                    </Radio.Button>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          )}
        </Col>
        <Col span={10}>
          <Title level={3} style={{ margin: 0 }}>
            {dataSanPham.ten}
          </Title>
          <Divider style={{ margin: 5, padding: 0 }} />
          <Title level={3} style={{ color: "red", margin: 10 }}>
            {giaTienMin === giaTienMax
              ? `${formatGiaTien(giaTienMax)}`
              : `${formatGiaTien(giaTienMin)} - ${formatGiaTien(giaTienMax)}`}
          </Title>
          <Space direction="vertical">
            <Text>Thông tin sản phẩm</Text>
            <Text> - Mã sản phẩm: {dataSanPham.ma}</Text>
            <Text>
              - Nhà cung cấp:{" "}
              {dataSanPham.thuongHieu && dataSanPham.thuongHieu.ten}
            </Text>
          </Space>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="mauSac"
              label={` - Màu sắc: ${titleMauSac}`}
              style={{ margin: 0 }}
            >
              <Radio.Group buttonStyle="solid" value={idMauSac}>
                <Row gutter={[15, 15]}>
                  {dataMauSac.map((record: any) => (
                    <Tooltip title={record.ten}>
                      <Col key={record.id}>
                        <Radio.Button
                          onClick={() => handleMauSac(record)}
                          value={record.id}
                          style={{ margin: 0, padding: 0, border: "0" }}
                        >
                          <ColorPicker
                            value={record.ma}
                            size="middle"
                            disabled
                          />
                        </Radio.Button>
                      </Col>
                    </Tooltip>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="kichCo"
              label={`- Kich cỡ: ${titleKichCo}`}
              style={{ margin: 0 }}
            >
              <Radio.Group buttonStyle="solid">
                <Row gutter={[15, 15]}>
                  {dataKichCo.map((record: any) => (
                    <Col key={record.id}>
                      <Radio.Button
                        onChange={() => handleKichCo(record)}
                        value={record.id}
                      >
                        {record.kichCo}
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Loại đế"
              name="loaiDe"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại đế!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid" onChange={handleLoaiDe}>
                <Row gutter={[15, 15]}>
                  {dataLoaiDe.map((record) => (
                    <Col key={record.id}>
                      <Radio.Button
                        value={record.id}
                        disabled={
                          !data.some((item) => item.loaiDe.id === record.id)
                        }
                        checked={record.id === selectedValue} // Đánh dấu radio button đã chọn
                      >
                        {record.ten}
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Địa hình sân"
              name="diaHinhSan"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn địa hình sân!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid" onChange={handleDiaHinhSan}>
                <Row gutter={[15, 15]}>
                  {dataDHS.map((record: any) => (
                    <Col key={record.id}>
                      <Radio.Button
                        value={record.id}
                        disabled={
                          !data.some((item) => item.diaHinhSan.id === record.id)
                        }
                      >
                        {record.ten}
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Số lượng">
              <Space>
                <Space.Compact block>
                  <Button icon={<MinusOutlined />} onClick={handleDecrement} />
                  <Input
                    style={{ textAlign: "center", width: 40 }}
                    value={quantity}
                    readOnly
                  />
                  <Button icon={<PlusOutlined />} onClick={handleIncrement} />
                </Space.Compact>
                <Text style={{ color: "red" }}>
                  {totalQuantity} sản phẩm có sẵn
                </Text>
              </Space>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" danger htmlType="reset">
                  MUA NGAY
                </Button>
                <Button
                  type="primary"
                  style={{ background: "#b5bdbd" }}
                  danger
                  htmlType="submit"
                >
                  THÊM VÀO GIỎ HÀNG
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default detailSanPham;
