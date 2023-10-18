package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, Long> {

    @Query("SELECT ms FROM MauSac ms ORDER BY ms.ngayTao DESC")
    List<MauSac> getMauSacByNgayTaoDESC();

    @Query("SELECT obj FROM MauSac obj WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<MauSac> findByAll(Pageable pageable, String searchText, CommonEnum.TrangThaiThuocTinh trangThai);

    boolean existsByMa (String ma);
    boolean existsByTen ( String ten);
    @Query("SELECT DISTINCT ms FROM ChiTietSanPham ctsp JOIN MauSac ms ON ctsp.mauSac.id = ms.id  WHERE ctsp.sanPham.id = :idSanPham")
    List<MauSac> getMauSacKhongLap(Long idSanPham);
}
