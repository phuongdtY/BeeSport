package com.poly.application.repository;

import com.poly.application.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon,Long> {
}
