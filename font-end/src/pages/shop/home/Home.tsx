import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Divider, Row, Typography, message } from "antd";
import banner1 from "~/image/banner1.jpg";
import banner2 from "~/image/banner2.jpg";
import banner3 from "~/image/banner3.jpg";
import banner4 from "~/image/banner4.jpg";
import nike from "~/image/brand-nike.jpg";
import adidas from "~/image/brand-adidas.jpg";
import puma from "~/image/brand-puma.jpg";
import mizuno from "~/image/brand-mizuno.jpg";
import asics from "~/image/brand-asics.webp";
import kamito from "~/image/brand-kamito.webp";
import grandsport from "~/image/brand-grandsport.webp";
import xmunich from "~/image/brand-xmunich.webp";
import joma from "~/image/brand-joma.jpg";
import santunhien from "~/image/san-co-tu-nhien.jpg";
import sannhantao from "~/image/san-co-nhan-tao.jpg";
import sanfutsal from "~/image/san-futsal.jpg";
import sancat from "~/image/san-cat.jpg";
import { Link } from "react-router-dom";
import request from "~/utils/request";
import { formatGiaTien } from "~/utils/formatResponse";

const { Title } = Typography;
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
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        SẢN PHẨM MỚI NHẤT
      </Divider>
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
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        SẢN PHẨM BÁN CHẠY
      </Divider>
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
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        THƯƠNG HIỆU NỔI TIẾNG
      </Divider>
      <Row>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="">
            <img src={nike} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG NIKE </span>
          </a>
        </Col>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="">
            <img src={adidas} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG ADIDAS </span>
          </a>
        </Col>
        <Col span={7}>
          <a href="">
            <img src={puma} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG PUMA </span>
          </a>
        </Col>
      </Row>
      {/* // Dòng 2 */}
      <Row style={{ marginTop: 30 }}>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="">
            <img src={mizuno} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG MIZUNO </span>
          </a>
        </Col>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="">
            <img src={asics} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG ASICS </span>
          </a>
        </Col>
        <Col span={7}>
          <a href="">
            <img src={kamito} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG KAMITO </span>
          </a>
        </Col>
      </Row>
      {/* // Dòng 3 */}
      <Row style={{ marginTop: 30 }}>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="">
            <img src={grandsport} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG GRANDSPORT </span>
          </a>
        </Col>
        <Col span={7} style={{ marginRight: 85 }}>
          <a href="">
            <img src={xmunich} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG X MUNICH </span>
          </a>
        </Col>
        <Col span={7}>
          <a href="">
            <img src={joma} alt="" width={"100%"} />
            <span style={{ color: "orange" }}>GIÀY ĐÁ BÓNG JOMA </span>
          </a>
        </Col>
      </Row>
      {/* ĐỊA HÌNH SÂN */}
      <Divider style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
        CHỌN GIÀY THEO ĐỊA HÌNH SÂN
      </Divider>
      <Row style={{ marginTop: 30 }}>
        <Col span={5} style={{ marginRight: 75 }}>
          <a href="">
            <img src={santunhien} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "orange" }}>SÂN CỎ TỰ NHIÊN </span>
          </a>
        </Col>
        <Col span={5} style={{ marginRight: 75 }}>
          <a href="">
            <img src={sannhantao} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "orange" }}>SÂN CỎ NHÂN TẠO </span>
          </a>
        </Col>
        <Col span={5} style={{ marginRight: 75 }}>
          <a href="">
            <img src={sanfutsal} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "orange" }}>SÂN FUTSAL </span>
          </a>
        </Col>
        <Col span={5}>
          <a href="">
            <img src={sancat} alt="" width={"100%"} height={"300px"} />
            <span style={{ color: "orange" }}>SÂN CÁT </span>
          </a>
        </Col>
      </Row>
    </>
  );
};

export default Home;
