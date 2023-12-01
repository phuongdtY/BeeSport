package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.VoucherChiTiet;
import com.poly.application.model.response.VoucherChiTietResponseMapping;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherChiTietRepository extends JpaRepository<VoucherChiTiet, Long> {

    @Query("SELECT obj FROM VoucherChiTiet obj")
    Page<VoucherChiTiet> getAllPage(Pageable pageable);

    @Query("SELECT obj FROM VoucherChiTiet obj WHERE obj.voucher.id = :idVoucher")
    List<VoucherChiTiet> getAllList(@Param("idVoucher") Long idVoucher);

    @Query("SELECT new com.poly.application.model.response.VoucherChiTietResponseMapping(" +
            "vc.id, vc.soLanSuDung, vc.ngayTao, vc.ngaySua, vc.trangThai, tk.id, vc.taiKhoan, COUNT(hd.id)) " +
            "FROM VoucherChiTiet vc " +
            "JOIN vc.taiKhoan tk " +
            "LEFT JOIN HoaDon hd ON hd.voucher.id = vc.voucher.id AND hd.taiKhoan.id = vc.taiKhoan.id " +
            "WHERE vc.voucher.id = :voucherId " +
            "GROUP BY vc.id, vc.soLanSuDung, vc.ngayTao, vc.ngaySua, vc.trangThai, tk.id, vc.taiKhoan")
    List<VoucherChiTietResponseMapping> findByVoucherId(@Param("voucherId") Long voucherId);

    @Modifying
    @Transactional
    @Query("UPDATE VoucherChiTiet vc SET vc.trangThai = :trangThaiDeleted WHERE vc.id = :voucherChiTietId")
    void updateTrangThaiToDeleted(@Param("trangThaiDeleted") CommonEnum.TrangThaiVoucherChiTiet trangThaiDeleted,
                                  @Param("voucherChiTietId") Long voucherChiTietId);
}

