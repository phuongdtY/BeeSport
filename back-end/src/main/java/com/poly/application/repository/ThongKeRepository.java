package com.poly.application.repository;

import com.poly.application.model.response.ThongKeSoLuongTonResponse;
import com.poly.application.model.response.ThongKeTheoDMYResponse;
import com.poly.application.model.response.ThongKeTheoDoanhThuResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Repository
public class ThongKeRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public ThongKeTheoDMYResponse thongKeTheoNgay(LocalDate ngayThanhToan) {
        String queryString = "SELECT \n" +
                "   SUM(CASE WHEN du_an_tot_nghiep.giao_dich.trang_thai_giao_dich = 'SUCCESS' THEN du_an_tot_nghiep.giao_dich.so_tien_giao_dich ELSE 0 END) AS tong_tien_thu_duoc,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS so_don_hang_thanh_cong,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'CANCELLED' THEN du_an_tot_nghiep.hoa_don.id END) AS so_don_hang_huy,\n" +
                "   SUM(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don_chi_tiet.so_luong ELSE 0 END) AS tong_so_san_pham_ban_ra,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.loai_hoa_don = 'COUNTER' AND du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS tong_so_don_tai_quay,\n" +  // Đếm các hóa đơn có loại 'COUNTER'
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.loai_hoa_don = 'ONLINE' AND du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS tong_so_don_online \n" +  // Đếm các hóa đơn có loại 'ONLINE'
                "\n" +
                "FROM hoa_don\n" +
                "LEFT JOIN du_an_tot_nghiep.hoa_don_chi_tiet ON du_an_tot_nghiep.hoa_don.id = du_an_tot_nghiep.hoa_don_chi_tiet.hoa_don_id\n" +
                "LEFT JOIN du_an_tot_nghiep.chi_tiet_san_pham ON du_an_tot_nghiep.hoa_don_chi_tiet.chi_tiet_san_pham_id = du_an_tot_nghiep.chi_tiet_san_pham.id \n" +
                "LEFT JOIN du_an_tot_nghiep.giao_dich ON du_an_tot_nghiep.hoa_don.id = du_an_tot_nghiep.giao_dich.hoa_don_id \n" +
                " WHERE DATE(du_an_tot_nghiep.giao_dich.ngay_thanh_toan) = :ngayThanhToan \n" +
                "   OR DATE(du_an_tot_nghiep.giao_dich.ngay_thanh_toan) = :ngayThanhToan";


        Object[] result = (Object[]) entityManager.createNativeQuery(queryString)
                .setParameter("ngayThanhToan", ngayThanhToan)
                .getSingleResult();

        Long tongTien = result[0] != null ? ((Number) result[0]).longValue() : 0L;
        Long soDonThanhCong = result[1] != null ? ((Number) result[1]).longValue() : 0L;
        Long soDonHuy = result[2] != null ? ((Number) result[2]).longValue() : 0L;
        Long soSanPhamDaBan = result[3] != null ? ((Number) result[3]).longValue() : 0L;
        Long tongSoDonTaiQuay = result[4] != null ? ((Number) result[4]).longValue() : 0L;
        Long tongSoDonOnline = result[5] != null ? ((Number) result[5]).longValue() : 0L;

        ThongKeTheoDMYResponse response = new ThongKeTheoDMYResponse();
        response.setTongDoanhThu(tongTien);
        response.setTongSoDonThanhCong(soDonThanhCong);
        response.setTongSoDonHuy(soDonHuy);
        response.setTongSoSanPhamDaBan(soSanPhamDaBan);
        response.setTongSoDonTaiQuay(tongSoDonTaiQuay);
        response.setTongSoDonOnline(tongSoDonOnline);

        return response;
    }

    public ThongKeTheoDMYResponse thongKeTheoTuan(LocalDate startOfWeek, LocalDate endOfWeek) {

        String queryString = "SELECT \n" +
                "   SUM(CASE WHEN du_an_tot_nghiep.giao_dich.trang_thai_giao_dich = 'SUCCESS' THEN du_an_tot_nghiep.giao_dich.so_tien_giao_dich ELSE 0 END) AS tong_tien_thu_duoc,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS so_don_hang_thanh_cong,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'CANCELLED' THEN du_an_tot_nghiep.hoa_don.id END) AS so_don_hang_huy,\n" +
                "   SUM(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don_chi_tiet.so_luong ELSE 0 END) AS tong_so_san_pham_ban_ra,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.loai_hoa_don = 'COUNTER' AND du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS tong_so_don_tai_quay,\n" +  // Đếm các hóa đơn có loại 'COUNTER'
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.loai_hoa_don = 'ONLINE' AND du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS tong_so_don_online \n" +  // Đếm các hóa đơn có loại 'ONLINE'
                "\n" +
                "FROM hoa_don\n" +
                "LEFT JOIN du_an_tot_nghiep.hoa_don_chi_tiet ON du_an_tot_nghiep.hoa_don.id = du_an_tot_nghiep.hoa_don_chi_tiet.hoa_don_id\n" +
                "LEFT JOIN du_an_tot_nghiep.chi_tiet_san_pham ON du_an_tot_nghiep.hoa_don_chi_tiet.chi_tiet_san_pham_id = du_an_tot_nghiep.chi_tiet_san_pham.id\n" +
                "LEFT JOIN du_an_tot_nghiep.giao_dich ON du_an_tot_nghiep.hoa_don.id = du_an_tot_nghiep.giao_dich.hoa_don_id \n" +
                "WHERE (DATE(du_an_tot_nghiep.giao_dich.ngay_thanh_toan) BETWEEN :startOfWeek AND :endOfWeek \n" +
                "   OR DATE(du_an_tot_nghiep.giao_dich.ngay_thanh_toan) BETWEEN :startOfWeek AND :endOfWeek)";

        Object[] result = (Object[]) entityManager.createNativeQuery(queryString)
                    .setParameter("startOfWeek", startOfWeek)
                .setParameter("endOfWeek", endOfWeek)
                .getSingleResult();

        Long tongTien = result[0] != null ? ((Number) result[0]).longValue() : 0L;
        Long soDonThanhCong = result[1] != null ? ((Number) result[1]).longValue() : 0L;
        Long soDonHuy = result[2] != null ? ((Number) result[2]).longValue() : 0L;
        Long soSanPhamDaBan = result[3] != null ? ((Number) result[3]).longValue() : 0L;
        Long tongSoDonTaiQuay = result[4] != null ? ((Number) result[4]).longValue() : 0L;
        Long tongSoDonOnline = result[5] != null ? ((Number) result[5]).longValue() : 0L;


        ThongKeTheoDMYResponse response = new ThongKeTheoDMYResponse();
        response.setTongDoanhThu(tongTien);
        response.setTongSoDonThanhCong(soDonThanhCong);
        response.setTongSoDonHuy(soDonHuy);
        response.setTongSoSanPhamDaBan(soSanPhamDaBan);
        response.setTongSoDonTaiQuay(tongSoDonTaiQuay);
        response.setTongSoDonOnline(tongSoDonOnline);


        return response;
    }

    public Page<ThongKeSoLuongTonResponse> thongKeSoLuongTon(Pageable pageable) {
        String queryString = "SELECT sp.id AS sanPhamId, sp.ten AS tenSanPham, SUM(ct.so_luong) AS tongSoLuong " +
                "FROM chi_tiet_san_pham ct " +
                "INNER JOIN san_pham sp ON ct.san_pham_id = sp.id " +
                "GROUP BY sp.id, sp.ten " +
                "ORDER BY tongSoLuong ASC";

        List<Object[]> results = entityManager.createNativeQuery(queryString)
                .getResultList();

        // Chuyển đổi kết quả sang ThongKeSoLuongTonResponse
        List<ThongKeSoLuongTonResponse> dtos = new ArrayList<>();
        for (Object[] result : results) {
            ThongKeSoLuongTonResponse dto = new ThongKeSoLuongTonResponse();
            dto.setId(result[0] != null ? ((Number) result[0]).longValue() : 0L);
            dto.setTen(result[1] != null ? (String) result[1] : "");
            dto.setSoLuongTon(result[2] != null ? ((Number) result[2]).intValue() : 0);
            dtos.add(dto);
        }

        // Trả về dữ liệu dưới dạng Page
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), dtos.size());
        return new PageImpl<>(dtos.subList(start, end), pageable, dtos.size());
    }

    public Page<ThongKeTheoDoanhThuResponse> thongKeTheoDoanhThu(Pageable pageable) {
        String queryString = "SELECT sp.id, sp.ten AS tenSanPham," +
                "       SUM(hdct.so_luong) AS tongSoLuongBan," +
                "       SUM(gd.so_tien_giao_dich) AS doanhThu " +
                "FROM san_pham sp " +
                "JOIN chi_tiet_san_pham ctsp ON sp.id = ctsp.san_pham_id " +
                "JOIN hoa_don_chi_tiet hdct ON ctsp.id = hdct.chi_tiet_san_pham_id " +
                "JOIN hoa_don hd ON hdct.hoa_don_id = hd.id " +
                "JOIN giao_dich gd ON hd.id = gd.hoa_don_id " +
                "WHERE gd.trang_thai_giao_dich = 'SUCCESS' " +
                "GROUP BY sp.id, sp.ten " +
                "ORDER BY doanhThu DESC";

        List<Object[]> results = entityManager.createNativeQuery(queryString)
                .getResultList();

        // Chuyển đổi kết quả sang ThongKeSoLuongTonResponse
        List<ThongKeTheoDoanhThuResponse> dtos = new ArrayList<>();
        for (Object[] result : results) {
            ThongKeTheoDoanhThuResponse dto = new ThongKeTheoDoanhThuResponse();
            dto.setId(result[0] != null ? ((Number) result[0]).longValue() : 0L);
            dto.setTen(result[1] != null ? (String) result[1] : "");
            dto.setSoLuongDaBan(result[2] != null ? ((Number) result[2]).intValue() : 0);
            dto.setDoanhThu(result[3] != null ? new BigDecimal(( result[3]).toString()) : BigDecimal.ZERO);
            dtos.add(dto);
        }

        // Trả về dữ liệu dưới dạng Page
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), dtos.size());
        return new PageImpl<>(dtos.subList(start, end), pageable, dtos.size());
    }

    public List<ThongKeSoLuongTonResponse> thongKeSoLuongTonList() {
        String queryString = "SELECT sp.id AS sanPhamId, sp.ten AS tenSanPham, SUM(ct.so_luong) AS tongSoLuong " +
                "FROM chi_tiet_san_pham ct " +
                "INNER JOIN san_pham sp ON ct.san_pham_id = sp.id " +
                "GROUP BY sp.id, sp.ten " +
                "ORDER BY tongSoLuong ASC";

        List<Object[]> results = entityManager.createNativeQuery(queryString)
                .getResultList();

        // Chuyển đổi kết quả sang ThongKeSoLuongTonResponse
        List<ThongKeSoLuongTonResponse> dtos = new ArrayList<>();
        for (Object[] result : results) {
            ThongKeSoLuongTonResponse dto = new ThongKeSoLuongTonResponse();
            dto.setId(result[0] != null ? ((Number) result[0]).longValue() : 0L);
            dto.setTen(result[1] != null ? (String) result[1] : "");
            dto.setSoLuongTon(result[2] != null ? ((Number) result[2]).intValue() : 0);
            dtos.add(dto);
        }

        return dtos;
    }


}
