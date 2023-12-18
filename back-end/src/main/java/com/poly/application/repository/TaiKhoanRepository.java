package com.poly.application.repository;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaChi;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.VaiTro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface    TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {

    @Query("SELECT tk FROM TaiKhoan tk " +
            "WHERE (tk.hoVaTen LIKE %:searchText% OR tk.soDienThoai LIKE %:searchText% OR tk.email LIKE %:searchText% OR tk.canCuocCongDan LIKE %:searchText%) " +
            "AND (:trangThai IS NULL OR tk.trangThai = :trangThai) " +
            "AND (:gioiTinh IS NULL OR tk.gioiTinh = :gioiTinh)"+
            "AND tk.vaiTro.id = 2")
    Page<TaiKhoan> findAllByVaiTro(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("trangThai") CommonEnum.TrangThaiThuocTinh trangThai,
            @Param("gioiTinh") CommonEnum.GioiTinh gioiTinh
    );

    @Query("SELECT tk FROM TaiKhoan tk " +
            "WHERE (tk.hoVaTen LIKE %:searchText% OR tk.soDienThoai LIKE %:searchText% OR tk.email LIKE %:searchText% OR tk.canCuocCongDan LIKE %:searchText%) " +
            "AND (:trangThai IS NULL OR tk.trangThai = :trangThai) " +
            "AND (:gioiTinh IS NULL OR tk.gioiTinh = :gioiTinh)"+
            "AND tk.vaiTro.id = 3")
    Page<TaiKhoan> findAllByVaiTro2(
            Pageable pageable,
            @Param("searchText") String searchText,
            @Param("trangThai") CommonEnum.TrangThaiThuocTinh trangThai,
            @Param("gioiTinh") CommonEnum.GioiTinh gioiTinh
    );

    @Query("SELECT tk FROM TaiKhoan tk " +
            "WHERE tk.vaiTro.id = 3")
    List<TaiKhoan> findAllKhachHang();


    TaiKhoan findBySoDienThoai(String sdt);

    TaiKhoan findByCanCuocCongDan(String canCuoc);

    boolean existsByCanCuocCongDan(String canCuoc);

    boolean existsBySoDienThoai(String sdt);

//    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.email = :email")
//    TaiKhoan findByEmail(@Param("email") String email);

    TaiKhoan findTaiKhoanByEmail(String email);

    TaiKhoan findTaiKhoanByMatKhau(String matKhau);


    Optional<TaiKhoan> findByEmail(String email);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.soDienThoai = :sdt")
    Optional<TaiKhoan> findBySoDienThoai1(String sdt);

//    TaiKhoan findByVaitro(VaiTro vaiTro);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.matKhau = :matKhau")
    List<TaiKhoan> findByMatKhau(String matKhau);


    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.id =:id")
    TaiKhoan findId(@Param("id") Long id);

    @Query("SELECT tk FROM TaiKhoan tk " +
            "WHERE tk.vaiTro.id = 3")
    List<TaiKhoan> findAllKhachHangExcel();

    @Query("SELECT tk FROM TaiKhoan tk " +
            "WHERE tk.vaiTro.id = 2")
    List<TaiKhoan> findAllNhanVienExcel();

}
