import { Routes, Route } from "react-router-dom";
import IndexNhanVien from "./pages/admin/nhan-vien/index";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AddNV from "./pages/admin/nhan-vien/add";
import IndexMauSac from "./pages/admin/mau-sac/index";
import AddMauSac from "./pages/admin/mau-sac/add";
import UpdateMauSac from "./pages/admin/mau-sac/update";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="nhan-vien" element={<IndexNhanVien />} />
        <Route path="nhan-vien/add" element={<AddNV />} />
        <Route path="mau-sac" element={<IndexMauSac />} />
        <Route path="mau-sac/add" element={<AddMauSac />} />
        <Route path="mau-sac/:id" element={<UpdateMauSac />} />
      </Route>
    </Routes>
  );
}

export default App;
