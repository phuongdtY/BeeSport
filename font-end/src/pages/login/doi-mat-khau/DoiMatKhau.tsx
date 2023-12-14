import { ExclamationCircleFilled, LockOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  message,
} from "antd";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoiMatKhauRequest } from "~/interfaces/taiKhoan.type";
import { requestDoiMK }  from "~/utils/requestDoiMK";
const { confirm } = Modal;
const add: React.FC = () => {
    const doiMK = localStorage.getItem("acountId");
    const roleId = localStorage.getItem("roleId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(doiMK)
  const onFinish = (values: DoiMatKhauRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn đổi mật khẩu không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setLoading(true);
          await requestDoiMK.post("/doi-mat-khau", {
            id:doiMK,
            matKhauCu: values.matKhauCu,
            matKhauMoi: values.matKhauMoi,
            nhapLaiMatKhau: values.nhapLaiMatKhau
          });
          setLoading(false);
          message.success("Đổi mật khẩu thành công");
          if(roleId==="3"){
          navigate("/");
        }else{
            navigate("/admin")
        }
        } catch (error: any) {
            console.log("Error:", error);
            console.log("A123"+error.response.data.message)
            if (error.response && error.response.status === 403) {
              message.error("Mật khẩu cũ không đúng.");
            } else if (error.response && error.response.data) {
              message.error(error.response.data.message);
            } else {
              message.error("Có lỗi xảy ra khi đổi mật khẩu.");
            }
          } finally {
            setLoading(false);
          }
      },
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card title="ĐỔI MẬT KHẨU">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          layout="horizontal"
        >
          <Form.Item
                name="matKhauCu"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa điền mật khẩu cũ!",
                  },
                ]}
                style={{ width: "500px" }} // Đặt chiều rộng 100%
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu cũ"
                />
              </Form.Item>
              <Form.Item
                name="matKhauMoi"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa điền mật khẩu mới!",
                  },
                ]}
                style={{ width: "500px" }} // Đặt chiều rộng 100%
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu mới"
                />
              </Form.Item>
              <Form.Item
            name="nhapLaiMatKhau"
            dependencies={['matKhauMoi']}
            rules={[
              {
                required: true,
                message: "Bạn chưa điền mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("matKhauMoi") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu nhập lại không trùng khớp!"));
                },
              }),
            ]}
            style={{ width: "500px" }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7 }}>
            <Space>
              <Button type="dashed" htmlType="reset">
                Reset
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Xác nhận
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default add;