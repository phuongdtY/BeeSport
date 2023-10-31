import { ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { formatNgaySinh, formatPhoneNumber } from "~/utils/formatResponse";
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
  Row,
  Col,
  Select,
  Switch,
  DatePicker,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatedRequest } from "~/interfaces/nhanVien.type";
interface Option {
  value?: number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}
import request from "~/utils/request";
const { confirm } = Modal;
const UpdateNhanVien: React.FC = () => {
  const [test, setTest] = useState(false);
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();
  useEffect(() => {
    const getOne = async () => {
      setLoadingForm(true);
      try {
        const res = await request.get("nhan-vien/edit/" + id);
        const trangThaiValue = res.data?.trangThai.ten === "ACTIVE";
          const gioiTinhValue = res.data?.gioiTinh?.ten || "OTHER";
          const ngaySinhValue = dayjs(res.data?.ngaySinh);
        // const provinceLabel = getProvinceLabelFromId(res.data?.thanhPho);
        //   const districtLabel = getDistrictLabelFromId(res.data?.quanHuyen);
        //   const wardLabel = getWardLabelFromId(res.data?.phuongXa);
        form.setFieldsValue({
            hoVaTen: res.data?.hoVaTen,
            canCuocCongDan: res.data?.canCuocCongDan,
            ngaySinh: ngaySinhValue,
            gioiTinh: gioiTinhValue,
            soDienThoai: res.data?.soDienThoai,
            email: res.data?.email,
            thanhPho: res.data?.thanhPho,
            quanHuyen: res.data?.quanHuyen,
            phuongXa: res.data?.phuongXa,
            diaChiCuThe: res.data?.diaChiCuThe,
            matKhau:res.data?.matKhau,
            trangThai: trangThaiValue, // Convert to boolean

        });
        setLoadingForm(false);
      } catch (error) {
        console.log(error);
        setLoadingForm(false);
      }
    };
    getOne();
  }, [id]);
  const fetchDistricts = async (idProvince: string) => {
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
  const fetchWards = async (idDistrict: string) => {
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
  // const handleProvinceChange = (provinceId: string) => {
  //   fetchDistricts(provinceId);
  // };
  // const handleDistrictChange = (districtId: string) => {
  //   fetchWards(districtId);
  // };
  const onFinish = (values: UpdatedRequest) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc cập nhật nhân viên này không?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const trangThai = values.trangThai ? "ACTIVE" : "INACTIVE";
          
          const res = await request.put("nhan-vien/update/" + id, {
            hoVaTen: values.hoVaTen,
            canCuocCongDan: values.canCuocCongDan,
            ngaySinh: values.ngaySinh,
            gioiTinh: values.gioiTinh,
            soDienThoai: values.soDienThoai,
            email: values.email,
            thanhPho: values.thanhPho,
            quanHuyen: values.quanHuyen,
            phuongXa: values.phuongXa,
            diaChiCuThe: values.diaChiCuThe,
            matKhau: values.matKhau,
            trangThai: trangThai,
          });
          if (res.data) {
            message.success("Cập nhật nhân viên thành công");
            navigate("/admin/nhan-vien");
            console.log(values.trangThai)
          } else {
            console.error("Phản hồi API không như mong đợi:", res);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            message.error(error.response.data.message);
          } else {
            console.error("Lỗi không xác định:", error);
            message.error("Cập nhật nhân viên thất bại");
          }
        }
      },
    });
  };
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              token: "49e20eea-4a6c-11ee-af43-6ead57e9219a",
              ContentType: "application/json",
            },
          }
        );

        const provinceOptions: Option[] = res.data.data.map(
          (province: any) => ({
            value: province.ProvinceID,
            label: province.ProvinceName,
            isLeaf: false,
          })
        );
        setProvinces(provinceOptions);
        setTest(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  const loadData = async (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    if (targetOption && typeof targetOption.value === "number") {
      const id = targetOption.value;
      setTest(false);

      try {
        if (!targetOption.isLeaf && test === false) {
          // Load districts when selecting a province
          const res = await axios.get(
            "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
            {
              params: {
                province_id: id,
              },
              headers: {
                token: "49e20eea-4a6c-11ee-af43-6ead57e9219a",
                ContentType: "application/json",
              },
            }
          );

          const data = res.data.data.map((item: any) => ({
            value: item.DistrictID,
            label: item.DistrictName,
            isLeaf: false,
          }));

          targetOption.children = data;
          setProvinces([...provinces]);
          setTest(true);
        } else {
          console.log(id);

          // Load wards when selecting a district
          const res = await axios.get(
            `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
            {
              params: {
                district_id: id,
              },
              headers: {
                token: "49e20eea-4a6c-11ee-af43-6ead57e9219a",
                ContentType: "application/json",
              },
            }
          );

          const data = res.data.data.map((item: any) => ({
            value: item.DistrictID,
            label: item.WardName,
            isLeaf: true,
          }));

          targetOption.children = data;
          setProvinces([...provinces]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getProvinceLabelFromId = (id: number) => {
    const province = provinces.find((p) => p.value === id);
    return province ? province.label : "";
  };
  
  const getDistrictLabelFromId = (id: number) => {
    const district = districts.find((d) => d.value === id);
    return district ? district.label : "";
  };
  
  const getWardLabelFromId = (id: number) => {
    const ward = wards.find((w) => w.value === id);
    return ward ? ward.label : "";
  };
  
  return (
    <>
      <Card title="CẬP NHẬT NHÂN VIÊN">
        <Skeleton loading={loadingForm}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
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
                  message: "Vui lòng nhập tên nhân viên!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="canCuocCongDan"
              label="Căn cước công dân"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập căn cước công dân!",
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
              >
                <Input/>
            </Form.Item>
            <Form.Item
              name="thanhPho"
              label="Tỉnh / Thành"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Tỉnh / Thành !",
                },
              ]}
            >
              <Select
                options={provinces}
                placeholder="Tỉnh/ Thành Phố"
                onChange={(value) => {
                  form.setFieldsValue({
                    quanHuyen: undefined,
                    phuongXa: undefined,
                  });
                  fetchDistricts(value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="quanHuyen"
              label="Quận / Huyện:"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Quận / Huyện!",
                },
              ]}
            >
              <Select
                options={districts}
                placeholder="Quận / Huyện"
                onChange={(value) => {
                  form.setFieldsValue({ phuongXa: undefined });
                  fetchWards(value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="phuongXa"
              label="Phường / Xã"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa điền Phường / Xã !",
                },
              ]}
            >
              <Select options={wards} placeholder="Phường / Xã" />
            </Form.Item>
            <Form.Item
              name="diaChiCuThe"
              label="Địa chỉ cụ thể"
              
              >
            <Input/>
            </Form.Item>
            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              >
                <Input/>
            </Form.Item>
            <Form.Item
              name="trangThai"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch size="small" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 17 }}>
              <Space>
                <Button type="dashed" htmlType="reset">
                  Reset
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
  );
};

export default UpdateNhanVien;
