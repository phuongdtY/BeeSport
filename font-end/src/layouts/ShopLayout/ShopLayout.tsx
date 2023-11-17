import React from "react";
import { Layout } from "antd";
import Header from "./Header/WebHeader.tsx";
import { Outlet } from "react-router-dom";
import { WebFooter } from "./Footer/WebFooter.tsx";

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
      <WebFooter />
    </Layout>
  );
};

export default ShopLayout;
