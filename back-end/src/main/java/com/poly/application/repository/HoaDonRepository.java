package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon,Long> {

    @Query("SELECT hd FROM HoaDon hd " +
            "WHERE (hd.ma LIKE %:searchText%) " +
            "AND (:loaiHoaDon IS NULL OR hd.loaiHoaDon = :loaiHoaDon ) " +
            "AND (:trangThaiHoaDon IS NULL OR hd.trangThaiHoaDon = :trangThaiHoaDon)")
    Page<HoaDon> findPageHoaDon(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("loaiHoaDon") CommonEnum.LoaiHoaDon loaiHoaDon,
            @Param("trangThaiHoaDon") CommonEnum.TrangThaiHoaDon trangThaiHoaDon
    );

    Boolean existsByMa(String ma);

    @Query("SELECT hd FROM HoaDon hd WHERE hd.trangThaiHoaDon = 'PENDING' AND hd.loaiHoaDon = 'COUNTER' ORDER BY hd.ngayTao DESC LIMIT 3")
    List<HoaDon> get7HoaDonPendingByDate();
}
