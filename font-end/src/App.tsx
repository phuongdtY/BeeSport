import { Routes, Route } from "react-router-dom";
import IndexNhanVien from "./pages/admin/nhan-vien/index";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AddNV from "./pages/admin/nhan-vien/add";
import IndexMauSac from "./pages/admin/mau-sac/index";
import AddMauSac from "./pages/admin/mau-sac/add";
import UpdateMauSac from "./pages/admin/mau-sac/update";
import IndexVoucher from "./pages/admin/voucher/index";
import AddVoucher from "./pages/admin/voucher/add";
import UpdateVoucher from "./pages/admin/voucher/update";                      
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
        <Route path="voucher" element={<IndexVoucher />} />
        <Route path="voucher/add" element={<AddVoucher />} />
        <Route path="voucher/:id" element={<UpdateVoucher />} />
      </Route>
    </Routes>
  );
}

export default App;
