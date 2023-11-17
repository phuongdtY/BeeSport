import {
  ExclamationCircleFilled,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Row,
  Col,
  message,
} from "antd";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DangNhapRequest } from "~/interfaces/taiKhoan.type";
import { useAuth } from "~/pages/admin/component/AuthContext";
import {requestDangNhap} from "~/utils/request";

const { confirm } = Modal;

const DangNhap: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Thêm state để lưu thông báo lỗi

  // const {login,isAuthenticated} = useAuth();
  
  const onFinish = async (values: DangNhapRequest) => {
    try {
      const response = await requestDangNhap.post("/sign-in", values);
      const { refreshToken } = response.data; // Assuming your response contains accessToken and refreshToken
      localStorage.setItem("refreshToken", refreshToken); // Store the access token
      console.log("AA  "+ response.data.refreshToken)
      
      // Make sure to handle refreshToken as needed (e.g., refresh it before it expires)
  
      navigate("/admin");
      message.success("Đăng nhập thành công");
    } catch (error: any) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
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
      <Card title="Log in">
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
            name="email"
            rules={[
              {
                required: true,
                message: "Bạn chưa điền E-mail!",
              },
              {
                type: "email",
                message: "E-mail không hợp lệ!",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input prefix={<MailOutlined />} placeholder="E-mail" />
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
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
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
                  Log in
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
                    Register
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
                    Forgot your password?
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form.Item>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error}
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default DangNhap;
