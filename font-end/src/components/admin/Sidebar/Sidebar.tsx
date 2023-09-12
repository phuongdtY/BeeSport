import React from "react";
import { Link } from "react-router-dom";
import { Divider, Layout, Menu } from "antd";
import {
  ContainerOutlined,
  TeamOutlined,
  ShopOutlined,
  HomeOutlined,
  GiftOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import logo from "~/image/logo.png";
import type { MenuProps } from "antd";

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

const CustomSider: React.FC<{
  collapsed: boolean;
  colorBgContainer: string;
}> = ({ collapsed, colorBgContainer }) => {
  const items: MenuItem[] = [
    getItem(<Link to="/admin">Trang chủ</Link>, "1", <HomeOutlined />),
    getItem(
      <Link to="/admin/ban-hang">Bán hàng tại quầy</Link>,
      "2",
      <ShopOutlined />
    ),
    getItem(
      <Link to="/admin/don-hang">Quản lý đơn hàng</Link>,
      "3",
      <ContainerOutlined />
    ),

    getItem("Quản lý sản phẩm", "sub1", <AppstoreAddOutlined />, [
      getItem(<Link to="/admin/san-pham">Sản phẩm</Link>, "5"),
      getItem("Thuộc tính", "sub1-2", null, [
        getItem(<Link to="/admin/ten-san-pham">Tên sản phẩm</Link>, "6"),
        getItem(<Link to="/admin/thuong-hieu">Thương hiệu</Link>, "7"),
        getItem(<Link to="/admin/loai-de">Loại đế</Link>, "8"),
        getItem(<Link to="/admin/dia-hinh-san">Địa hình sân</Link>, "9"),
        getItem(<Link to="/admin/mau-sac">Màu sắc</Link>, "10"),
      ]),
    ]),

    getItem("Quản lý tài khoản", "sub2", <TeamOutlined />, [
      getItem(<Link to="/admin/khach-hang">Khách hàng</Link>, "11"),
      getItem(<Link to="/admin/nhan-vien">Nhân viên</Link>, "12"),
    ]),
    getItem(
      <Link to="/admin/voucher">Quản lý voucher</Link>,
      "13",
      <GiftOutlined />
    ),
  ];

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        background: colorBgContainer,
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        zIndex: 2,
      }}
    >
      <div className="demo-logo-vertical">
        <img src={logo} alt="" width={"100%"} height={"100%"} />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ background: colorBgContainer }}
      />
    </Layout.Sider>
  );
};

export default CustomSider;
