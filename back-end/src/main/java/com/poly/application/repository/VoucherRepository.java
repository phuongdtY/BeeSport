package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import com.poly.application.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query("SELECT obj FROM Voucher obj WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%)" +
            "AND (:hinhThucGiamGiaId IS NULL OR obj.hinhThucGiamGia.id = :hinhThucGiamGiaId OR :hinhThucGiamGiaId = '')" +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<Voucher> findByALl(Pageable pageable, String searchText, Long hinhThucGiamGiaId, CommonEnum.TrangThaiVoucher trangThai);

}
