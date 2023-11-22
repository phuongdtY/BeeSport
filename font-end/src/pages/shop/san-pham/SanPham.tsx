import {
  Card,
  Checkbox,
  Col,
  Collapse,
  CollapseProps,
  ColorPicker,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Slider,
  Space,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { formatGiaTien, formatGiaTienVND } from "~/utils/formatResponse";
import request from "~/utils/request";
import { Link } from "react-router-dom";
import { DataParam } from "~/interfaces/filterSanPham.type";

const { Title } = Typography;

const SanPham: React.FC = () => {
  const [thuongHieus, setThuongHieus] = useState([]);
  const [diaHinhSans, setDiaHinhSans] = useState([]);
  const [loaiDes, setLoaiDes] = useState([]);
  const [kichCos, setKichCos] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [sanPhams, setSanPhams] = useState([]);
  const [giaTienRange, setGiaTienRange] = useState([0, 10000000]);
  const [dataParams, setDataParams] = useState<DataParam>();
  const [totalElements, setTotalElements] = useState(1);
  const [selectedThuongHieu, setSelectedThuongHieu] = useState([]);

  const kichCoLength = Math.ceil(kichCos.length / 3);
  const leftKichCo = kichCos.slice(0, kichCoLength);
  const middleKichCo = kichCos.slice(kichCoLength, 2 * kichCoLength);
  const rightKichCo = kichCos.slice(2 * kichCoLength);

  const mauSacLength = Math.ceil(mauSacs.length / 3);
  const leftMauSac = mauSacs.slice(0, mauSacLength);
  const middleMauSac = mauSacs.slice(mauSacLength, 2 * mauSacLength);
  const rightMauSac = mauSacs.slice(2 * mauSacLength);

  const handleThuongHieuChange = (item) => {
    const currentIndex = selectedThuongHieu.indexOf(item);
    const newSelectedThuongHieu = [...selectedThuongHieu];

    if (currentIndex === -1) {
      newSelectedThuongHieu.push(item);
    } else {
      newSelectedThuongHieu.splice(currentIndex, 1);
    }

    setSelectedThuongHieu(newSelectedThuongHieu);
    setDataParams({
      ...dataParams,
      listThuongHieu: newSelectedThuongHieu,
    });
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setDataParams({
      ...dataParams,
      page: current,
      pageSize: pageSize,
    });
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "GIÁ SẢN PHẨM",
      children: (
        <p>
          <Slider
            range
            min={0}
            max={10000000}
            step={100000}
            value={giaTienRange} // Sử dụng giá trị từ state
            onChange={(value) => setGiaTienRange(value)} // Cập nhật giá trị vào state
            tipFormatter={(value) => `${formatGiaTienVND(value)}`}
          />
          <span>
            Từ: {formatGiaTienVND(giaTienRange[0])} - Đến:{" "}
            {formatGiaTienVND(giaTienRange[1])}
          </span>
        </p>
      ),
    },
    {
      key: "2",
      label: "THƯƠNG HIỆU",
      children: (
        <p>
          {thuongHieus.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <Checkbox onChange={() => handleThuongHieuChange(item.id)}>
                {item.ten}
              </Checkbox>
            </div>
          ))}
        </p>
      ),
    },
    {
      key: "3",
      label: "ĐỊA HÌNH SÂN",
      children: (
        <p>
          {diaHinhSans.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <Checkbox>{item.ten}</Checkbox>
            </div>
          ))}
        </p>
      ),
    },
    {
      key: "4",
      label: "LOẠI ĐẾ",
      children: (
        <p>
          {loaiDes.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <Checkbox>{item.ten}</Checkbox>
            </div>
          ))}
        </p>
      ),
    },
    {
      key: "5",
      label: "KÍCH CỠ",
      children: (
        <p>
          <Row style={{ marginTop: 10 }}>
            <Col span={8}>
              {leftKichCo.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Checkbox>{item.kichCo}</Checkbox>
                </div>
              ))}
            </Col>
            <Col span={8}>
              {middleKichCo.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Checkbox>{item.kichCo}</Checkbox>
                </div>
              ))}
            </Col>
            <Col span={8}>
              {rightKichCo.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Checkbox>{item.kichCo}</Checkbox>
                </div>
              ))}
            </Col>
          </Row>
        </p>
      ),
    },
    {
      key: "6",
      label: "MÀU SẮC",
      children: (
        <p>
          <Row style={{ marginTop: 10 }}>
            <Col span={8}>
              {leftMauSac.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Checkbox>
                    <ColorPicker value={item.ma} size="small" disabled />
                    {item.ten}
                  </Checkbox>
                </div>
              ))}
            </Col>
            <Col span={8}>
              {middleMauSac.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Checkbox>
                    <ColorPicker value={item.ma} size="small" disabled />
                    {item.ten}
                  </Checkbox>
                </div>
              ))}
            </Col>
            <Col span={8}>
              {rightMauSac.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <Checkbox>
                    <ColorPicker value={item.ma} size="small" disabled />
                    {item.ten}
                  </Checkbox>
                </div>
              ))}
            </Col>
          </Row>
        </p>
      ),
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const fetchThuongHieu = async () => {
      try {
        const res = await request.get("/thuong-hieu/list");
        setThuongHieus(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu thương hiệu thất bại");
      }
    };

    const fetchDiaHinhSan = async () => {
      try {
        const res = await request.get("/dia-hinh-san/list");
        setDiaHinhSans(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu địa hình sân thất bại");
      }
    };

    const fetchLoaiDe = async () => {
      try {
        const res = await request.get("/loai-de/list");
        setLoaiDes(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu loại đế thất bại");
      }
    };

    const fetchSize = async () => {
      try {
        const res = await request.get("/kich-co/list");
        setKichCos(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu kích cỡ thất bại");
      }
    };

    const fetchMauSac = async () => {
      try {
        const res = await request.get("/mau-sac/list");
        setMauSacs(res.data);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu màu sắc thất bại");
      }
    };

    const fetchSanPham = async () => {
      try {
        const res = await request.get("/san-pham/filter", {
          params: dataParams,
        });
        setSanPhams(res.data.content);
        setTotalElements(res.data.totalElements);
      } catch (error) {
        console.log(error);
        message.error("Lấy dữ liệu sản phẩm thất bại");
      }
    };

    fetchThuongHieu();
    fetchDiaHinhSan();
    fetchLoaiDe();
    fetchSize();
    fetchMauSac();
    fetchSanPham();
  }, [dataParams]);
  return (
    <>
      <div
        style={{
          backgroundColor: "#EEEEEE",
          height: 35,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          paddingLeft: 65,
          marginBottom: 20,
        }}
      >
        <span>Trang chủ/</span>
        <span style={{ fontWeight: "bold", paddingLeft: 5 }}>Sản phẩm</span>
      </div>
      <Row>
        <Col span={1}></Col>
        <Col span={6}>
          <Collapse items={items} onChange={onChange} />
        </Col>

        <Col span={15} style={{ marginLeft: 30 }}>
          <Space>
            <p style={{ fontWeight: "bold", float: "left" }}>
              DANH SÁCH SẢN PHẨM
            </p>
            <Select
              defaultValue={"6"}
              style={{ width: 140, marginLeft: 620 }}
              onChange={handleChange}
              options={[
                { value: "1", label: "Giá: Tăng dần" },
                { value: "2", label: "Giá: Giảm dần" },
                { value: "3", label: "Tên: A-Z" },
                { value: "4", label: "Tên: Z-A" },
                { value: "5", label: "Cũ nhất" },
                { value: "6", label: "Mới nhất" },
              ]}
            />
          </Space>
          <Row gutter={16}>
            {sanPhams.map((product) => (
              <Col key={product.id}>
                <Card
                  bordered
                  style={{
                    width: 260,
                    marginRight: 30,
                    marginLeft: 10,
                    marginBottom: 15,
                  }}
                >
                  <Link
                    to={`/san-pham/detail/${product.id}`}
                    style={{ fontWeight: "bold", margin: 0 }}
                  >
                    <img
                      style={{ padding: 30, height: 240 }}
                      alt="example"
                      src={`http://localhost:8080/admin/api/file/view/${product.duongDan}`}
                    />
                    <p style={{ textAlign: "left" }}>
                      {product.ten}
                      <Title level={5} style={{ color: "red", margin: 0 }}>
                        {product.giaMin === product.giaMax
                          ? `${formatGiaTien(product.giaMax)}`
                          : `${formatGiaTien(product.giaMin)} - ${formatGiaTien(
                              product.giaMax
                            )}`}
                      </Title>
                    </p>
                  </Link>
                  {/* Add your actions, such as Add to Cart and Buy Now buttons here */}
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            style={{ marginLeft: 260, marginBottom: 50 }}
            defaultPageSize={9}
            showSizeChanger={false}
            onChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalElements}
          />
        </Col>
      </Row>
    </>
  );
};

export default SanPham;
