import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Menu,
  Select,
  message,
  theme,
  Modal,
  MenuProps,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import logo from "~/image/logo.jpg";
import request, { requestLogout } from "~/utils/request";

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
  const idGioHangTaiKhoan = localStorage.getItem("cartIdTaiKhoan");
  const idGioHangNull = localStorage.getItem("cartId");
  const idTaiKhoan = localStorage.getItem("acountId");
  const currentPathname = window.location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get(
          `/gio-hang/${
            idGioHangTaiKhoan != null ? idGioHangTaiKhoan : idGioHangNull
          }`
        );
        console.log(res);
        setCount(res.data.gioHangChiTietList.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idGioHangTaiKhoan, idGioHangNull, currentPathname]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response123 = await requestLogout.post("/logout");
      console.log(response123.data);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("acountId");
      localStorage.removeItem("roleId");
      localStorage.removeItem("cartIdTaiKhoan");
      navigate("/");
      window.location.reload();
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
  ];

  const roleId = localStorage.getItem("roleId");
  const { Option } = Select;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
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
        style={{ width: 400 }}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      {roleId ? (
        <Select
          defaultValue={roleId}
          style={{ width: 150, marginLeft: 700 }}
          onChange={(value) => {
            if (value === "logout") {
              handleLogout();
            } else if (value === "thongtin") {
              showModal();
            }
          }}
        >
          {roleId === "1" && <Option value="1">Quản lý</Option>}
          {roleId === "2" && <Option value="2">Nhân viên</Option>}
          {roleId === "3" && <Option value="3">Khách hàng</Option>}
          <Option value="thongtin">Thông tin</Option>
          {idTaiKhoan != null ? (
            <Option value="donHang">
              <Link to={"/don-hang"}>Đơn hàng của tôi</Link>
            </Option>
          ) : null}
          <Option value="doiMatKhau">
            <Link to={"/doi-mat-khau"}>Đổi mật khẩu</Link>
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
