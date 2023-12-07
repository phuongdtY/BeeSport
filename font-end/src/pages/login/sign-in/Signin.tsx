import {
  ExclamationCircleFilled,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Row, Col, message } from "antd";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DangNhapRequest } from "~/interfaces/taiKhoan.type";
import request, { requestDangNhap, requestLogout } from "~/utils/request";

const { confirm } = Modal;

const DangNhap: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Thêm state để lưu thông báo lỗi

  const onFinish = async (values: DangNhapRequest) => {
    try {
      const response = await requestDangNhap.post("/sign-in", values);
      const { refreshToken, roleId, acountId } = response.data; // Assuming your response contains accessToken and refreshToken
      localStorage.setItem("refreshToken", refreshToken); // Store the access token
      localStorage.setItem("roleId", roleId);
      localStorage.setItem("acountId", acountId);

      if (response.data.roleId === 1) {
        // localStorage.setItem("2","11")
        navigate("/admin");
      } else if (response.data.roleId === 2) {
        // localStorage.setItem("2","111111")
        navigate("/admin/ban-hang-tai-quay");
      } else if (response.data.roleId === 3) {
        try {
          const res = await request.get(`gio-hang/tai-khoan/${acountId}`);
          localStorage.setItem("cartIdTaiKhoan", res.data.id);
        } catch (error) {
          console.log(error);
        }
        navigate("/");
        window.location.reload();
      }
      message.success("Đăng nhập thành công");
    } catch (error: any) {
      console.log("Error:", error);
      console.log("A123" + error.response.data.message);
      if (error.response && error.response.status === 403) {
        message.error("Tài khoản hoặc mật khẩu không tồn tại.");
      } else if (error.response && error.response.data) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra khi đăng nhập.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Card title="Đăng nhập">
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          layout="horizontal"
        >
          <Form.Item
            name="sdt"
            rules={[
              {
                required: true,
                message: "Bạn chưa điền số điện thoại!",
              },
              {
                pattern: /^0[35789]\d{8}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
            style={{ width: "100%" }} // Đặt chiều rộng 100%
          >
            <Input prefix={<PhoneOutlined />} placeholder="Số Điện Thoại" />
          </Form.Item>
          <Form.Item
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Bạn chưa điền Mật khẩu!",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item style={{ width: 500 }}>
            <Row style={{ marginBottom: 10, height: 35 }}>
              <Col span={24}>
                <Button
                  style={{ height: "100%", width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Link to="/sign-up">
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Đăng ký
                  </Button>
                </Link>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Link to="/forgot-password">
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Quên mật khẩu?
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form.Item>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default DangNhap;
