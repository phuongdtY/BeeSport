package com.poly.application.repository;

import com.poly.application.entity.HinhAnhSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HinhAnhSanPhamRepository extends JpaRepository<HinhAnhSanPham, Long> {

    @Query("SELECT ha FROM HinhAnhSanPham ha WHERE ha.sanPham.id = :idSanPham AND (:idMauSac IS NULL OR ha.mauSac.id = :idMauSac OR :idMauSac = '')")
    List<HinhAnhSanPham> getAll(@Param("idSanPham") Long idSanPham, @Param("idMauSac") Long idMauSac);

}
