package com.poly.application.repository;

import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import com.poly.application.model.response.SanPhamMoiNhatResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, Long> {

    @Query("SELECT obj FROM ChiTietSanPham obj " +
            "WHERE (obj.sanPham.id = :idSanPham) " +
            "AND (:idMauSac IS NULL OR obj.mauSac.id = :idMauSac OR :idMauSac = '') " +
            "AND (:idLoaiDe IS NULL OR obj.loaiDe.id = :idLoaiDe OR :idLoaiDe = '') " +
            "AND (:idKichCo IS NULL OR obj.kichCo.id = :idKichCo OR :idKichCo = '') " +
            "AND (:idDiaHinhSan IS NULL OR obj.diaHinhSan.id = :idDiaHinhSan)  " +
            "ORDER BY obj.kichCo.kichCo")
    List<ChiTietSanPham> findByAll(Long idSanPham,Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan);

    @Query("SELECT obj FROM ChiTietSanPham obj " +
            "WHERE (obj.sanPham.id = :idSanPham)" +
            "AND (obj.mauSac.id = :idMauSac)" +
            "AND (obj.loaiDe.id = :idLoaiDe)" +
            "AND (obj.kichCo.id = :idKichCo)" +
            "AND (obj.diaHinhSan.id = :idDiaHinhSan)")
    ChiTietSanPham findOneChiTietSanPham(Long idSanPham,Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan);
}
