package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.Voucher;
import com.poly.application.entity.VoucherChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query("SELECT obj FROM Voucher obj WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%)" +
            "AND (:hinhThucGiamGiaId IS NULL OR obj.hinhThucGiamGia.id = :hinhThucGiamGiaId OR :hinhThucGiamGiaId = '')" +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai)" +
            "AND (:ngayBatDau IS NULL OR obj.ngayBatDau >= :ngayBatDau)" +
            "AND (:ngayKetThuc IS NULL OR obj.ngayKetThuc <= :ngayKetThuc)")
    Page<Voucher> findByALl(Pageable pageable, String searchText, Long hinhThucGiamGiaId, CommonEnum.TrangThaiVoucher trangThai,
                            LocalDateTime ngayBatDau, LocalDateTime ngayKetThuc);

    boolean existsByTen(String ten);

    //    @Query("SELECT v FROM Voucher v WHERE v.trangThai IN (:trangThaiList) ORDER BY v.ngaySua DESC")
//    List<Voucher> getListVoucher(@Param("trangThaiList") List<CommonEnum.TrangThaiVoucher> trangThaiList);
    @Query("SELECT v FROM Voucher v WHERE v.trangThai IN ('ONGOING', 'UPCOMING', 'ENDING_SOON') ORDER BY v.ngaySua DESC")
    List<Voucher> getListVoucher();

    @Query("SELECT v \n" +
            "FROM Voucher v\n" +
            "WHERE v.id NOT IN (SELECT vct.voucher.id FROM VoucherChiTiet vct WHERE v.trangThai IN ('ONGOING','ENDING_SOON'))\n" +
            "   OR (:idTaiKhoan IS NOT NULL AND v.id IN (SELECT vct.voucher.id FROM VoucherChiTiet vct WHERE vct.taiKhoan.id = :idTaiKhoan AND vct.soLanSuDung > 0))\n")
    List<Voucher> getListVoucherOK(@Param("idTaiKhoan") Long id);

    @Query("SELECT v FROM Voucher v  " +
            "WHERE v.id NOT IN (SELECT vct.voucher.id FROM VoucherChiTiet vct WHERE v.trangThai IN ('ONGOING','ENDING_SOON'))\n" +
            "   OR (:idTaiKhoan IS NOT NULL AND v.id IN (SELECT vct.voucher.id FROM VoucherChiTiet vct WHERE vct.taiKhoan.id = :idTaiKhoan AND vct.soLanSuDung > 0))\n")
    List<Voucher> getListVoucherSuDung(@Param("idTaiKhoan") Long idTaiKhoan);


    @Query("SELECT v FROM Voucher v WHERE v.trangThai != 'CANCELLED'")
    List<Voucher> danhSachVoucherKhongHuy();

    Optional<Voucher> findByMa(String ma);

    @Query("SELECT COUNT(hd) " +
            "FROM HoaDon hd " +
            "WHERE hd.voucher.id = :idVoucher " +
            "AND CAST(hd.ngayThanhToan AS date) BETWEEN :startDate AND :endDate")
    Long soLanDaSuDung(@Param("idVoucher") Long idVoucher,
                       @Param("startDate") LocalDate startDate,
                       @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(hd) " +
            "FROM HoaDon hd " +
            "WHERE hd.voucher.id = :idVoucher " +
            "AND hd.taiKhoan.id = :idTaiKhoan")
    Long soLanDaSuDungVoucherTaiKhoan(@Param("idVoucher") Long idVoucher,
                                      @Param("idTaiKhoan") Long idTaiKhoan);

    @Query("SELECT vct FROM VoucherChiTiet vct WHERE vct.voucher.id = :idVoucher AND vct.taiKhoan.id = :idTaiKhoan")
    VoucherChiTiet findVoucherChiTiet(
            @Param("idVoucher") Long idVoucher,
            @Param("idTaiKhoan")Long idTaiKhoan
    );

    @Transactional
    @Modifying
    @Query("UPDATE VoucherChiTiet vct SET vct.soLanSuDung = :soLuong WHERE vct.id= :id")
    void updateSoLuongVoucherChiTietHoaDon(
            @Param("soLuong") Integer soLuong,
            @Param("id")Long id
    );

    @Query("SELECT CASE WHEN COUNT(vct) > 0 THEN true ELSE false END FROM VoucherChiTiet vct WHERE vct.taiKhoan.id = :idTaiKhoan AND vct.voucher.id = :idVoucher")
    Boolean existVoucherChiTietBySs(
            @Param("idTaiKhoan") Long idTaiKhoan,
            @Param("idVoucher") Long idVoucher
            );

}
