package com.poly.application.repository;

import com.poly.application.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet,Long> {

    List<HoaDonChiTiet> findAllByHoaDonId(Long id);
}
