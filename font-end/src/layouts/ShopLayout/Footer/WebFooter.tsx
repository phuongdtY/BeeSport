import React from "react";
import { Col, Layout, Row, Space } from "antd";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube, FiPhone } from "react-icons/fi";
import { RiFacebookBoxLine, RiTiktokLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { SiZalo } from "react-icons/si";
import logo from "~/image/logo.jpg";

export const WebFooter: React.FC = () => {
  return (
    <Layout.Footer
      style={{
        height: "15%",
        width: "100%",
        background: "#0099FF",
        zIndex: 1,
      }}
    >
      <Row>
        <Col span={6}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            VỀ CHÚNG TÔI
          </span>
          <br />
          <br />
          <Space>
            <a href="">
              <RiFacebookBoxLine style={{ fontSize: 30, color: "white" }} />
            </a>
            <a
              href="https://www.facebook.com/canhduong.281"
              style={{ color: "white" }}
            >
              https://www.facebook.com/canhduong.281
            </a>
          </Space>
          <Space>
            <a href="">
              <FiYoutube style={{ fontSize: 30, color: "white" }} />
            </a>
            <a href="https://s.net.vn/8zDg" style={{ color: "white" }}>
              https://s.net.vn/8zDg
            </a>
          </Space>
          <Space>
            <a href="">
              <FaInstagram style={{ fontSize: 30, color: "white" }} />
            </a>
            <a
              href="https://www.threads.net/@canhdv281"
              style={{ color: "white" }}
            >
              https://www.threads.net/@canhdv281
            </a>
          </Space>
          <Space>
            <a href="">
              <RiTiktokLine style={{ fontSize: 30, color: "white" }} />
            </a>
            <a
              href="https://www.tiktok.com/@dcanh.deptraivodich"
              style={{ color: "white" }}
            >
              https://www.tiktok.com/@dcanh.deptraivodich
            </a>
          </Space>
        </Col>
        <Col span={6}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            THÔNG TIN
          </span>
          <br />
          <br />
          <Space direction="vertical">
            <a href="" style={{ color: "white", fontSize: 16 }}>
              Hướng dẫn mua hàng
            </a>
            <a href="" style={{ color: "white", fontSize: 16 }}>
              Chính sách thanh toán
            </a>
            <a href="" style={{ color: "white", fontSize: 16 }}>
              Chính sách giao nhận
            </a>
            <a href="" style={{ color: "white", fontSize: 16 }}>
              Chính sách bảo mật
            </a>
          </Space>
        </Col>
        <Col span={6}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            LIÊN HỆ
          </span>
          <br />
          <br />
          <Space>
            <CiLocationOn style={{ color: "white", fontSize: 20 }} />
            <span style={{ color: "white" }}>
              Trịnh Văn Bô - Nam Từ Liêm - Hà Nội
            </span>
          </Space>
          <br />
          <br />
          <Space>
            <FiPhone style={{ color: "white", fontSize: 20 }} />
            <span style={{ color: "white" }}>Hotline: 0346544561</span>
          </Space>
          <br />
          <br />

          <Space>
            <SiZalo style={{ color: "white", fontSize: 20 }} />
            <span style={{ color: "white" }}> 0346544561</span>
          </Space>
        </Col>
        <Col span={6}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            <img src={logo} alt="" width={"70%"} style={{ marginLeft: 30 }} />
            <br />
            <span style={{ marginLeft: 30 }}>Công ty cổ phần BEE GROUP</span>
          </span>
        </Col>
      </Row>
    </Layout.Footer>
  );
};
