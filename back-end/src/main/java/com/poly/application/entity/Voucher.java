package com.poly.application.entity;

import com.poly.application.common.CommonEnum;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@SuppressWarnings("serial")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "voucher")
@Entity

public class Voucher implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String ten;

    @Column(name = "ngay_bat_dau")
    @Temporal(TemporalType.DATE)
    private Date ngayBatDau;


    @Column(name = "ngay_ket_thuc")
    @Temporal(TemporalType.DATE)
    private Date ngayKetThuc;

//    @Column(name = "ngay_bat_dau")
//    @Temporal(TemporalType.TIMESTAMP)
//    private LocalDateTime ngayBatDau;
//
//    @Column(name = "ngay_ket_thuc")
//    @Temporal(TemporalType.TIMESTAMP)
//    private LocalDateTime ngayKetThuc;

    @ManyToOne
    @JoinColumn(name = "hinh_thuc_giam_gia_id", referencedColumnName = "id")
    private HinhThucGiamGia hinhThucGiamGia;

    @Column(name = "gia_toi_thieu")
    private BigDecimal giaToiThieu;

    @Column(name = "gia_tri_giam")
    private BigDecimal giaTriGiam;

    @Column(name = "gia_tri_giam_toi_da")
    private BigDecimal giaTriGiamToiDa;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    @Column(name = "ngay_sua")
    private LocalDateTime ngaySua;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiVoucher trangThai;

}
