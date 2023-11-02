import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  InputNumber,
  Modal,
  Radio,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { formatGiaTienVND, formatSoLuong } from "~/utils/formatResponse";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import request, { request4s } from "~/utils/request";
import ModalKichCo from "./ModalKichCo";
import { ColumnsType } from "antd/es/table";
import HinhAnhModal from "./HinhAnhModal";
import { DataTypeCTSP } from "~/interfaces/ctsp.type";

function TableUpdateSanPhamTest({ idSanPham }) {
  const [openModal, setOpenModal] = useState(false);
  const [dataChiTietSanPham, setDataChiTietSanPham] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataFake, setDataFake] = useState<DataTypeCTSP[]>([]);
  const [dataKichCo, setDataKichCo] = useState([]);
  const [dataMauSac, setDataMauSac] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [idMauSac, setIdMauSac] = useState();
  const [mauSac, setMauSac] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { confirm } = Modal;
  useEffect(() => {
    getDataMauSac();
    getDataChiTietSanPham();
    getDataKichCo();
  }, [idMauSac]);
  const getDataMauSac = async () => {
    try {
      const res = await request.get(`mau-sac/detail/${idSanPham}`);
      setDataMauSac(res.data);
      if (idMauSac === undefined || null) {
        setIdMauSac(res.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDataChiTietSanPham = async () => {
    try {
      const res = await request.get("chi-tiet-san-pham", {
        params: {
          idSanPham: idSanPham,
          idMauSac: idMauSac,
        },
      });
      setDataChiTietSanPham(res.data);
      setMauSac(res.data[0].mauSac);
      const modifiedData = res.data.map((data: any) => ({
        id: data.id,
        diaHinhSan: {
          id: data.diaHinhSan.id,
        },
        loaiDe: {
          id: data.loaiDe.id,
        },
        mauSac: {
          id: data.mauSac.id,
        },
        kichCo: {
          id: data.kichCo.id,
          kichCo: data.kichCo.kichCo,
        },
        soLuong: data.soLuong,
        giaTien: data.giaTien,
        sanPham: {
          id: data.sanPham.id,
        },
        trangThai: data.trangThai.ten,
        key: `${data.mauSac.id}-${data.kichCo.id}`,
      }));
      setDataFake(modifiedData);
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
  const onClickUpdate = async () => {
    const selectedData = dataFake.filter((row) =>
      selectedRowKeys.includes(row.key)
    );
    try {
      console.log(selectedData);

      await request.put("chi-tiet-san-pham/update", selectedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getDataChiTietSanPham();
      message.success("Chỉnh sửa dữ liệu thành công");
    } catch (error) {
      message.error("Chỉnh sửa dữ liệu thất bại");
      console.log(error);
    }
  };
  const colums: ColumnsType<any> = [
    {
      title: "STT",
      rowScope: "row",
      width: "10%",
      render: (text, record, index) => index + 1 + pageSize * (page - 1),
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
      dataIndex: "soLuong",
      width: "250px",
      render: (soLuong, record) => {
        if (selectedRowKeys.includes(record.key)) {
          return (
            <InputNumber
              value={soLuong} // Make sure this is the correct value from your data
              min={1}
              style={{ width: "100%" }}
              formatter={(value) => formatSoLuong(value)}
              parser={(value: any) => value.replace(/,/g, "")}
              onChange={(newSoLuong) => editSoLuong(record.key, newSoLuong)}
            />
          );
        } else {
          return (
            <span style={{ marginLeft: 12 }}>{formatSoLuong(soLuong)}</span>
          );
        }
      },
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
              parser={(value: any) => value.replace(/\D/g, "")}
              onChange={(newSoLuong) => editGiaTien(record.key, newSoLuong)}
            />
          );
        } else {
          return (
            <span style={{ marginLeft: 12 }}>{formatGiaTienVND(giaTien)}</span>
          );
        }
      },
    },
    {
      dataIndex: "key",
      align: "center",
      width: "1px",
      render: (key, record) => (
        <Button type="link" style={{ padding: 0 }}>
          <Tooltip title="Xóa">
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => deleteItem(key, record)}
            />
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
                onClick={() => setOpenModal(true)}
              >
                <PictureOutlined />
              </Button>
            ),
            props: {
              rowSpan: 10,
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
  ];

  const onClickMauSac = (event) => {
    const selectedValue = event.target.value;
    setIdMauSac(selectedValue);
    setPage(1);
  };
  const deleteItem = (key, record) => {
    confirm({
      title: "Xác Nhận",
      icon: <ExclamationCircleFilled />,
      content: (
        <span>
          Bạn có chắc xóa kích cỡ <strong>{record.kichCo.kichCo}</strong> không?
        </span>
      ),
      okText: "OK",
      cancelText: "Hủy",
      onOk: async () => {
        const updatedData = dataFake.filter((item) => item.key !== key);
        setDataFake(updatedData);
        message.success("Xóa thành công");
        console.log(record.id);

        if (record.id !== null) {
          try {
            const res = await request.put(`chi-tiet-san-pham/${record.id}`, {
              trangThai: "DELETED",
            });
            console.log(res);
          } catch (error) {
            message.error("Xóa thất bại");
            console.log(error);
          }
        }
      },
    });
  };
  const onAddModalKichCo = (mauSac: any, selectedKichCo: any) => {
    const updatedFakeData: DataTypeCTSP[] = [...dataFake];
    const newSelectedKeys: string[] = [];

    selectedKichCo.forEach((kichCo: string) => {
      const uniqueId = `${mauSac}-${kichCo}`;
      updatedFakeData.push({
        id: null,
        key: uniqueId,
        mauSac: {
          id: dataChiTietSanPham[0].mauSac.id,
        },
        kichCo: {
          id: kichCo,
          kichCo: kichCoMapping[kichCo],
        },
        soLuong: 10,
        giaTien: 100000,
        loaiDe: {
          id: dataChiTietSanPham[0].loaiDe.id,
        },
        diaHinhSan: {
          id: dataChiTietSanPham[0].diaHinhSan.id,
        },
        sanPham: { id: idSanPham },
        trangThai: "ACTIVE",
      });

      newSelectedKeys.push(uniqueId);
    });

    setDataFake(updatedFakeData);
    setSelectedRowKeys((prevSelectedKeys: string[]) => [
      ...prevSelectedKeys,
      ...newSelectedKeys,
    ]);
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
      {dataMauSac.length !== 0 && (
        <Radio.Group
          buttonStyle="outline"
          defaultValue={dataMauSac[0].id}
          onChange={onClickMauSac}
        >
          <Space>
            {dataMauSac.map((record: any) => (
              <Row gutter={[10, 10]} key={record.id}>
                <Col>
                  <Radio.Button value={record.id}>{record.ten}</Radio.Button>
                </Col>
              </Row>
            ))}
            <Button type="dashed" icon={<PlusOutlined />}>
              Thêm
            </Button>
          </Space>
        </Radio.Group>
      )}

      <Button
        onClick={onClickUpdate}
        type="primary"
        icon={<EditOutlined />}
        style={{ float: "right", backgroundColor: "green" }}
      >
        Hoàn Tất Chỉnh Sửa
      </Button>
      <Table
        showSorterTooltip={false}
        pagination={{
          showSizeChanger: true,
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        dataSource={dataFake}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys: any, selectedRows: any) => {
            setSelectedRowKeys(selectedRowKeys);
          },
          checkStrictly: true,
          type: "checkbox",
        }}
        columns={colums}
        footer={() => (
          <Button
            type="dashed"
            style={{ textAlign: "center" }}
            icon={<PlusOutlined />}
            onClick={() => {
              setShowModal(true);
            }}
            block
          >
            Thêm Kích Cỡ
          </Button>
        )}
      />
      <ModalKichCo
        openModal={showModal}
        closeModal={() => setShowModal(false)}
        mauSac={mauSac}
        fakeData={dataFake}
        onAddKichCo={onAddModalKichCo}
      />
      <HinhAnhModal
        sanPham={idSanPham}
        mauSac={mauSac}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
}

export default TableUpdateSanPhamTest;
