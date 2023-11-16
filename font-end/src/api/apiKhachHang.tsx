import request from "../utils/request";
import { DataParams, TableParams } from "../interfaces/khachHang.type";

export const fetchData = async (params: TableParams) => {
  const local123 = localStorage.getItem('refreshToken');
  console.log(local123);

  try {
    const res = await request.get("khach-hang", {
      params,  // Chỉ gửi params thay vì { params: { params } }
      headers: {
        Authorization: `Bearer ${local123}` // Sử dụng template literal để tránh lỗi khi local123 là null
      }
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneUser = async (id: number) => {
  try {
    const res = await request.get("khach-hang/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
