package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {

    @Query("SELECT obj FROM SanPham obj " +
            "WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) " +
            "AND (obj.thuongHieu.id = :thuongHieuId OR :thuongHieuId IS NULL) " +
            "AND (obj.loaiDe.id = :loaiDeId OR :loaiDeId IS NULL) " +
            "AND (obj.diaHinhSan.id = :diaHinhSanId OR :diaHinhSanId IS NULL) " +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<SanPham> findByAll(Pageable pageable, String searchText, Long thuongHieuId, Long loaiDeId, Long diaHinhSanId, CommonEnum.TrangThaiSanPham trangThai);

    boolean existsByMa (String ma);

    boolean existsByTen (String ten);

}
