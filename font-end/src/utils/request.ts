import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080/admin/api",
  timeout: 3000,
});
export const request4s = axios.create({
  baseURL: "http://localhost:8080/admin/api",
  timeout: 5000,
});

export default request;
