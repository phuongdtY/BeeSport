package com.poly.application.repository;

import com.poly.application.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, Long> {

    @Query("SELECT gh FROM GioHang gh where gh.taiKhoan = :taiKhoanId")
    GioHang getOne(Long taiKhoanId);    

}
