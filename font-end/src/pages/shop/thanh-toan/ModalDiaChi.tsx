import React, { useState, useEffect } from "react";
import { fetchData } from "~/api/apiDiaChi";
import { Space, Tag, Button, Modal, Divider, List, Typography } from "antd";
interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}
import { PlusOutlined } from "@ant-design/icons";
import { formatPhoneNumber } from "~/utils/formatResponse";
import {
  DataType,
  TableParams,
  DescriptionItemProps,
} from "~/interfaces/diaChi.type";
import { requestDC } from "~/utils/requestDiaChi";
import axios from "axios";
import request from "~/utils/request";

const { Text } = Typography;
function ModalDiaChi22({ openModal, closeModal, onClickDiaChi }) {
  const [modalAddDiaChi, setModalAddDiaChi] = useState(false);
  const [modalUpdateDiaChi, setModalUpdateDiaChi] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);

  const fetchProvinces = async () => {
    try {
      const provinceRes = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );
      const provinceOptions: Option[] = provinceRes.data.data.map(
        (province: any) => ({
          value: province.ProvinceID,
          label: province.ProvinceName,
          isLeaf: false,
        })
      );

      setProvinces(provinceOptions);
      console.log("Provinces:", provinceOptions); // Log the updated provinces
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDistricts = async (idProvince: number | undefined) => {
    try {
      const districtRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
        {
          params: {
            province_id: idProvince,
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );
      console.log("districh", districtRes);
      const districtOptions: Option[] = districtRes.data.data.map(
        (district: any) => ({
          value: district.DistrictID,
          label: district.DistrictName,
          isLeaf: false,
        })
      );
      setDistricts(districtOptions);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchWards = async (idDistrict: number | undefined) => {
    try {
      const idDis = data.map((item) => item.quanHuyen);
      const wardOptions: Option[] = [];

      for (const districtId of idDis || []) {
        const wardRes = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
          {
            headers: {
              token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
              ContentType: "application/json",
            },
          }
        );
        console.log("wardRes", wardRes);
        const wardsForDistrict: Option[] = wardRes.data.data.map(
          (ward: any) => ({
            value: ward.WardCode,
            label: ward.WardName,
            isLeaf: false,
          })
        );

        wardOptions.push(...wardsForDistrict);
        console.log("wardsForDistrict", wardsForDistrict);
      }

      setWards(wardOptions);
      console.log("wardOptions", wardOptions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataDC();
  }, []);
  const idTaiKhoan = localStorage.getItem("acountId");
  const fetchDataDC = async () => {
    try {
      const res = await request.get("dia-chi/list", {
        params: {
          idTaiKhoan: idTaiKhoan,
        },
      });
      console.log(res.data);
      setDataList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Địa chỉ của tôi"
        style={{ top: 20 }}
        width={600}
        open={openModal}
        onCancel={closeModal}
      >
        <List
          className="demo-loadmore-list"
          //   loading={initLoading}
          itemLayout="horizontal"
          //   loadMore={loadMore}
          dataSource={dataList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  style={{ padding: 0 }}
                  type="link"
                  key="list-loadmore-edit"
                >
                  Sửa
                </Button>,
                <Button
                  style={{ padding: 0 }}
                  type="link"
                  key="list-loadmore-more"
                  onClick={() => {
                    onClickDiaChi(item);
                    closeModal();
                  }}
                >
                  Chọn
                </Button>,
              ]}
            >
              <Space direction="vertical">
                <Space>
                  <Text strong>{item.hoVaTen}</Text>
                  {item.trangThaiDiaChi.ten == "DEFAULT" && (
                    <Tag color="red">{item.trangThaiDiaChi.ten}</Tag>
                  )}
                </Space>
                <Space split={<Divider type="vertical" />}>
                  <Text>{formatPhoneNumber(item.soDienThoai)}</Text>
                  <Text>{item.email}</Text>
                </Space>
                <Text>{item.diaChiCuThe}</Text>
                <Text>
                  {item.phuongXa + ", " + item.quanHuyen + ", " + item.thanhPho}
                </Text>
              </Space>
            </List.Item>
          )}
        />
        <Button type="dashed" icon={<PlusOutlined />}>
          Thêm địa chỉ mới
        </Button>
      </Modal>
    </>
  );
}

export default ModalDiaChi22;
