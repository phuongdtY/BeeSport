package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.EnumSet;
import java.util.List;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {

    @Query("SELECT tk FROM TaiKhoan tk " +
            "JOIN tk.taiKhoanVaiTroList vt " +
            "WHERE vt.vaiTro.ten = :roleName " +
            "AND (tk.hoVaTen LIKE %:searchText% OR tk.soDienThoai LIKE %:searchText% OR tk.email LIKE %:searchText% OR tk.canCuocCongDan LIKE %:searchText%) " +
            "AND (:trangThai IS NULL OR tk.trangThai = :trangThai) " +
            "AND (:gioiTinh IS NULL OR tk.gioiTinh = :gioiTinh)")
    Page<TaiKhoan> findAllByVaiTro(
            Pageable pageable,
            @Param("roleName") String roleName,
            @Param("searchText") String searchText,
            @Param("trangThai") Integer trangThai,
            @Param("gioiTinh") CommonEnum.GioiTinh gioiTinh
    );


    TaiKhoan findBySoDienThoai(String sdt);

    TaiKhoan findByCanCuocCongDan(String canCuoc);

    boolean existsByCanCuocCongDan(String canCuoc);

    boolean existsBySoDienThoai(String sdt);
}
