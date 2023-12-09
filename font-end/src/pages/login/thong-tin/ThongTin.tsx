import { ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Radio,
  Skeleton,
  Space,
  Select,
  Switch,
  DatePicker,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest,DataType } from "~/interfaces/khachHang.type";
interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

import request from "~/utils/request";
import { requestDoiMK } from "~/utils/requestDoiMK";

const { confirm } = Modal;
const UpdateTT: React.FC = () => {
  
  const [data, setData] = useState<DataType|null>(null);
  const [wardCode1, setWardCode1] = useState(data?.phuongXa);
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
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
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDistricts = async (idProvince: number|undefined) => {
    try {
      const districtRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?`,
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
  const fetchWards = async (idDistrict: number|undefined) => {
    try {
      const wardRes = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          params: {
            district_id: idDistrict,
          },
          headers: {
            token: "4d0b3d7c-65a5-11ee-a59f-a260851ba65c",
            ContentType: "application/json",
          },
        }
      );

      const wardOptions: Option[] = wardRes.data.data.map((ward: any) => ({
        value: ward.WardCode,
        label: ward.WardName,
        isLeaf: false,
      }));
      setWards(wardOptions);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getOne = async () => {
      
      setLoadingForm(true);
      try {
        const doiMK = localStorage.getItem("acountId");
        const res = await requestDoiMK.get("/editTT/" + doiMK);
        console.log("aaaa",res.data)
        //fix
        fetchProvinces();
        fetchDistricts(res.data?.thanhPho);
        fetchWards(res.data?.quanHuyen);
        // const trangThaiValue = res.data?.trangThai.ten === "ACTIVE";
          const gioiTinhValue = res.data?.gioiTinh?.ten || "OTHER";
          const ngaySinhValue = dayjs(res.data?.ngaySinh);
        form.setFieldsValue({
            hoVaTen: res.data?.hoVaTen,
            // canCuocCongDan: res.data?.canCuocCongDan,
            ngaySinh: ngaySinhValue,
            gioiTinh: gioiTinhValue,
            soDienThoai: res.data?.soDienThoai,
            email: res.data?.email,
            // thanhPho: Number(res.data?.thanhPho) ,
            // quanHuyen: Number(res.data?.quanHuyen),
            // phuongXa: res.data?.phuongXa,
            // diaChiCuThe: res.data?.diaChiCuThe,
            // trangThai: trangThaiValue, // Convert to boolean
        })
        ;
        setData(res.data);
        setLoadingForm(false);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    getOne();
  }, [id]);
  
  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật thông tin không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
            const doiMK = localStorage.getItem("acountId");
          const trangThai = values.trangThai ? "ACTIVE" : "INACTIVE";
          const res = await requestDoiMK.put("updateTT/" + doiMK, {
            hoVaTen: values.hoVaTen,
            // canCuocCongDan: values.canCuocCongDan,
            ngaySinh: values.ngaySinh,
            gioiTinh: values.gioiTinh,
            soDienThoai: values.soDienThoai,
            email: values.email,
            // thanhPho: values.thanhPho,
            // quanHuyen: values.quanHuyen,
            // phuongXa: values.phuongXa,
            // diaChiCuThe: values.diaChiCuThe,
            // trangThai: trangThai,
          }
          );
          if (res.data) {
            message.success("Cập nhật thông tin thành công");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("acountId");
            localStorage.removeItem("roleId");
            navigate("/sign-in");
            console.log(values.trangThai)
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Cập nhật thông tin thất bại");
          }
        }
      },
    });
  };
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
    <>
      <Card title="CẬP NHẬT THÔNG TIN">
        <Skeleton loading={loadingForm}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 30 }}
            style={{ maxWidth: 700 }}
            onFinish={onFinish}
            layout="horizontal"
            form={form}
          >
           <Form.Item
              name="hoVaTen"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khách hàng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ngaySinh"
             label="Ngày Sinh:"

              rules={[
                    {
                    required: true,
                    message: "Vui lòng chọn ngày sinh!",
                    },
                  ]   }
                  >
          <DatePicker format={"DD/MM/YYYY"} placeholder="Chọn ngày sinh" />
          </Form.Item>

          <Form.Item
              name="gioiTinh"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="MALE">Nam</Radio>
                <Radio value="FEMALE">Nữ</Radio>
                <Radio value="OTHER">Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="soDienThoai"
              label="Số điện thoại"
              rules={[{
                required: true,
                message: "Vui lòng chọn số điện thoại!"
              }
              ]}>
             <Input/>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{
                required: true,
                message: "Vui lòng chọn email!"
              }
              ]}
              >
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 1 }}>
              <Space>
                <Button type="dashed" htmlType="reset">
                  Reset
                </Button>
                <Button  type="primary">
                    <Link to={"/them-dia-chi"}>Thêm địa chỉ mới</Link>
                </Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Skeleton>
      </Card>
    </>
    </div>
  );
};

export default UpdateTT;
