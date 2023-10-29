import { Card, Tabs, TabsProps } from "antd";
import React from "react";
import TaiQuay from "~/components/admin/tai-quay/TaiQuay";

const BanHangTaiQuay: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tạo mới",
      children: <TaiQuay />,
    },
  ];

  return (
    <Card title="BÁN HÀNG TẠI QUẦY">
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default BanHangTaiQuay;
