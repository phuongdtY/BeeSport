package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.SanPham;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import com.poly.application.model.response.SanPhamDetailResponse;
import com.poly.application.model.response.SanPhamMoiNhatResponse;
import com.poly.application.model.response.SanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {

//    @Query("SELECT sp FROM SanPham sp " +
//            "JOIN ChiTietSanPham ctsp ON sp.id = ctsp.sanPham.id " +
//            "WHERE (ctsp.loaiDe.id = :idLoaiDe OR :idLoaiDe IS NULL OR :idLoaiDe = '') " +
//            "AND (ctsp.diaHinhSan.id = :idDiaHinhSan OR :idDiaHinhSan IS NULL OR :idDiaHinhSan = '') " +
//            "AND (ctsp.mauSac.id = :idMauSac OR :idMauSac IS NULL OR :idMauSac = '') " +
//            "AND (sp.thuongHieu.id = :idThuongHieu OR :idThuongHieu IS NULL OR :idThuongHieu = '') " +
//            "AND (sp.trangThai = :trangThai OR :trangThai IS NULL)")
//    Page<SanPham> getAll();

    @Query("SELECT obj FROM SanPham obj " +
            "WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) " +
            "AND (:thuongHieuId IS NULL OR obj.thuongHieu.id = :thuongHieuId OR :thuongHieuId = '') " +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<SanPham> findByAll(Pageable pageable, String searchText, Long thuongHieuId, CommonEnum.TrangThaiSanPham trangThai);

    boolean existsByTen (String ten);

    @Query("SELECT sp FROM SanPham sp WHERE sp.trangThai = 'ACTIVE' ORDER BY sp.ngayTao DESC")
    List<SanPham> get5SanPhamMoiNhat();

    @Query("SELECT NEW com.poly.application.model.response.SanPhamMoiNhatResponse(sp.id, sp.ten, MIN(cps.giaTien), MAX(cps.giaTien)) FROM SanPham sp JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id WHERE sp.trangThai = 'ACTIVE' GROUP BY sp.id, sp.ten ORDER BY MAX(cps.ngayTao) DESC")
    List<SanPhamMoiNhatResponse> findAllSanPhamMoiNhat();

    @Query("SELECT NEW com.poly.application.model.response.SanPhamDetailResponse(sp.id, sp.ma, sp.ten, sp.moTa, MIN(cps.giaTien), MAX(cps.giaTien), sp.trangThai) " +
            "FROM SanPham sp " +
            "JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id " +
            "WHERE sp.id = :id")
    SanPhamDetailResponse getDetailSanPham(@Param("id") Long id);

}
