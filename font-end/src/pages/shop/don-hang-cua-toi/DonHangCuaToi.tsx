import React from "react";
import { Badge, Col, Row, Space, Tabs } from "antd";
import type { TabsProps } from "antd";
import DonHangChiTiet from "./DonHangChiTiet";
import { CiViewList } from "react-icons/ci";
import {
  MdOutlineChecklist,
  MdOutlineLocalShipping,
  MdOutlinePlaylistRemove,
} from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "",
    label: (
      <Space>
        <CiViewList style={{ marginTop: 6 }} />
        <Badge count={5}>
          <span style={{ paddingRight: 15 }}>Tất cả</span>
        </Badge>
      </Space>
    ),
    children: <DonHangChiTiet currentKey={""} />,
  },
  {
    key: "PENDING",
    label: (
      <Space>
        <MdOutlineChecklist style={{ marginTop: 6 }} />
        <span>Chờ xác nhận</span>
      </Space>
    ),
    children: <DonHangChiTiet currentKey={"PENDING"} />,
  },
  {
    key: "PICKUP",
    label: (
      <Space>
        <BsBoxSeam style={{ marginTop: 6 }} />
        <span>Chờ lấy hàng</span>
      </Space>
    ),
    children: <DonHangChiTiet currentKey={"PICKUP"} />,
  },
  {
    key: "SHIPPING",
    label: (
      <Space>
        <MdOutlineLocalShipping style={{ marginTop: 6 }} />
        <span>Đang giao hàng</span>
      </Space>
    ),
    children: <DonHangChiTiet currentKey={"SHIPPING"} />,
  },
  {
    key: "APPROVED",
    label: (
      <Space>
        <GoChecklist style={{ marginTop: 6 }} />
        <span>Đã giao</span>
      </Space>
    ),
    children: <DonHangChiTiet currentKey={"APPROVED"} />,
  },
  {
    key: "CANCELLED",
    label: (
      <Space>
        <MdOutlinePlaylistRemove style={{ marginTop: 6 }} />
        <span>Đã hủy</span>
      </Space>
    ),
    children: <DonHangChiTiet currentKey={"CANCELLED"} />,
  },
];

const DonHangCuaToi: React.FC = () => (
  <>
    <Row>
      <Col span={5}></Col>
      <Col span={14}>
        <Tabs
          defaultActiveKey=""
          items={items}
          onChange={onChange}
          tabBarGutter={65} // Thiết lập khoảng cách giữa các tab
        />
      </Col>
      <Col span={5}></Col>
    </Row>
  </>
);

export default DonHangCuaToi;
