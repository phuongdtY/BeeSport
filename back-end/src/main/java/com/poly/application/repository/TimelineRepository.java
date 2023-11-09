package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimelineRepository extends JpaRepository<TimeLine, Long> {

    @Query("SELECT t FROM TimeLine t WHERE t.hoaDon.id = :idHoaDon ORDER BY t.ngayTao ASC ")
    List<TimeLine> findTimeLinesByHoaDonId(@Param("idHoaDon") Long id);

//    @Query("SELECT CASE WHEN COUNT(tl) > 0 THEN true ELSE false END FROM TimeLine tl WHERE 'PENDING' = :trangThai or 'CONFIRMED' = :trangThai")
    Boolean existsTimeLineByTrangThaiAndHoaDonId(CommonEnum.TrangThaiHoaDon trangThaiHoaDon,Long id);

}
