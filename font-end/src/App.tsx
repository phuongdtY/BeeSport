import { Routes, Route } from "react-router-dom";
import IndexNhanVien from "./pages/admin/nhan-vien/index";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AddNV from "./pages/admin/nhan-vien/add";
import IndexHoaDon from "./pages/admin/hoa-don";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="nhan-vien" element={<IndexNhanVien />} />
        <Route path="nhan-vien/add" element={<AddNV />} />
        <Route path="hoa-don" element={<IndexHoaDon />}/>
      </Route>
    </Routes>
  );
}

export default App;
