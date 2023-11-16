import React from "react";
import { Layout } from "antd";
import Header from "./Header/WebHeader.tsx";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

const ShopLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content style={{ background: "white" }}>
        <div style={{ margin: 50 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ShopLayout;
