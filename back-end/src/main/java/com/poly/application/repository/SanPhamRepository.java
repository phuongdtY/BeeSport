package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.SanPham;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import com.poly.application.model.response.SanPhamMoiNhatResponse;
import com.poly.application.model.response.SanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {

    @Query("SELECT obj FROM SanPham obj " +
            "WHERE (obj.ma LIKE %:searchText% OR obj.ten LIKE %:searchText%) " +
            "AND (:thuongHieuId IS NULL OR obj.thuongHieu.id = :thuongHieuId OR :thuongHieuId = '') " +
            "AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<SanPham> findByAll(Pageable pageable, String searchText, Long thuongHieuId, CommonEnum.TrangThaiSanPham trangThai);

    boolean existsByTen (String ten);

    @Query("SELECT sp FROM SanPham sp ORDER BY sp.ngayTao DESC")
    List<SanPham> get5SanPhamMoiNhat();

    @Query("SELECT NEW com.poly.application.model.response.SanPhamMoiNhatResponse(sp.id, sp.ten, MIN(cps.giaTien), MAX(cps.giaTien)) FROM SanPham sp JOIN ChiTietSanPham cps ON sp.id = cps.sanPham.id GROUP BY sp.id, sp.ten ORDER BY MAX(cps.ngayTao) DESC")
    List<SanPhamMoiNhatResponse> findAllSanPhamMoiNhat();

}
