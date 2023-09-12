package com.poly.application.repository;

import com.poly.application.entity.VaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaiTroRepository extends JpaRepository<VaiTro, Long> {

    VaiTro findByTen(String ten);
}
