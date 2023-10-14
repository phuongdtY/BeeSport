import React, { useEffect, useState } from "react";
import { Badge, Layout, Menu, MenuProps, theme } from "antd";
import logo from "~/image/logo.png";
import { Link, Outlet } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import request from "~/utils/request";
const { Header, Content, Footer } = Layout;

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

const ShopLayout: React.FC = () => {
  const [count, setCount] = useState();
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
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem(<Link to="/">HOME</Link>, "1"),
    getItem(<Link to="/admin">SHOP</Link>, "2"),
    getItem(<Link to="/">CONTACT</Link>, "3"),
    getItem(<Link to="/">GROUP</Link>, "4"),
    getItem(<Link to="/">TIN TỨC</Link>, "5"),
  ];
  return (
    <Layout>
      <Header
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
          <img src={logo} alt="" width={"100px"} height={"30px"} />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
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
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default ShopLayout;
