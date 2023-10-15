package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.KichCo;
import com.poly.application.entity.LoaiDe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoaiDeRepository extends JpaRepository<LoaiDe, Long> {

    @Query("SELECT obj FROM LoaiDe obj WHERE (obj.ten LIKE %:searchText%) AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<LoaiDe> findByAll(Pageable pageable, String searchText, CommonEnum.TrangThaiThuocTinh trangThai);

    boolean existsByTen(String ten);

    @Query("SELECT DISTINCT ld FROM ChiTietSanPham ctsp JOIN LoaiDe ld ON ctsp.loaiDe.id = ld.id  WHERE ctsp.sanPham.id = :idSanPham")
    List<LoaiDe> getLoaiDeKhongLap(Long idSanPham);

}
