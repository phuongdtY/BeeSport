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
  Space,
  message,
  Col,
} from "antd";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DataParams,
  DataType,
  Sorter,
  TableParams,
  DescriptionItemProps,
} from "~/interfaces/taiKhoan.type";
import request from "~/utils/request";
const { confirm } = Modal;
const dangNhap: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values: DataParams) => {};
  return (
    <>
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
              style={{ width: "100%" }} // Đặt chiều rộng 100%
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
              style={{ width: "100%" }} // Đặt chiều rộng 100%
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
                <Col span={12} style={{}}>
                  <Link to={"/sign-up"}>
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
                  <Link to={"/forgot-password"}>
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
          </Form>
        </Card>
      </div>
    </>
  );
};

export default dangNhap;
