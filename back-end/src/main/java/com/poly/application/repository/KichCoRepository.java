package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.KichCo;
import com.poly.application.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KichCoRepository extends JpaRepository<KichCo, Long> {

    @Query("SELECT obj FROM KichCo obj WHERE (CAST(obj.kichCo AS string) LIKE %:searchText%) AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<KichCo> findByAll(Pageable pageable, String searchText, CommonEnum.TrangThaiThuocTinh trangThai);

    boolean existsByKichCo(Float kichCo);

    @Query("SELECT DISTINCT kc FROM ChiTietSanPham ctsp JOIN KichCo kc ON ctsp.kichCo.id = kc.id  WHERE ctsp.sanPham.id = :idSanPham")
    List<KichCo> getKichCoKhongLap(Long idSanPham);

}
