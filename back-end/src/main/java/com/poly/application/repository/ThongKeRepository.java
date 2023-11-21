package com.poly.application.repository;

import com.poly.application.model.response.ThongKeTheoDMYResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;


@Repository
public class ThongKeRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public ThongKeTheoDMYResponse thongKeTheoNgay(LocalDate ngayThanhToan) {
        String queryString = "SELECT \n" +
                "   SUM(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.tong_tien_khi_giam ELSE 0 END) AS tong_tien_thu_duoc,\n" +
                "   COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don.id END) AS so_don_hang_thanh_cong,\n" +
                "    COUNT(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'CANCELLED' THEN du_an_tot_nghiep.hoa_don.id END) AS so_don_hang_huy,\n" +
                "SUM(CASE WHEN du_an_tot_nghiep.hoa_don.trang_thai = 'APPROVED' THEN du_an_tot_nghiep.hoa_don_chi_tiet.so_luong ELSE 0 END) AS tong_so_san_pham_ban_ra\n" +
                "\n" +
                "FROM hoa_don\n" +
                "LEFT JOIN du_an_tot_nghiep.hoa_don_chi_tiet ON du_an_tot_nghiep.hoa_don.id = du_an_tot_nghiep.hoa_don_chi_tiet.hoa_don_id\n" +
                "LEFT JOIN du_an_tot_nghiep.chi_tiet_san_pham ON du_an_tot_nghiep.hoa_don_chi_tiet.chi_tiet_san_pham_id = du_an_tot_nghiep.chi_tiet_san_pham.id\n" +
                "WHERE DATE(du_an_tot_nghiep.hoa_don.ngay_tao) = :ngayThanhToan";

        Object[] result = (Object[]) entityManager.createNativeQuery(queryString)
                .setParameter("ngayThanhToan", ngayThanhToan)
                .getSingleResult();

        Long tongTien = ((Number) result[0]).longValue();
        Long soDonThanhCong = ((Number) result[1]).longValue();
        Long soDonHuy = ((Number) result[2]).longValue();
        Long soSanPhamDaBan = ((Number) result[3]).longValue();

        ThongKeTheoDMYResponse response = new ThongKeTheoDMYResponse();
        response.setTongDoanhThu(tongTien);
        response.setTongSoDonThanhCong(soDonThanhCong);
        response.setTongSoDonHuy(soDonHuy);
        response.setTongSoSanPhamDaBan(soSanPhamDaBan);


        return response;
    }

}
