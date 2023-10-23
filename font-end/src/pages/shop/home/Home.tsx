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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await request.get("/san-pham/gia-tien-moi-nhat");
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu địa hình sân thất bại");
      }
    };
    fetchProduct();
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
        {products.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: 267 }}>
              <img
                style={{ padding: 30, height: 240 }}
                alt="example"
                src="https://product.hstatic.net/1000061481/product/anh_sp_add_web_ballak02-01-01-01-01_4c838d0badfb4548a229c88407fb6c2f_1024x1024.jpg"
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
    </>
  );
};

export default Home;
