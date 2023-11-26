import React, { useState } from "react";
import { Layout, Button , message, Select, } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {requestDangNhap, requestLogout} from "~/utils/request";
import { Link, useNavigate } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";


const CustomHeader: React.FC<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  colorBgContainer: string;
}> = ({ collapsed, setCollapsed, colorBgContainer }) => {
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   const response123 = await requestLogout.post("/logout");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("email");
  //   navigate("/sign-in");
  //   message.success("Đăng xuất thành công");
  // }
  const { Option } = Select;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response123 = await requestLogout.post("/logout");
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
  const [sanPhamOpen, setSanPhamOpen] = useState(false);
  const showSanPhamModal = () => {
    setSanPhamOpen(true);
  };

  const userEmail = localStorage.getItem("email");
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
      {/* <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
                  <Button
  onClick={handleLogout}
  
  type="primary"
  htmlType="submit"
>
<FaDoorOpen />
</Button> */}

<Select
        defaultValue={userEmail}
        style={{ width: 150, marginLeft: 1050 }}
        onChange={(value) => {
          // Check if the selected value is "logout" and call handleLogout
          if (value === "logout") {
            handleLogout();
          } else if(value==="thongTin"){
            showSanPhamModal();
          }
        }}
      >
        <Option value={userEmail} disabled>
          {userEmail}
        </Option>
        <Option value="thongTin">Thông tin</Option>
        <Option value="logout">Logout</Option>
      </Select>

      {/* <HoaDonChiTietComponent
        isModalVisible={sanPhamOpen}
        setIsModalVisible={setSanPhamOpen}
        idHoaDon={Number(id)}
        loadData={fetchHoaDonData}
      /> */}
    </Layout.Header>
    

  );
};

export default CustomHeader;
