package com.poly.application.repository;

import com.poly.application.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, Long> {

    @Query("SELECT obj, MIN(obj.giaTien) , MAX(obj.giaTien) FROM ChiTietSanPham obj " +
            "WHERE (obj.sanPham.id = :idSanPham) " +
            "AND (:idMauSac IS NULL OR obj.mauSac.id = :idMauSac OR :idMauSac = '') " +
            "AND (:idKichCo IS NULL OR obj.kichCo.id = :idKichCo OR :idKichCo = '') " +
            "AND (:idLoaiDe IS NULL OR obj.loaiDe.id = :idLoaiDe OR :idLoaiDe = '') " +
            "AND (:idDiaHinhSan IS NULL OR obj.diaHinhSan.id = :idDiaHinhSan OR :idDiaHinhSan = '') " +
            "AND (obj.trangThai = 'ACTIVE') " +
            "GROUP BY obj.id")
    List<ChiTietSanPham> findByAll(@Param("idSanPham") Long idSanPham, @Param("idMauSac") Long idMauSac, @Param("idKichCo") Long idKichCo, @Param("idLoaiDe") Long idLoaiDe, @Param("idDiaHinhSan") Long idDiaHinhSan);
    @Query("SELECT obj FROM ChiTietSanPham obj " +
            "WHERE (obj.sanPham.id = :idSanPham) " +
            "AND (:idMauSac IS NULL OR obj.mauSac.id = :idMauSac OR :idMauSac = '') " +
            "AND (:idKichCo IS NULL OR obj.kichCo.id = :idKichCo OR :idKichCo = '') " +
            "AND (:idLoaiDe IS NULL OR obj.loaiDe.id = :idLoaiDe OR :idLoaiDe = '') " +
            "AND (:idDiaHinhSan IS NULL OR obj.diaHinhSan.id = :idDiaHinhSan OR :idDiaHinhSan = '') " +
            "AND (obj.trangThai = 'ACTIVE') " +
            "GROUP BY obj.id")
    Page<ChiTietSanPham> findByAllPage(Pageable pageable, @Param("idSanPham") Long idSanPham, @Param("idMauSac") Long idMauSac, @Param("idKichCo") Long idKichCo, @Param("idLoaiDe") Long idLoaiDe, @Param("idDiaHinhSan") Long idDiaHinhSan);

    @Query("SELECT obj FROM ChiTietSanPham obj " +
            "WHERE (obj.sanPham.id = :idSanPham)" +
            "AND (:idMauSac IS NULL OR obj.mauSac.id = :idMauSac OR :idMauSac = '') " +
            "AND (:idKichCo IS NULL OR obj.kichCo.id = :idKichCo OR :idKichCo = '') " +
            "AND (:idLoaiDe IS NULL OR obj.loaiDe.id = :idLoaiDe OR :idLoaiDe = '') " +
            "AND (:idDiaHinhSan IS NULL OR obj.diaHinhSan.id = :idDiaHinhSan OR :idDiaHinhSan = '')")
    ChiTietSanPham findOneChiTietSanPham(@Param("idSanPham") Long idSanPham, @Param("idMauSac") Long idMauSac, @Param("idKichCo") Long idKichCo, @Param("idLoaiDe") Long idLoaiDe, @Param("idDiaHinhSan") Long idDiaHinhSan);

    @Query("SELECT obj FROM ChiTietSanPham obj " +
            "WHERE (obj.sanPham.id = :idSanPham)" +
            "AND (obj.mauSac.id = :idMauSac) ORDER BY obj.ngayTao DESC")
    List<ChiTietSanPham> getListSanPhamAndMauSac(@Param("idSanPham") Long idSanPham, @Param("idMauSac") Long idMauSac);

}
