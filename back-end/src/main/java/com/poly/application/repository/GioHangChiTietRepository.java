package com.poly.application.repository;

import com.poly.application.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet, Long> {

    @Query("SELECT ghct FROM GioHangChiTiet ghct WHERE ghct.id = :id")
    GioHangChiTiet tim(Long id);

}
