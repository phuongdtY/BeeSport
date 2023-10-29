import { Button, Tabs, message } from "antd";
import React, { useRef, useState } from "react";
import GioHangTaiQuay from "./GioHangTaiQuay";
import request from "~/utils/request";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: "HD01", children: <GioHangTaiQuay />, key: "1" },
];

const TaiQuay: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(1);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = async () => {
    if (items.length >= 7) {
      message.warning("Số lượng hóa đơn chờ đã đạt mức tối đa");
      return;
    }

    try {
      // Thực hiện yêu cầu POST đến API
      const response = await request.post("hoa-don/add", {
        ma: "HD123",
      });
      const newActiveKey = `newTab${newTabIndex.current++}`;
      const newPanes = [...items];
      newPanes.push({
        label: response.data.ma,
        children: <GioHangTaiQuay />,
        key: newActiveKey,
      });
      setItems(newPanes);
      setActiveKey(newActiveKey);
    } catch (error) {
      // Xử lý lỗi từ API nếu có
      message.error("Lỗi khi thêm tab: " + error);
    }
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </>
  );
};

export default TaiQuay;
