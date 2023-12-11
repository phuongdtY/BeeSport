import { Card, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "~/image/logo.jpg";
import request from "~/utils/request";
const { Text, Title } = Typography;

const ThanhToanVNPay: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idGiaoDich = urlParams.get("idGiaoDich");
  useEffect(() => {
    updateGD();
    console.log(idGiaoDich);
  }, [idGiaoDich]);
  const updateGD = async () => {
    try {
      const res = await request.put(`giao-dich/${idGiaoDich}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <center>
      <Card
        style={{ width: 650 }}
        title={
          <center>
            <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg" />
          </center>
        }
      >
        <Title type="success" level={3}>
          Thành công
        </Title>
        <div style={{ background: "#dee2e6", width: 360 }}>
          <Text type="secondary">Mã tra cứu:</Text>
          <br />
          <Text type="secondary">Thời gian giao dịch:</Text>
        </div>
      </Card>
    </center>
  );
};

export default ThanhToanVNPay;
