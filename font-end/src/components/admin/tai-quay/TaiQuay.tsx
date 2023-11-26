import { Tabs, message } from "antd";
import React, { useRef, useState, useEffect } from "react";
import GioHangTaiQuay from "./GioHangTaiQuay";
import request from "~/utils/request";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TaiQuay: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const [hoaDonCho, setHoaDonCho] = useState(0);
  const newTabIndex = useRef(1);

  const fetchRecentInvoices = async () => {
    try {
      const response = await request.get("hoa-don/hoa-don-cho");
      const recentInvoices = response.data;
      setHoaDonCho(response.data.length);
      // Cập nhật danh sách các tab với hóa đơn mới nhất
      const newPanes = recentInvoices.map((invoice: any) => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        return {
          label: invoice.ma,
          children: (
            <GioHangTaiQuay loadHoaDon={fetchRecentInvoices} id={invoice.id} />
          ),
          key: newActiveKey,
        };
      });

      setItems(newPanes);

      // Đặt tab đầu tiên là active khi danh sách được cập nhật
      if (newPanes.length > 0) {
        setActiveKey(newPanes[0].key);
      }
    } catch (error) {
      // Xử lý lỗi từ API nếu có
      message.error("Lỗi khi tải danh sách hóa đơn: " + error);
    }
  };

  useEffect(() => {
    // Gọi API để lấy danh sách 5 hóa đơn mới nhất
    fetchRecentInvoices();
  }, []);

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
      const response = await request.post("hoa-don", {
        loaiHoaDon: "COUNTER",
        trangThaiHoaDon: "PENDING",
      });
      const newActiveKey = `newTab${newTabIndex.current++}`;
      const newPanes = [...items];
      newPanes.push({
        label: response.data.ma,
        children: (
          <GioHangTaiQuay
            loadHoaDon={fetchRecentInvoices}
            id={response.data.id}
          />
        ),
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
