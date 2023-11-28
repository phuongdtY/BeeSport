import React, { useEffect, useState } from "react";
import { Badge, Button, Menu, Select, message, theme,Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import logo from "~/image/logo.jpg";
import request, { requestLogout } from "~/utils/request";
import { max } from "moment";

type MenuItem = Required<MenuProps>["items"][number];
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const Header: React.FC = () => {
  const [count, setCount] = useState<number | undefined>();
  const id = localStorage.getItem("gioHang");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get(
          "/gio-hang-chi-tiet/detail-gio-hang/" + id
        );
        setCount(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response123 = await requestLogout.post("/logout");
      console.log(response123.data)
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("roleId");
      
      navigate("/sign-in");
      message.success("Đăng xuất thành công");
    } catch (error) {
      console.error("Error during logout:", error);
      message.error("Có lỗi xảy ra khi đăng xuất.");
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem(<Link to="/">Trang chủ</Link>, "1"),
    getItem(<Link to="/san-pham">Sản phẩm</Link>, "2"),
    getItem(<Link to="/admin">Về chúng tôi</Link>, "3"),
    getItem(<Link to="/admin"></Link>, "4"),
  ];
  const userEmail = localStorage.getItem("email");
  const { Option } = Select;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const handleOk = () => {
    // Handle any logic you need when the OK button is clicked
    setModalVisible(false);
  };
  const handleCancel = () => {
    // Handle any logic you need when the Cancel button is clicked or modal is closed
    setModalVisible(false);
  };
  return (
    <header
      style={{
        background: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo">
        <img
          src={logo}
          alt=""
          style={{ marginLeft: 10, paddingTop: 5 }}
          width={"150px"}
          height={"60px"}
        />
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      {userEmail ? (
        <Select
        defaultValue={userEmail}
        style={{ width: 150, marginLeft: 700 }}
        onChange={(value) => {
          // Check if the selected value is "logout" and call handleLogout
          if (value === "logout") {
            handleLogout();
          } else if(value === "thongtin"){
            showModal();
          }
        }}
      >
        <Option value={userEmail} disabled>
          {userEmail}
        </Option>
        <Option value="thongtin">
          Thông tin
        </Option>
        <Option value="logout">Logout</Option>
      </Select>
      ) : (
      <Link
        style={{ marginLeft: "850px" }}
        to="/sign-in"
        className="btn-sign-in"
      >
        <UserOutlined
          style={{ fontSize: "22px", color: "black", marginRight: 10 }}
        />
      </Link>
      )}
      <Link to="/gio-hang">
        <Badge count={count}>
          <ShoppingCartOutlined style={{ fontSize: "25px" }} />
        </Badge>
      </Link>
    </header>
  );
};

export default Header;
