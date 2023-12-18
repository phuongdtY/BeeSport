package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon,Long> {

    @Query("SELECT hd FROM HoaDon hd " +
            "LEFT JOIN hd.taiKhoan " +
            "WHERE (" +
            "hd.ma LIKE %:searchText% OR hd.taiKhoan.hoVaTen LIKE %:searchText% OR " +
            "hd.taiKhoan.soDienThoai LIKE %:searchText% OR hd.taiKhoan.email LIKE %:searchText% OR " +
            "hd.nguoiNhan LIKE %:searchText% OR hd.sdtNguoiNhan LIKE %:searchText% OR " +
            "hd.emailNguoiNhan LIKE %:searchText%) " +
            "AND (:loaiHoaDon IS NULL OR hd.loaiHoaDon = :loaiHoaDon ) " +
            "AND (:trangThaiHoaDon IS NULL OR hd.trangThaiHoaDon = :trangThaiHoaDon)")
    Page<HoaDon> findPageHoaDon(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("loaiHoaDon") CommonEnum.LoaiHoaDon loaiHoaDon,
            @Param("trangThaiHoaDon") CommonEnum.TrangThaiHoaDon trangThaiHoaDon
    );

    Boolean existsByMa(String ma);

    @Query("SELECT hd FROM HoaDon hd WHERE hd.trangThaiHoaDon = 'PENDING' AND hd.loaiHoaDon = 'COUNTER' ORDER BY hd.ngayTao")
    List<HoaDon> get7HoaDonPendingByDate();

    @Transactional
    @Modifying
    @Query("UPDATE HoaDon hd SET hd.trangThaiHoaDon = :trangThai WHERE hd.id = :id")
    void updateTrangThaiHoaDon(
            @Param("trangThai") CommonEnum.TrangThaiHoaDon trangThaiHoaDon,
            @Param("id")Long id
    );
    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE hd.trangThaiHoaDon = 'PENDING' AND hd.loaiHoaDon = 'COUNTER'")
    Long getSoLuongHoaDonCho();

}
