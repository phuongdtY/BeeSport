package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.GiaoDich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GiaoDichRepository extends JpaRepository<GiaoDich, Long> {

    @Query(value = "SELECT gd FROM GiaoDich gd WHERE " +
            "gd.phuongThucThanhToan.id = :idPhuongThuc AND " +
            "gd.hoaDon.id = :idHoaDon AND " +
            "gd.trangThaiGiaoDich = :trangThai")
    GiaoDich findGiaoDich(@Param("idHoaDon") Long idHoadDon,
                          @Param("idPhuongThuc") Long idPhuongThucThanhToan,
                          @Param("trangThai") CommonEnum.TrangThaiGiaoDich trangThaiGiaoDich
    );

    List<GiaoDich> findGiaoDichesByHoaDonId(Long idHoaDon);

    Optional<GiaoDich> findByMaGiaoDich(String maGiaoDich);
}
