package com.poly.application.repository;

import com.poly.application.entity.DiaHinhSan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaHinhSanRepository extends JpaRepository<DiaHinhSan, Long> {
}
