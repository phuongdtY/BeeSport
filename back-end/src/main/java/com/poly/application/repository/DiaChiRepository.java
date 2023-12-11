package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaChi;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.VaiTro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi,Long> {
    @Query("SELECT dc FROM DiaChi dc " +
            "WHERE (dc.hoVaTen LIKE %:searchText% OR dc.soDienThoai LIKE %:searchText% OR dc.email LIKE %:searchText%) " +
            "AND (:trangThaiDiaChi IS NULL OR dc.trangThaiDiaChi = :trangThaiDiaChi) " +
            "AND (:loaiDiaChi IS NULL OR dc.loaiDiaChi = :loaiDiaChi) " +
            "AND dc.taiKhoan.id = :taiKhoanId")
    Page<DiaChi> findAllByTaiKhoanId(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("trangThaiDiaChi") CommonEnum.TrangThaiDiaChi trangThaiDiaChi,
            @Param("loaiDiaChi") CommonEnum.LoaiDiaChi loaiDiaChi,
            @Param("taiKhoanId") Long taiKhoanId
    );
    @Query("SELECT dc FROM DiaChi dc WHERE dc.id =:id")
    Optional<DiaChi> findId(@Param("id") Long id);

    @Query("SELECT DISTINCT d.trangThaiDiaChi FROM DiaChi d")
    List<CommonEnum.TrangThaiDiaChi> findAllTrangThaiDiaChi();

    @Modifying
    @Query("UPDATE DiaChi d SET d.trangThaiDiaChi = :trangThaiDiaChi")
    void updateAllTrangThaiDiaChi(@Param("trangThaiDiaChi") CommonEnum.TrangThaiDiaChi trangThaiDiaChi);
}
