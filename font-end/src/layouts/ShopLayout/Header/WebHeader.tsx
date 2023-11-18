import React, { useEffect, useState } from "react";
import { Badge, Menu, MenuProps, theme } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import logo from "~/image/logo.jpg";
import request from "~/utils/request";

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem(<Link to="/">Trang chủ</Link>, "1"),
    getItem(<Link to="/san-pham">Sản phẩm</Link>, "2"),
    getItem(<Link to="/admin">Về chúng tôi</Link>, "3"),
    getItem(<Link to="/admin"></Link>, "4"),
  ];

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
<<<<<<< HEAD
          style={{ paddingTop: 5 }}
          src={logo}
          alt=""
          width={"180px"}
          height={"70px"}
=======
          src={logo}
          alt=""
          style={{ marginLeft: 10, paddingTop: 5 }}
          width={"150px"}
          height={"60px"}
>>>>>>> origin/canh
        />
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <Link
        style={{ marginLeft: "850px" }}
        to="/sign-in"
        className="btn-sign-in"
      >
        <UserOutlined
          style={{ fontSize: "22px", color: "black", marginRight: 10 }}
        />
      </Link>
      <Link to="/gio-hang">
        <Badge count={count}>
          <ShoppingCartOutlined style={{ fontSize: "25px" }} />
        </Badge>
      </Link>
    </header>
  );
};

export default Header;
