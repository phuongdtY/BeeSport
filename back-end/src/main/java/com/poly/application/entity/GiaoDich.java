package com.poly.application.entity;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@SuppressWarnings("serial")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "giao_dich")
public class GiaoDich {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_giao_dich")
    private String maGiaoDich;

    @Column(name = "so_tien_giao_dich")
    private BigDecimal soTienGiaoDich;

    @Column(name = "ngay_thanh_toan", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngayThanhToan;

    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "ngay_tao", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Column(name = "ngay_sua", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngaySua;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai_giao_dich")
    private CommonEnum.TrangThaiGiaoDich trangThaiGiaoDich;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id",referencedColumnName = "id")
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_id",referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "phuong_thuc_id",referencedColumnName = "id")
    private PhuongThucThanhToan phuongThucThanhToan;

}
