import {
  Badge,
  Button,
  Card,
  Empty,
  Image,
  Input,
  List,
  Modal,
  Progress,
  Radio,
  Space,
  Typography,
} from "antd";
import { red, green } from "@ant-design/colors";
import React, { useState, useEffect } from "react";
import request from "~/utils/request";
import VirtualList from "rc-virtual-list";
import { formatGiaTienVND } from "~/utils/formatResponse";
import { fetchData } from "~/api/apiNhanVien";
import dayjs from "dayjs";
const { Text } = Typography;
// other imports...

const KhoVoucher = ({ open, close, onOK, tongTien }) => {
  const [data, setData] = useState([]);
  const [idVoucher, setIdVoucher] = useState(null);

  const fetchData = async () => {
    try {
      const res = await request.get("voucher/list");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [open, close]);

  const phanTram = (item) => {
    if (item.soLuong !== null) {
      return Math.round((item.hoaDonList.length / item.soLuong) * 100);
    }
    return 0;
  };

  useEffect(() => {
    // Update the remaining time every second
    const intervalId = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          formattedRemainingTime: getFormattedRemainingTime(item),
        }))
      );
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  const getFormattedRemainingTime = (item) => {
    const now = new Date();
    const ngayBatDau = new Date(item.ngayBatDau);
    const ngayKetThuc = new Date(item.ngayKetThuc);

    const duration = ngayBatDau > now ? ngayBatDau - now : ngayKetThuc - now;

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    let formattedTime = "";

    if (days > 0) {
      formattedTime += `${days} ngày `;
    }
    if (hours > 0) {
      formattedTime += `${hours} giờ `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} phút `;
    }
    if (seconds > 0 || formattedTime === "") {
      formattedTime += `${seconds} giây`;
    }

    return formattedTime.trim(); // Remove leading/trailing spaces
  };

  const getFormattedStatus = (item) => {
    switch (item.trangThai.ten) {
      case "UPCOMING":
        return `Sắp diễn ra: ${getFormattedRemainingTime(item)}`;
      case "ONGOING":
        return `Hạn sử dụng: ${dayjs(item.ngayKetThuc).format("DD-MM-YYYY")}`;
      case "ENDING_SOON":
        return (
          <Text type="danger">
            Sắp hết hạn: {getFormattedRemainingTime(item)}
          </Text>
        );
      default:
        return item.trangThai.moTa;
    }
  };
  const conicColors = { "10%": "#87d068", "50%": "#ffe58f", "100%": "#FF0000" };
  const tinhGiamGia = async () => {
    try {
      const res = await request.get(`voucher/${idVoucher}`);

      if (res && res.data) {
        const { hinhThucGiam, giamToiDa, giaTriGiam } = res.data;

        if (hinhThucGiam.id === 1) {
          return giamToiDa;
        } else if (hinhThucGiam.id === 2) {
          const discountPercentage = giaTriGiam;
          const discountedAmount = (discountPercentage / 100) * tongTien;
          return Math.min(discountedAmount, giamToiDa);
        }
      }
    } catch (error) {
      console.log(error);
    }

    return 0;
  };

  return (
    <Modal
      title="Chọn BeeSport Voucher"
      style={{ top: 60 }}
      width={520}
      open={open}
      onOk={async () => {
        try {
          const giamGiam = await tinhGiamGia();
          onOK(idVoucher, giamGiam);
        } catch (error) {
          // Handle the error (e.g., show an error message)
          console.log(error);
        }
      }}
      onCancel={close}
    >
      <Space>
        <Input
          //   status={statusInput}
          size="large"
          placeholder="Nhập mã giảm giá"
          //   value={maVoucher}
          //   onChange={(value) => setMavoucher(value.target.value)}
          style={{ width: 370, borderRadius: 3 }}
        />
        <Button
          size="large"
          type="primary"
          style={{ borderRadius: 5 }}
          //   onClick={addVoucher}
        >
          Áp dụng
        </Button>
      </Space>
      {/* <Text type="danger">{errorInput}</Text> */}
      {data.length > 0 ? (
        <List>
          <Radio.Group defaultValue={idVoucher}>
            <VirtualList
              data={data}
              height={400}
              itemHeight={47}
              itemKey="email"
            >
              {(item) => (
                <List.Item key={item.ma}>
                  <Space direction="vertical" size="middle">
                    <Radio
                      value={item.ma}
                      onChange={() => setIdVoucher(item.id)}
                      disabled={
                        tongTien < item.donToiThieu || phanTram(item) == 100
                          ? true
                          : false
                      }
                    >
                      <Badge.Ribbon
                        text={item.ma}
                        color={
                          tongTien < item.donToiThieu || phanTram(item) == 100
                            ? "#00000073"
                            : "volcano"
                        }
                      >
                        <Card
                          title={item.ten}
                          size="small"
                          style={{ width: "440px" }}
                        >
                          <Space direction="vertical">
                            {item.hinhThucGiam.id == 1 ? (
                              <Text strong>
                                Giảm {formatGiaTienVND(item.giaTriGiam)}
                              </Text>
                            ) : (
                              <Text strong>Giảm {item.giaTriGiam}%</Text>
                            )}
                            <Space>
                              <Text>
                                Đơn Tối Thiểu{" "}
                                {formatGiaTienVND(item.donToiThieu)}
                              </Text>
                              {item.hinhThucGiam.id == 2 ? (
                                <Text>
                                  Giảm Tối Đa {formatGiaTienVND(item.giamToiDa)}
                                </Text>
                              ) : null}
                            </Space>

                            <Space
                              direction="vertical"
                              style={{ padding: 0, margin: 0 }}
                            >
                              {item.soLuong !== null ? (
                                <Progress
                                  style={{
                                    width: "380px",
                                    padding: 0,
                                    margin: 0,
                                  }}
                                  size={"small"}
                                  percent={phanTram(item)}
                                  strokeColor={conicColors}
                                  showInfo={false}
                                />
                              ) : null}
                              <Space>
                                <Text
                                  type="secondary"
                                  style={{ padding: 0, margin: 0 }}
                                >
                                  Đã dùng :{phanTram(item)}%,
                                </Text>
                                <Text>{getFormattedStatus(item)}</Text>
                              </Space>
                            </Space>
                          </Space>
                        </Card>
                      </Badge.Ribbon>
                    </Radio>
                  </Space>
                </List.Item>
              )}
            </VirtualList>
          </Radio.Group>
        </List>
      ) : (
        <Empty />
      )}
    </Modal>
  );
};

export default KhoVoucher;
