package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query("SELECT obj FROM Voucher obj WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%)" +
            "AND (:hinhThucGiamGiaId IS NULL OR obj.hinhThucGiamGia.id = :hinhThucGiamGiaId OR :hinhThucGiamGiaId = '')" +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai)" +
            "AND (:ngayBatDau IS NULL OR obj.ngayBatDau >= :ngayBatDau)"+
            "AND (:ngayKetThuc IS NULL OR obj.ngayKetThuc <= :ngayKetThuc)")
    Page<Voucher> findByALl(Pageable pageable, String searchText, Long hinhThucGiamGiaId, CommonEnum.TrangThaiVoucher trangThai,
                            LocalDateTime  ngayBatDau, LocalDateTime ngayKetThuc);

    boolean existsByTen(String ten);

//    @Query("SELECT v FROM Voucher v WHERE v.trangThai IN (:trangThaiList) ORDER BY v.ngaySua DESC")
//    List<Voucher> getListVoucher(@Param("trangThaiList") List<CommonEnum.TrangThaiVoucher> trangThaiList);
    @Query("SELECT v FROM Voucher v WHERE v.trangThai IN ('ONGOING', 'UPCOMING', 'ENDING_SOON', 'OUT_OF_STOCK') ORDER BY v.ngayTao DESC")
    List<Voucher> getListVoucher();

    Optional<Voucher> findByMa(String ma);
}
