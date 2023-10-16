package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.KichCo;
import com.poly.application.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaHinhSanRepository extends JpaRepository<DiaHinhSan, Long> {

    @Query("SELECT obj FROM DiaHinhSan obj WHERE (obj.ten LIKE %:searchText%) AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<DiaHinhSan> findByAll(Pageable pageable, String searchText, CommonEnum.TrangThaiThuocTinh trangThai);

    boolean existsByTen( String ten);

    @Query("SELECT DISTINCT dhs FROM ChiTietSanPham ctsp JOIN DiaHinhSan dhs ON ctsp.diaHinhSan.id = dhs.id  WHERE ctsp.sanPham.id = :idSanPham")
    List<DiaHinhSan> getDiaHinhSanKhongLap(Long idSanPham);

}

