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

    @Query("SELECT hdct FROM HoaDonChiTiet hdct " +
            "WHERE (hdct.chiTietSanPham.sanPham.ten LIKE %:searchText%) " +
            "AND (hdct.hoaDon.id = :idHoaDon)")
    Page<HoaDonChiTiet> findPageHoaDonChiTiet(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("idHoaDon")Long id
    );

    Boolean existsHoaDonChiTietByChiTietSanPhamIdAndHoaDonId(Long chiTietSanPhamId, Long hoaDonId);

    HoaDonChiTiet findHoaDonChiTietByChiTietSanPhamIdAndHoaDonId(Long chiTietSanPhamId, Long hoaDonI);

}
