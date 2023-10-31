import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080/admin/api",
  timeout: 3000,
});
export const requestTimMatKhau = axios.create({
  baseURL: "http://localhost:8080/admin/api",
  timeout: 10000,
});

export default request;
