import request from "../utils/request";
import { DataParams, TableParams } from "../interfaces/nhanVien.type";

export const fetchData = async (params: TableParams) => {
  const local123 = localStorage.getItem('refreshToken');
  console.log(local123);

  try {
    const res = await request.get("nhan-vien", {
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
    const res = await request.get("nhan-vien/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


