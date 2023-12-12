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
      localStorage.removeItem("acountId");
      localStorage.removeItem("roleId");
      // localStorage.removeItem("idGioHang");
      
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

  const roleId = localStorage.getItem("roleId");
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
        defaultValue={roleId}
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
        {roleId === "1" && <Option value="1">Quản lý</Option>}
          {roleId === "2" && <Option value="2">Nhân viên</Option>}
          {roleId === "3" && <Option value="3">Khách hàng</Option>}
        <Option value="thongTin">Thông tin</Option>
        <Option value="doiMatKhau"><Link to={"/doi-mat-khau"}>Đổi mật khẩu</Link></Option>
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
