package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.SanPham;
import com.poly.application.model.response.SanPhamBanChayResponse;
import com.poly.application.model.response.SanPhamDetailResponse;
import com.poly.application.model.response.SanPhamFilterResponse;
import com.poly.application.model.response.SanPhamMoiNhatResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {

    @Query("SELECT sp FROM SanPham sp LEFT JOIN ChiTietSanPham ctsp ON sp.id = ctsp.sanPham.id WHERE ctsp.id IS NULL ORDER BY sp.ngayTao DESC")
    List<SanPham> getAllSanPhamNullCTSP();

    @Query("SELECT DISTINCT obj FROM SanPham obj " +
            "INNER JOIN obj.listChiTietSanPham ctsp " +
            "WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) " +
            "AND (:thuongHieuId IS NULL OR obj.thuongHieu.id = :thuongHieuId OR :thuongHieuId = '') " +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai) "+
            "ORDER BY obj.ngayTao DESC")
    Page<SanPham> findByAll(Pageable pageable, String searchText, Long thuongHieuId, CommonEnum.TrangThaiSanPham trangThai);

    boolean existsByTen(String ten);

    @Query("SELECT sp FROM SanPham sp WHERE sp.trangThai = 'ACTIVE' ORDER BY sp.ngayTao DESC")
    List<SanPham> get5SanPhamMoiNhat();

    @Query("SELECT NEW com.poly.application.model.response.SanPhamFilterResponse(sp.id, sp.ten, MIN(cps.giaTien), MAX(cps.giaTien), hi.duongDan, sp.ngayTao) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "JOIN HinhAnhSanPham hi ON sp.id = hi.sanPham.id " +
            "WHERE cps.trangThai = 'ACTIVE' " +
            "AND hi.id = (SELECT MIN(hi2.id) FROM HinhAnhSanPham hi2 WHERE hi2.sanPham.id = sp.id) " +
            "AND cps.giaTien BETWEEN :minPrice AND :maxPrice " +
            "AND (:listThuongHieu IS NULL OR sp.thuongHieu.id IN (:listThuongHieu)) " +
            "AND (:listMauSac IS NULL OR cps.mauSac.id IN (:listMauSac)) " +
            "AND (:listDiaHinhSan IS NULL OR cps.diaHinhSan.id IN (:listDiaHinhSan)) " +
            "AND (:listKichCo IS NULL OR cps.kichCo.id IN (:listKichCo)) " +
            "AND (:listLoaiDe IS NULL OR cps.loaiDe.id IN (:listLoaiDe)) " +
            "GROUP BY sp.id, sp.ten, hi.duongDan, sp.ngayTao ")
    Page<SanPhamFilterResponse> filterSanPham(Pageable pageable, @Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice,
                                              @Param("listThuongHieu") List<Long> listThuongHieu,
                                              @Param("listMauSac") List<Long> listMauSac,
                                              @Param("listDiaHinhSan") List<Long> listDiaHinhSan,
                                              @Param("listKichCo") List<Long> listKichCo,
                                              @Param("listLoaiDe") List<Long> listLoaiDe);

    @Query("SELECT NEW com.poly.application.model.response.SanPhamMoiNhatResponse(sp.id, sp.ten, MIN(cps.giaTien), MAX(cps.giaTien), hi.duongDan) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "JOIN HinhAnhSanPham hi ON sp.id = hi.sanPham.id " +
            "WHERE cps.trangThai = 'ACTIVE' " +
            "AND hi.id = (SELECT MIN(hi2.id) FROM HinhAnhSanPham hi2 WHERE hi2.sanPham.id = sp.id) " +
            "GROUP BY sp.id, sp.ten, hi.duongDan " +
            "ORDER BY MAX(cps.ngayTao) DESC")
    List<SanPhamMoiNhatResponse> findAllSanPhamMoiNhat();

    @Query("SELECT NEW com.poly.application.model.response.SanPhamBanChayResponse(sp.id, sp.ten, MIN(ctsp.giaTien), MAX(ctsp2.giaTien), ha.duongDan, SUM(hdct.soLuong)) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham ctsp ON sp.id = ctsp.sanPham.id " +
            "JOIN ChiTietSanPham ctsp2 ON sp.id = ctsp2.sanPham.id " +
            "JOIN HoaDonChiTiet hdct ON ctsp.id = hdct.chiTietSanPham.id " +
            "JOIN HoaDon hd ON hdct.hoaDon.id = hd.id " +
            "JOIN HinhAnhSanPham ha ON sp.id = ha.sanPham.id " +
            "WHERE hd.trangThaiHoaDon = 'APPROVED' " +
            "AND ctsp.trangThai = 'ACTIVE' " +
            "AND ha.id = (SELECT MIN(hi2.id) FROM HinhAnhSanPham hi2 WHERE hi2.sanPham.id = sp.id) " +
            "AND ctsp.giaTien = (SELECT MIN(ctsp3.giaTien) FROM ChiTietSanPham ctsp3 WHERE ctsp3.sanPham.id = sp.id) " +
            "AND ctsp2.giaTien = (SELECT MAX(ctsp4.giaTien) FROM ChiTietSanPham ctsp4 WHERE ctsp4.sanPham.id = sp.id) " +
            "GROUP BY sp.id, sp.ten, ha.duongDan, sp.ngayTao " +
            "ORDER BY SUM(hdct.soLuong) DESC")
    List<SanPhamBanChayResponse> findAllSanPhamBanChay();


    @Query("SELECT NEW com.poly.application.model.response.SanPhamDetailResponse(sp.id, sp.ma, sp.ten, sp.moTa, MIN(cps.giaTien), MAX(cps.giaTien), sp.trangThai) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "WHERE sp.id = :id")
    SanPhamDetailResponse getDetailSanPham(@Param("id") Long id);

}
