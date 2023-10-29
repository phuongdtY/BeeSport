import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Button, Empty, Space } from "antd";

function KichCoModal({
  fakeData,
  visible,
  mauSac,
  kichCoOptions,
  onCancel,
  onAddKichCo,
}) {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [availableKichCoOptions, setAvailableKichCoOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // Add selectAll state
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    if (mauSac && mauSac.id) {
      const mauSacFakeData = fakeData.filter(
        (item) => item.mauSac.id === mauSac.id
      );
      const kichCoIdsInFakeData = mauSacFakeData.map((item) => item.kichCo.id);

      const newAvailableOptions = kichCoOptions.filter(
        (kichCo) => !kichCoIdsInFakeData.includes(kichCo.id)
      );

      setAvailableKichCoOptions(newAvailableOptions);
    }
  }, [visible, mauSac, fakeData, kichCoOptions]);

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
      setCheckedKeys(availableKichCoOptions.map((kichCo) => kichCo.id));
    }
    setSelectAll(!selectAll);
  };

  const handleAddKichCo = () => {
    if (mauSac && mauSac.id) {
      onAddKichCo(mauSac.id, checkedKeys);
      setCheckedKeys([]);
    }
    onCancel();
  };

  return (
    <Modal
      title={`THÊM KÍCH CỠ CHO GIÀY ${mauSac ? mauSac.ten.toUpperCase() : ""}`}
      visible={visible}
      onOk={handleAddKichCo}
      onCancel={onCancel}
    >
      <div>
        {availableKichCoOptions.length === 0 ? null : (
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
        {availableKichCoOptions.length === 0 ? (
          <Empty />
        ) : (
          availableKichCoOptions.map((kichCo) => (
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

export default KichCoModal;
