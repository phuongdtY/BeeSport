import { Routes, Route } from "react-router-dom";
import IndexNhanVien from "./pages/admin/nhan-vien/index";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AddNV from "./pages/admin/nhan-vien/add";
import IndexMauSac from "./pages/admin/mau-sac/index";
import AddMauSac from "./pages/admin/mau-sac/add";
import UpdateMauSac from "./pages/admin/mau-sac/update";
import IndexSanPham from "./pages/admin/san-pham/index";
import AddSanPham from "./pages/admin/san-pham/add";
import IndexThuongHieu from "./pages/admin/thuong-hieu/index";
import AddThuongHieu from "./pages/admin/thuong-hieu/add";
import UpdateThuongHieu from "./pages/admin/thuong-hieu/update";
import IndexDiaHinhSan from "./pages/admin/dia-hinh-san/index";
import AddDiaHinhSan from "./pages/admin/dia-hinh-san/add";
import UpdateDiaHinhSan from "./pages/admin/dia-hinh-san/update";
import IndexLoaiDe from "./pages/admin/loai-de/index";
import AddLoaiDe from "./pages/admin/loai-de/add";
import UpdateLoaiDe from "./pages/admin/loai-de/update";
import "./App.css";
import ShopLayout from "./layouts/ShopLayout/ShopLayout";
import Home from "./pages/shop/home/Home";
import GioHang from "./pages/shop/gio-hang/GioHang";
import ThanhToan from "./pages/shop/thanh-toan/ThanhToan";
import IndexVoucher from "./pages/admin/voucher/index";
import AddVoucher from "./pages/admin/voucher/add";
import UpdateVoucher from "./pages/admin/voucher/update";
import IndexHoaDon from "./pages/admin/hoa-don";
import IndexKichCo from "./pages/admin/kich-co";
import AddKichCo from "./pages/admin/kich-co/add";
import UpdateKichCo from "./pages/admin/kich-co/update";
import DetailHoaDon from "./pages/admin/hoa-don/detailHoaDon";
import DetailSanPham from "./pages/shop/san-pham/detail";
import BanHangTaiQuay from "./pages/admin/ban-hang-tai-quay/BanHangTaiQuay.tsx";
import UpdateSanPham from "./pages/admin/san-pham/UpdateSanPham.tsx";

function App() {
  return (
    <Routes>
      <Route path="/thanh-toan" element={<ThanhToan />} />
      <Route path="" element={<ShopLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gio-hang" element={<GioHang />} />
      </Route>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="nhan-vien" element={<IndexNhanVien />} />
        <Route path="ban-hang-tai-quay" element={<BanHangTaiQuay />} />
        <Route path="nhan-vien/add" element={<AddNV />} />
        <Route path="mau-sac" element={<IndexMauSac />} />
        <Route path="mau-sac/add" element={<AddMauSac />} />
        <Route path="mau-sac/update/:id" element={<UpdateMauSac />} />
        <Route path="san-pham" element={<IndexSanPham />} />
        <Route path="san-pham/add" element={<AddSanPham />} />
        <Route path="san-pham/update/:id" element={<UpdateSanPham />} />
        <Route path="thuong-hieu" element={<IndexThuongHieu />} />
        <Route path="thuong-hieu/add" element={<AddThuongHieu />} />
        <Route path="thuong-hieu/update/:id" element={<UpdateSanPham />} />
        <Route path="dia-hinh-san" element={<IndexDiaHinhSan />} />
        <Route path="dia-hinh-san/add" element={<AddDiaHinhSan />} />
        <Route path="dia-hinh-san/update/:id" element={<UpdateDiaHinhSan />} />
        <Route path="loai-de" element={<IndexLoaiDe />} />
        <Route path="loai-de/add" element={<AddLoaiDe />} />
        <Route path="loai-de/update/:id" element={<UpdateLoaiDe />} />
        <Route path="voucher" element={<IndexVoucher />} />
        <Route path="voucher/add" element={<AddVoucher />} />
        <Route path="voucher/:id" element={<UpdateVoucher />} />
        <Route path="hoa-don" element={<IndexHoaDon />} />
        <Route path="kich-co" element={<IndexKichCo />} />
        <Route path="kich-co/add" element={<AddKichCo />} />
        <Route path="kich-co/:id" element={<UpdateKichCo />} />
        <Route path="hoa-don/:id" element={<DetailHoaDon />} />
      </Route>
    </Routes>
  );
}

export default App;
