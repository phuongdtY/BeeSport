import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Button, Empty } from "antd";
import request from "~/utils/request";

function ModalAddKichCo({ openModal, closeModal, data, mauSac }) {
  const [dataKichCo, setDataKichCo] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [availableKichCoOptions, setAvailableKichCoOptions] = useState([]);

  const fetchDataKC = async () => {
    try {
      const res = await request.get("kich-co/list");
      setDataKichCo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataKC();
    if (mauSac && mauSac.id) {
      const mauSacFakeData = data.filter(
        (item) => item.mauSac.id === mauSac.id
      );
      const kichCoIdsInFakeData = mauSacFakeData.map((item) => item.kichCo.id);

      const newAvailableOptions = dataKichCo.filter(
        (kichCo) => !kichCoIdsInFakeData.includes(kichCo.id)
      );

      setAvailableKichCoOptions(newAvailableOptions);
    }
  }, [data, dataKichCo]);

  useEffect(() => {
    if (availableKichCoOptions.length === 0) {
      setSelectAll(false);
      setIndeterminate(false);
    } else {
      setSelectAll(checkedKeys.length === availableKichCoOptions.length);
      setIndeterminate(
        checkedKeys.length > 0 &&
          checkedKeys.length < availableKichCoOptions.length
      );
    }
  }, [checkedKeys, availableKichCoOptions]);

  const toggleChecked = (kichCoKey) => {
    const updatedCheckedKeys = [...checkedKeys];

    if (updatedCheckedKeys.includes(kichCoKey)) {
      updatedCheckedKeys.splice(updatedCheckedKeys.indexOf(kichCoKey), 1);
    } else {
      updatedCheckedKeys.push(kichCoKey);
    }
    setCheckedKeys(updatedCheckedKeys);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setCheckedKeys([]);
    } else {
      setCheckedKeys(dataKichCo.map((kichCo) => kichCo.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <Modal
      title={`THÊM KÍCH CỠ CHO GIÀY ${mauSac ? mauSac.ten.toUpperCase() : ""}`}
      open={openModal} // Use 'visible' instead of 'open'
      onCancel={closeModal}
    >
      <div>
        {dataKichCo.length === 0 ? null : (
          <Checkbox
            style={{ marginLeft: 5 }}
            checked={selectAll}
            indeterminate={indeterminate}
            onChange={toggleSelectAll}
          >
            Chọn tất cả
          </Checkbox>
        )}
        <br />
        {dataKichCo.length === 0 ? (
          <Empty />
        ) : (
          dataKichCo.map((kichCo) => (
            <Button
              key={kichCo.id}
              style={{ width: 60, height: 40, margin: 5 }}
              type={checkedKeys.includes(kichCo.id) ? "primary" : "default"}
              size="small"
              onClick={() => toggleChecked(kichCo.id)}
            >
              {kichCo.kichCo}
            </Button>
          ))
        )}
      </div>
    </Modal>
  );
}

export default ModalAddKichCo;
