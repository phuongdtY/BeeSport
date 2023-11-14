package com.poly.application.repository;

import com.poly.application.entity.VoucherChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherChiTietRepository extends JpaRepository<VoucherChiTiet,Long>{

    @Query("SELECT obj FROM VoucherChiTiet obj")
    Page<VoucherChiTiet> getAllPage(Pageable pageable);

}
