import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080/admin/api",
  timeout: 3000,
});
export const requestTimMatKhau = axios.create({
  baseURL: "http://localhost:8080/admin/api",
  timeout: 10000,
  
});
export const requestTimMatKhau1 = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  
});
export const requestDangNhap = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  
});
export const requestDangKi = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

export default request;
