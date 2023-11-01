import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  ColorPicker,
  InputNumber,
  Pagination,
  Radio,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import { formatGiaTienVND, formatSoLuong } from "~/utils/formatResponse";
import {
  DeleteOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import request, { request4s } from "~/utils/request";
import ModalKichCo from "./ModalKichCo";
import ModalAddKichCo from "./ModalAddKichCo";

function TableUpdateSanPham({ idSanPham }) {
  const [dataChiTietSanPham, setDataChiTietSanPham] = useState([]);
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataFake, setDataFake] = useState([]);
  const [dataKichCo, setDataKichCo] = useState([]);
  const [dataMauSac, setDataMauSac] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const getDataChiTietSanPham = async () => {
    try {
      const res = await request.get(`chi-tiet-san-pham/${idSanPham}`);
      setDataChiTietSanPham(res.data);
      const modifiedData = res.data.map((data: any) => ({
        ...data,
        key: `${data.mauSac.id}-${data.kichCo.id}`,
      }));
      setDataFake(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataMauSac = async () => {
    try {
      const res = await request4s.get("mau-sac/list");
      setDataMauSac(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataKichCo = async () => {
    try {
      const res = await request4s.get("kich-co/list");
      setDataKichCo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataChiTietSanPham();
    getDataMauSac();
    getDataKichCo();
  }, []);
  const groupedData = {};
  dataFake.forEach((data) => {
    const mauSacKey = `${data.mauSac.id}`;
    if (!groupedData[mauSacKey]) {
      groupedData[mauSacKey] = [];
    }
    groupedData[mauSacKey].push(data);
  });
  const mauSacMapping = {};
  dataMauSac.forEach((ms) => {
    mauSacMapping[ms.id] = ms.ten;
  });

  const kichCoMapping = {};
  dataKichCo.forEach((kc) => {
    kichCoMapping[kc.id] = kc.kichCo;
  });
  const onClickUpdate = () => {
    console.log(selectedRows);
  };
  return Object.keys(groupedData).map((mauSacKey) => {
    const mauSacData = groupedData[mauSacKey];
    const firstMauSac = mauSacData[0].mauSac;
    const onAddModalKichCo = (mauSac: any, selectedKichCo: any) => {
      const updatedFakeData = [...dataFake];
      selectedKichCo.forEach((kichCo: any) => {
        const uniqueId = `${mauSac}-${kichCo}`;
        updatedFakeData.push({
          id: null,
          key: uniqueId,
          mauSac: {
            id: mauSac,
            ten: mauSacMapping[mauSac],
          },
          kichCo: {
            id: kichCo,
            kichCo: kichCoMapping[kichCo],
          },
          soLuong: 10,
          giaTien: 100000,
          loaiDe: { id: dataChiTietSanPham[0].loaiDe.id },
          diaHinhSan: { id: dataChiTietSanPham[0].diaHinhSan.id },
          sanPham: { id: idSanPham },
        });
      });
      setDataFake(updatedFakeData);
    };
    const editGiaTien = (key, newGiaTien) => {
      setDataFake((prevFakeData: any) =>
        prevFakeData.map((item) =>
          item.key === key ? { ...item, giaTien: newGiaTien } : item
        )
      );
    };
    const editSoLuong = (key, newSoLuong) => {
      setDataFake((prevFakeData: any) =>
        prevFakeData.map((item) =>
          item.key === key ? { ...item, soLuong: newSoLuong } : item
        )
      );
    };
    return (
      <>
        <div key={mauSacKey} style={{ marginBottom: 50 }}>
          <Alert
            style={{
              fontSize: 17,
              textAlign: "center",
              fontWeight: "bold",
            }}
            message={firstMauSac.ten.toUpperCase()}
            type="warning"
          />
          <Button type="primary" danger onClick={onClickUpdate}>
            Test
          </Button>
          <Table
            showSorterTooltip={false}
            dataSource={mauSacData}
            rowSelection={{
              ...selectedRows,
              ...selectedRowKeys, // Use the state variable for selected row keys
              onChange: (selectedRowKeys: any, selectedRows: any) => {
                setSelectedRowKeys(selectedRowKeys);
                setSelectedRows(selectedRows);
              },
              checkStrictly: true,
              type: "checkbox",
            }}
            columns={[
              {
                title: "STT",
                dataIndex: "key",
                rowScope: "row",
              },
              {
                title: "Kích Cỡ",
                align: "center",
                dataIndex: "kichCo",
                render: (kichCo) => kichCo.kichCo,
                sorter: (a, b) => {
                  const kichCoA = parseFloat(a.kichCo.kichCo);
                  const kichCoB = parseFloat(b.kichCo.kichCo);
                  return kichCoA - kichCoB;
                },
              },
              {
                title: "Số lượng",
                align: "center",
                dataIndex: "soLuong",
                render: (soLuong, record) => (
                  <InputNumber
                    value={soLuong} // Make sure this is the correct value from your data
                    min={1}
                    style={{ width: "100%" }}
                    formatter={(value) => formatSoLuong(value)}
                    parser={(value: any) => value.replace(/,/g, "")}
                    onChange={(newSoLuong) =>
                      editSoLuong(record.key, newSoLuong)
                    }
                  />
                ),
              },
              {
                title: "Giá tiền",
                dataIndex: "giaTien",
                width: "250px",
                render: (giaTien, record) => {
                  if (selectedRowKeys.includes(record.key)) {
                    return (
                      <InputNumber
                        value={giaTien}
                        style={{ width: "100%" }}
                        min={1000}
                        step={10000}
                        formatter={(value) => `${formatGiaTienVND(value)}`}
                        parser={(value) => value.replace(/\D/g, "")}
                        onChange={(newSoLuong) =>
                          editGiaTien(record.key, newSoLuong)
                        }
                      />
                    );
                  } else {
                    return (
                      <span style={{ marginLeft: 12 }}>
                        {formatGiaTienVND(giaTien)}
                      </span>
                    ); // Display the text if not selected
                  }
                },
              },
              {
                dataIndex: "key",
                align: "center",
                width: "1px",
                render: (key) => (
                  <Button type="link" style={{ padding: 0 }}>
                    <Tooltip title="Xóa">
                      <DeleteOutlined style={{ color: "red" }} />
                    </Tooltip>
                  </Button>
                ),
              },
              {
                title: "Ảnh",
                dataIndex: "anh",
                width: "10%",
                render: (text, record, index) => {
                  if (index === 0) {
                    return {
                      children: (
                        <Button
                          type="link"
                          style={{ padding: 0, fontSize: 30 }}
                        >
                          <PictureOutlined />
                        </Button>
                      ),
                      props: {
                        rowSpan: mauSacData.length,
                      },
                    };
                  } else {
                    return {
                      children: null,
                      props: {
                        rowSpan: 0,
                      },
                    };
                  }
                },
              },
            ]}
          />
          <Button
            type="dashed"
            style={{ textAlign: "center" }}
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedMauSac(firstMauSac);
              setShowModal(true);
            }}
            block
          >
            Thêm Kích Cỡ Giày {firstMauSac.ten}
          </Button>
          <ModalKichCo
            openModal={showModal}
            closeModal={() => setShowModal(false)}
            mauSac={selectedMauSac}
            fakeData={dataFake}
            onAddKichCo={onAddModalKichCo}
          />
          {/* <ModalAddKichCo
          data={dataChiTietSanPham}
          openModal={showModal}
          closeModal={() => setShowModal(false)}
          mauSac={selectedMauSac}
        /> */}
          <Radio.Group buttonStyle="outline">
            <Space>
              <Row gutter={[10, 10]}>
                {dataMauSac.map((record: any) => (
                  <Col key={record.id}>
                    <Radio.Button value={record.id}>{record.ten}</Radio.Button>
                  </Col>
                ))}
              </Row>
              <Button
                type="dashed"
                // style={{ width: 50 }}
                icon={<PlusOutlined />}
              >
                Thêm
              </Button>
            </Space>
          </Radio.Group>
        </div>
      </>
    );
  });
}

export default TableUpdateSanPham;
