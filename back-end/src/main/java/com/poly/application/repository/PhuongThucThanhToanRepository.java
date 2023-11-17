package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.PhuongThucThanhToan;
import com.poly.application.entity.VaiTro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PhuongThucThanhToanRepository extends JpaRepository<PhuongThucThanhToan, Long> {

    @Query("SELECT obj FROM PhuongThucThanhToan obj WHERE (obj.ten LIKE %:searchText%) AND (:trangThai IS NULL OR obj.trangThai = :trangThai)")
    Page<PhuongThucThanhToan> findByAll(Pageable pageable, String searchText, CommonEnum.TrangThaiThuocTinh trangThai);

}
