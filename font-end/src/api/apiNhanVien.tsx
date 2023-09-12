import request from "../utils/request";
import { DataParams, TableParams } from "../interfaces/nhanVien.type";

export const fetchData = async (params: TableParams) => {
  try {
    const res = await request.get("nhan-vien", { params });
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
