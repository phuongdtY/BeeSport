import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Divider, Row, Typography, message } from "antd";
import banner1 from "~/image/banner1.jpg";
import banner2 from "~/image/banner2.jpg";
import banner3 from "~/image/banner3.jpg";
import banner4 from "~/image/banner4.jpg";
import { Link } from "react-router-dom";
import request from "~/utils/request";
import { formatGiaTien } from "~/utils/formatResponse";
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const { Title, Text } = Typography;
const { Meta } = Card;
const Home: React.FC = () => {
  const [sanPhamMoiNhat, setSanPhamMoiNhat] = useState([]);
  const [sanPhamBanChay, setSanPhamBanChay] = useState([]);
  useEffect(() => {
    // Call API sản phẩm mới nhất
    const fetchMoiNhat = async () => {
      try {
        const res = await request.get("/san-pham/gia-tien-moi-nhat");
        setSanPhamMoiNhat(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu địa hình sân thất bại");
      }
    };

    // Call API Sản phẩm bán chạy nhất

    const fetchBanChayNhat = async () => {
      try {
        const res = await request.get("/san-pham/ban-chay-nhat");
        setSanPhamBanChay(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu sản phẩm bán chạy nhất thất bại");
      }
    };

    fetchMoiNhat();
    fetchBanChayNhat();
  }, []);
  return (
    <>
      <Carousel autoplay>
        <div>
          <img src={banner1} width="100%" height="600px" />
        </div>
        <div>
          <img src={banner2} width="100%" height="600px" />
        </div>
        <div>
          <img src={banner3} width="100%" height="600px" />
        </div>
        <div>
          <img src={banner4} width="100%" height="600px" />
        </div>
      </Carousel>
      <Divider style={{ fontSize: 25 }}>SẢN PHẨM MỚI NHẤT</Divider>
      <Row gutter={16}>
        {sanPhamMoiNhat.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: 267 }}>
              <img
                style={{ padding: 30, height: 240 }}
                alt="example"
                src={`http://localhost:8080/admin/api/file/view/${product.duongDan}`}
              />
              <div style={{ textAlign: "left" }}>
                <Link
                  to={`/san-pham/detail/${product.id}`}
                  style={{ fontWeight: "bold", margin: 0 }}
                >
                  {product.ten}
                </Link>
                <Title level={5} style={{ color: "red", margin: 0 }}>
                  {product.giaMin === product.giaMax
                    ? `${formatGiaTien(product.giaMax)}`
                    : `${formatGiaTien(product.giaMin)} - ${formatGiaTien(
                        product.giaMax
                      )}`}
                </Title>
              </div>
              {/* Add your actions, such as Add to Cart and Buy Now buttons here */}
            </Card>
          </Col>
        ))}
      </Row>
      <Divider style={{ fontSize: 25 }}>SẢN PHẨM BÁN CHẠY</Divider>
      <Row gutter={16}>
        {sanPhamBanChay.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: 267 }}>
              <img
                style={{ padding: 30, height: 240 }}
                alt="example"
                src={`http://localhost:8080/admin/api/file/view/${product.duongDan}`}
              />
              <div style={{ textAlign: "left" }}>
                <Link
                  to={`/san-pham/detail/${product.id}`}
                  style={{ fontWeight: "bold", margin: 0 }}
                >
                  {product.ten}
                </Link>
                <Title level={5} style={{ color: "red", margin: 0 }}>
                  {product.giaMin === product.giaMax
                    ? `${formatGiaTien(product.giaMax)}`
                    : `${formatGiaTien(product.giaMin)} - ${formatGiaTien(
                        product.giaMax
                      )}`}
                </Title>
              </div>
              {/* Add your actions, such as Add to Cart and Buy Now buttons here */}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
