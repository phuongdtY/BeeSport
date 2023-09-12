import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const CustomHeader: React.FC<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  colorBgContainer: string;
}> = ({ collapsed, setCollapsed, colorBgContainer }) => {
  return (
    <Layout.Header
      style={{
        padding: 0,
        top: 0,
        background: colorBgContainer, // Sử dụng giá trị colorBgContainer từ props
        position: "fixed",
        width: "100%",
        zIndex: 1,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Layout.Header>
  );
};

export default CustomHeader;
