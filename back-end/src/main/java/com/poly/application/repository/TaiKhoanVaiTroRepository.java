package com.poly.application.repository;

import com.poly.application.entity.TaiKhoanVaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaiKhoanVaiTroRepository extends JpaRepository<TaiKhoanVaiTro, Long> {
}
