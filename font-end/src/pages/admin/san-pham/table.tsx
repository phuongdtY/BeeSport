import React, { useState, useEffect } from "react";
import { Alert, Button, InputNumber, Space, Table, Tooltip } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import { formatCurrency } from "~/utils/formatResponse";
import KichCoModal from "./KichCoModal";
import {
  BgColorsOutlined,
  DeleteOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function TableSanPham({
  dataMS,
  dataKC,
  selectedLoaiDe,
  selectedDiaHinhSan,
  selectedMauSac,
  selectedKichCo,
}) {
  const [fakeData, setFakeData] = useState<DataTypeSanPham[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [soLuong, setSoLuong] = useState(1);
  const [giaTien, setGiaTien] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [kichCoModalVisible, setKichCoModalVisible] = useState(false);
  const [selectedMauSacForModal, setSelectedMauSacForModal] = useState(null);

  useEffect(() => {
    setFakeData(createFakeData());
  }, [selectedMauSac, selectedKichCo]);

  const mauSacMapping = {};
  dataMS.forEach((ms) => {
    mauSacMapping[ms.id] = ms.ten;
  });

  const kichCoMapping = {};
  dataKC.forEach((kc) => {
    kichCoMapping[kc.id] = kc.kichCo;
  });

  const handleEditSoLuong = (key, newSoLuong) => {
    setFakeData((prevFakeData: any) =>
      prevFakeData.map((item) =>
        item.key === key ? { ...item, soLuong: newSoLuong } : item
      )
    );
  };

  const handleEditGiaTien = (key, newGiaTien) => {
    setFakeData((prevFakeData: any) =>
      prevFakeData.map((item) =>
        item.key === key ? { ...item, giaTien: newGiaTien } : item
      )
    );
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const clickDelete = () => {
    const updatedData = fakeData.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setFakeData(updatedData);
  };

  const clickSoLuong = () => {
    const updatedData = fakeData.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        return {
          ...item,
          soLuong: soLuong,
        };
      }
      return item;
    });
    setFakeData(updatedData);
  };

  const clickGiaTien = () => {
    const updatedData = fakeData.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        return {
          ...item,
          giaTien: giaTien,
        };
      }
      return item;
    });
    setFakeData(updatedData);
  };

  const createFakeData = () => {
    const fakeData = [];
    selectedMauSac.forEach((mauSac) => {
      selectedKichCo.forEach((kichCo) => {
        const uniqueId = `${mauSac}-${kichCo}`;
        fakeData.push({
          key: uniqueId,
          giaTien: 100000,
          soLuong: 10,
          loaiDe: {
            id: selectedLoaiDe,
          },
          diaHinhSan: {
            id: selectedDiaHinhSan,
          },
          sanPham: {
            id: 5,
          },
          mauSac: {
            id: mauSac,
            ten: mauSacMapping[mauSac],
          },
          kichCo: {
            id: kichCo,
            ten: kichCoMapping[kichCo],
          },
        });
      });
    });
    return fakeData;
  };

  const rowSelection: TableRowSelection<DataType> = {
    onSelect: (changeableRowKeys) => {
      setSelectedRowKeys(changeableRowKeys);
    },
  };

  const deleteItemFromFakeData = (key) => {
    const updatedData = fakeData.filter((item) => item.key !== key);
    setFakeData(updatedData);
  };

  const handleOpenKichCoModal = (mauSac) => {
    setSelectedMauSacForModal(mauSac);
    setKichCoModalVisible(true);
  };

  const handleAddKichCoToFakeData = (mauSac, selectedKichCo) => {
    const updatedFakeData = fakeData.slice();
    selectedKichCo.forEach((kichCo) => {
      const uniqueId = `${mauSac}-${kichCo}`;
      updatedFakeData.push({
        key: uniqueId,
        giaTien: 100000,
        soLuong: 10,
        loaiDe: { id: selectedLoaiDe },
        diaHinhSan: { id: selectedDiaHinhSan },
        sanPham: { id: 5 },
        mauSac: { id: mauSac, ten: mauSacMapping[mauSac] },
        kichCo: { id: kichCo, ten: kichCoMapping[kichCo] },
      });
    });

    setFakeData(updatedFakeData);
  };

  const groupedData = {};

  fakeData.forEach((data) => {
    const mauSacKey = `${data.mauSac.id}`; // Dùng ID của mauSac thay vì tên
    if (!groupedData[mauSacKey]) {
      groupedData[mauSacKey] = [];
    }
    groupedData[mauSacKey].push(data);
  });

  return Object.keys(groupedData).map((mauSacKey) => {
    const mauSacData = groupedData[mauSacKey];
    const firstMauSac = mauSacData[0].mauSac;
    return (
      <div key={mauSacKey} style={{ marginBottom: 50 }}>
        <Alert
          style={{ textAlign: "center", fontWeight: "bold" }}
          message={firstMauSac.ten}
          type="info"
        />
        <Space style={{ margin: 5 }}>
          <Button type="primary" danger size="small">
            <DeleteOutlined />
            Xóa
          </Button>
          <InputNumber
            size="small"
            value={soLuong}
            onChange={(value) => setSoLuong(value)}
            min={1}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
          <Button size="small" type="default" onClick={clickSoLuong}>
            Sửa số lượng
          </Button>
          <InputNumber
            size="small"
            value={giaTien}
            style={{ width: "100%" }}
            min={0}
            step={1000}
            formatter={(value) => `${formatCurrency(value)}`}
            parser={(value) => value!.replace(/\D/g, "")}
            onChange={(value) => setGiaTien(value)}
          />
          <Button size="small" type="default" onClick={clickGiaTien}>
            Sửa giá tiền
          </Button>
        </Space>
        <Table
          rowSelection={rowSelection}
          dataSource={mauSacData}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            onChange: (page, pageSize) => handlePageChange(page, pageSize),
          }}
          columns={[
            {
              title: "#",
              rowScope: "row",
              render: (text, record, index) =>
                index + 1 + pageSize * (currentPage - 1),
            },
            {
              title: "Kích Cỡ",
              align: "center",
              dataIndex: "kichCo",
              render: (kichCo, record) => kichCo.ten,
              sorter: (a, b) => {
                const kichCoA = parseFloat(a.kichCo.ten);
                const kichCoB = parseFloat(b.kichCo.ten);
                return kichCoA - kichCoB;
              },
            },
            {
              title: "Số lượng",
              align: "center",
              dataIndex: "soLuong",
              render: (soLuong, record) => (
                <InputNumber
                  value={soLuong}
                  min={1}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/,/g, "")}
                  onChange={(newSoLuong) =>
                    handleEditSoLuong(record.key, newSoLuong)
                  }
                />
              ),
            },
            {
              title: "Giá tiền",
              align: "center",
              dataIndex: "giaTien",
              render: (giaTien, record) => (
                <InputNumber
                  value={giaTien}
                  style={{ width: "100%" }}
                  min={0}
                  step={1000}
                  formatter={(value) => `${formatCurrency(value)}`}
                  parser={(value) => value!.replace(/\D/g, "")}
                  onChange={(newGiaTien) =>
                    handleEditGiaTien(record.key, newGiaTien)
                  }
                />
              ),
            },
            {
              dataIndex: "key",
              align: "center",
              width: "1px",
              render: (key) => (
                <Button
                  type="link"
                  style={{ padding: 0 }}
                  onClick={() => deleteItemFromFakeData(key)}
                >
                  <Tooltip title={key}>
                    <DeleteOutlined style={{ color: "red" }} />
                  </Tooltip>
                </Button>
              ),
            },
            {
              title: "Ảnh",
              align: "center",
              dataIndex: "anh",
              width: "10%",
              render: (text, record, index) => {
                if (index === 0) {
                  return {
                    children: (
                      <Button type="link" style={{ padding: 0, fontSize: 30 }}>
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
          onClick={() => handleOpenKichCoModal(firstMauSac)}
          block
        >
          Thêm Kích Cỡ Giày {firstMauSac.ten}
        </Button>
        <KichCoModal
          fakeData={fakeData}
          visible={kichCoModalVisible}
          mauSac={selectedMauSacForModal}
          kichCoOptions={dataKC}
          onCancel={() => setKichCoModalVisible(false)}
          onAddKichCo={handleAddKichCoToFakeData}
        />
      </div>
    );
  });
}

export default TableSanPham;
