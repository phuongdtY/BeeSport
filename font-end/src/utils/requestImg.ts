import axios from "axios";
 const request4s = axios.create({
    baseURL: "http://localhost:8080/admin/api",
    timeout: 5000,
  });
  request4s.interceptors.request.use(
    (config) => {
      const local123 = localStorage.getItem('refreshToken');
      if (local123) {
        config.headers.Authorization = `Bearer ${local123}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default request4s;