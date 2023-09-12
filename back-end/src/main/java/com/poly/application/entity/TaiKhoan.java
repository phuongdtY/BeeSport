package com.poly.application.entity;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

    @SuppressWarnings("serial")
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Table(name = "tai_khoan")
    @Entity
    public class TaiKhoan implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Column(name = "ho_va_ten")
        private String hoVaTen;

        @Column(name = "can_cuoc_cong_dan",unique = true)
        private String canCuocCongDan;

        @Column(name = "ngay_sinh")
        private LocalDate ngaySinh;

        @Enumerated(EnumType.STRING)
        @Column(name = "gioi_tinh")
        private CommonEnum.GioiTinh gioiTinh;

        @Column(name = "so_dien_thoai",unique = true)
        private String soDienThoai;

        @Column(name = "email")
        private String email;

        @Column(name = "thanh_pho")
        private String thanhPho;

        @Column(name = "quan_huyen")
        private String quanHuyen;

        @Column(name = "phuong_xa")
        private String phuongXa;

        @Column(name = "dia_chi_cu_the")
        private String diaChiCuThe;

        @Column(name = "anh_dai_dien")
        private String anhDaiDien;

        @Column(name = "mat_khau")
        private String matKhau;

        @CreationTimestamp
        @Column(name = "ngay_tao")
        private LocalDateTime ngayTao;

        @UpdateTimestamp
        @Column(name = "ngay_sua")
        private LocalDateTime ngaySua;

        @Column(name = "trang_thai")
        private Integer trangThai;

    //    @OneToMany(mappedBy = "taiKhoan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //    private List<DiaChi> diaChiList;

        @OneToMany(mappedBy = "taiKhoan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private List<TaiKhoanVaiTro> taiKhoanVaiTroList;

}
