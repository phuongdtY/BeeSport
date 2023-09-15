package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, Long> {

    @Query("SELECT obj FROM MauSac obj WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<MauSac> findByALl(Pageable pageable, String searchText, CommonEnum.TrangThaiThuocTinh trangThai);

    boolean existsByMa (String ma);
    boolean existsByTen ( String ten);
}
