package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.HoaDonChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Long> {

    List<HoaDonChiTiet> findAllByHoaDonId(Long id);

    @Query("SELECT hd FROM HoaDon hd " +
            "WHERE (hd.ma LIKE %:searchText%) " +
            "AND (:loaiHoaDon IS NULL OR hd.loaiHoaDon = :loaiHoaDon ) " +
            "AND (:trangThaiHoaDon IS NULL OR hd.trangThaiHoaDon = :trangThaiHoaDon)")
    Page<HoaDonChiTiet> findPageHoaDonChiTiet(
            Pageable pageable,
            @Param("searchText") String searchText
    );


}
