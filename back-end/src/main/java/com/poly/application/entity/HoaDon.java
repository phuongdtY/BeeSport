package com.poly.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("serial")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "hoa_don")
public class HoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_hoa_don")
    private String ma;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_hoa_don")
    private CommonEnum.LoaiHoaDon loaiHoaDon;

    @Column(name = "ngay_thanh_toan")
    private LocalDateTime ngayThanhToan;

    @Column(name = "phi_ship")
    private BigDecimal phiShip;

    @Column(name = "tong_tien")
    private BigDecimal tongTien;

    @Column(name = "tong_tien_khi_giam")
    private BigDecimal tongTienKhiGiam;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "nguoi_nhan")
    private String nguoiNhan;

    @Column(name = "sdt_nguoi_nhan")
    private String sdtNguoiNhan;

    @Column(name = "ngay_ship")
    private LocalDateTime ngayShip;

    @Column(name = "dia_chi_nguoi_nhan")
    private String diaChiNguoiNhan;

    @Column(name = "email_nguoi_nhan")
    private String emailNguoiNhan;

    @Column(name = "ngay_nhan")
    private LocalDateTime ngayNhan;

    @Column(name = "ngay_mong_muon")
    private LocalDateTime ngayMongMuon;

    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "ngay_tao", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Column(name = "ngay_sua", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngaySua;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_sua")
    private String nguoiSua;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private CommonEnum.TrangThaiHoaDon trangThaiHoaDon;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_id", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    @OneToMany(mappedBy = "hoaDon",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<GiaoDich> giaoDichList;

    @JsonIgnore
    @OneToMany(mappedBy = "hoaDon",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<HoaDonChiTiet> hoaDonChiTietList;

}
