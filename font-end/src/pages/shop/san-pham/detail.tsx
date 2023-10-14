import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataParams } from "~/interfaces/gioHang.type";
import { DataType } from "~/interfaces/loaiDe.type";
import request from "~/utils/request";
const { Title, Text } = Typography;
const detailSanPham: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [dataKichCo, setDataKichCo] = useState<any[]>([]);
  const [dataLoaiDe, setDataLoaiDe] = useState<DataType[]>([]);
  const [dataDHS, setDataDHS] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm, mặc định là 1
  const [product, setProduct] = useState([]);
  const [cartID, setCartID] = useState(null);
  const { id } = useParams();
  const [selecteds, setSelecteds] = useState<DataParams>({});
  // Hàm xử lý khi bấm nút cộng
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Hàm xử lý khi bấm nút trừ
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const fetchDataMS = async () => {
    try {
      const res = await request.get("mau-sac");
      // setDataMauSac(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataSize = async () => {
    try {
      const res = await request.get("kich-co");
      setDataKichCo(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataLoaiDe = async () => {
    try {
      const res = await request.get("loai-de");
      setDataLoaiDe(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataDHS = async () => {
    try {
      const res = await request.get("dia-hinh-san");
      setDataDHS(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  localStorage.setItem("gioHang", "1");

  const sanPham = async () => {
    try {
      const res = await request.get("/chi-tiet-san-pham/" + id, {
        params: {
          idMauSac: selecteds.idMauSac,
          idKichCo: selecteds.idKichCo,
          idLoaiDe: selecteds.idLoaiDe,
          idDiaHinhSan: selecteds.idDiaHinhSan,
        },
      });
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    sanPham();
  }, [selecteds]);

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
          gioHang: { id: id },
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

  const uniqueColors = new Set();
  const uniqueSizes = new Set();
  data.forEach((record) => {
    uniqueColors.add(record.mauSac.id);
    uniqueSizes.add(record.kichCo.kichCo);
  });

  const handleMauSac = (event) => {
    const selectedValue = event.target.value;
    setSelecteds({
      ...selecteds,
      idMauSac: selectedValue,
    });
  };
  const handleKichCo = (event) => {
    const selectedValue = event.target.value;
    setSelecteds({
      ...selecteds,
      idKichCo: selectedValue,
    });
  };
  const handleLoaiDe = (event) => {
    const selectedValue = event.target.value;
    setSelecteds({
      ...selecteds,
      idLoaiDe: selectedValue,
    });
  };
  const handleDiaHinhSan = (event) => {
    const selectedValue = event.target.value;
    setSelecteds({
      ...selecteds,
      idDiaHinhSan: selectedValue,
    });
  };
  return (
    <>
      <Row>
        <Col span={2}></Col>
        <Col span={6}>
          <Image
            width={400}
            height={400}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col span={2}></Col>
        <Col span={10}>
          <Title level={5}>MIZUNO MORELIA NEO IV PRO TF AURUM</Title>
          <Title level={4} style={{ color: "red" }}>
            100.000đ
          </Title>
          <Text>Nhà cung cấp: MIZUNO</Text>
          <br />
          <Text>SKU: P1GD233450-39</Text>
          <Title level={4} style={{ color: "red" }}>
            CAM KẾT SẢN PHẨM CHÍNH HÃNG 100%. ĐƯỢC BỒI HOÀN GẤP 10 LẦN NẾU KHÔNG
            PHẢI CHÍNH HÃNG
          </Title>
          <Form
            // form={form}
            onFinish={onFinish}
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="mauSac"
              label="Màu sắc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn màu sắc!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid" onChange={handleMauSac}>
                <Row gutter={[15, 15]}>
                  {data.map((record: any) => (
                    <Col key={record.mauSac.id}>
                      <Radio.Button value={record.mauSac.id}>
                        <Space>
                          <ColorPicker
                            value={record.mauSac.ma}
                            size="small"
                            disabled
                            style={{ marginTop: 3 }}
                          />
                          <span>{record.mauSac.ten}</span>
                        </Space>
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="kichCo"
              label="Kích cỡ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kích cỡ!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid" onChange={handleKichCo}>
                <Row gutter={[15, 15]}>
                  {data.map((size: any) => (
                    <Col key={size.kichCo.id}>
                      <Radio.Button value={size.kichCo.id}>
                        {size.kichCo.kichCo}
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
                  {data.map((ld) => (
                    <Col key={ld.loaiDe.id}>
                      <Radio.Button value={ld.loaiDe.id}>
                        {ld.loaiDe.ten}
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
                  {data.map((record) => (
                    <Col key={record.diaHinhSan.id}>
                      <Radio.Button value={record.diaHinhSan.id}>
                        {record.diaHinhSan.ten}
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Số lượng">
              <Space.Compact block>
                <Button icon={<MinusOutlined />} onClick={handleDecrement} />
                <Input
                  style={{ textAlign: "center", width: 40 }}
                  value={quantity}
                  readOnly
                />
                <Button icon={<PlusOutlined />} onClick={handleIncrement} />
              </Space.Compact>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" danger htmlType="submit">
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
