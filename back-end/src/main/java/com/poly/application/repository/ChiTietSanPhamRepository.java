package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
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
            "WHERE obj.trangThai != 'DELETED' " +
            "AND (:idSanPham IS NULL OR obj.sanPham.id = :idSanPham OR :idSanPham = '') " +
            "AND (:idMauSac IS NULL OR obj.mauSac.id = :idMauSac OR :idMauSac = '') " +
            "AND (:idKichCo IS NULL OR obj.kichCo.id = :idKichCo OR :idKichCo = '') " +
            "AND (:idLoaiDe IS NULL OR obj.loaiDe.id = :idLoaiDe OR :idLoaiDe = '') " +
            "AND (:idDiaHinhSan IS NULL OR obj.diaHinhSan.id = :idDiaHinhSan OR :idDiaHinhSan = '') " +
            "AND ((:minGiaTien IS NULL AND :maxGiaTien IS NULL) OR obj.giaTien BETWEEN COALESCE(:minGiaTien, obj.giaTien) AND COALESCE(:maxGiaTien, obj.giaTien))")
    Page<ChiTietSanPham> findByAllPage(
            Pageable pageable,
            @Param("idSanPham") Long idSanPham,
            @Param("idMauSac") Long idMauSac,
            @Param("idKichCo") Long idKichCo,
            @Param("idLoaiDe") Long idLoaiDe,
            @Param("idDiaHinhSan") Long idDiaHinhSan,
            @Param("minGiaTien") BigDecimal minGiaTien,
            @Param("maxGiaTien") BigDecimal maxGiaTien
    );

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

    @Query("SELECT obj " +
            "FROM ChiTietSanPham obj " +
            "INNER JOIN SanPham sp ON " +
            "   obj.sanPham.id = sp.id" +
            "   WHERE " +
            "    (sp.ma LIKE %:searchText% OR sp.ten LIKE %:searchText% )" +
            "    AND (obj.giaTien BETWEEN :minGiaTien AND :maxGiaTien)" +
            "    AND (:idMauSac IS NULL OR obj.mauSac.id = :idMauSac OR :idMauSac = '')" +
            "    AND (:idDiaHinhSan IS NULL OR obj.diaHinhSan.id = :idDiaHinhSan OR :idDiaHinhSan = '')" +
            "    AND (:idKichCo IS NULL OR obj.kichCo.id = :idKichCo OR :idKichCo = '')" +
            "    AND (:idLoaiDe IS NULL OR obj.loaiDe.id = :idLoaiDe OR :idLoaiDe = '')" +
            "    AND (:idThuongHieu IS NULL OR obj.sanPham.thuongHieu.id = :idThuongHieu OR :idThuongHieu = '') " +
            "   ORDER BY  obj.soLuong DESC, obj.ngayTao DESC " )
    Page<ChiTietSanPham> filterChiTietSanPham(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("minGiaTien") BigDecimal minGiaTien,
            @Param("maxGiaTien") BigDecimal maxGiaTien,
            @Param("idLoaiDe") Long idLoaiDe,
            @Param("idMauSac") Long idMauSac,
            @Param("idKichCo") Long idKichCo,
            @Param("idDiaHinhSan") Long idDiaHinhSan,
            @Param("idThuongHieu") Long idThuongHieu);

    @Modifying
    @Query("UPDATE ChiTietSanPham SET trangThai = :trangThai WHERE id = :id")
    ChiTietSanPham updateTrangThai(@Param("id") Long id, @Param("trangThai") CommonEnum.TrangThaiChiTietSanPham trangThai);
}
