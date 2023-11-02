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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "san_pham")
@Entity
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String ten;

    @Column(name = "mo_ta")
    private String moTa;

    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "ngay_tao", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Column(name = "ngay_sua", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngaySua;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiSanPham trangThai;

    @ManyToOne
    @JoinColumn(name = "thuong_hieu_id", referencedColumnName = "id")
    private ThuongHieu thuongHieu;

    @JsonIgnore
    @OneToMany(mappedBy = "sanPham", fetch = FetchType.LAZY)
    private List<HinhAnhSanPham> listHinhAnhSanPham;

    @JsonIgnore
    @OneToMany(mappedBy = "sanPham", fetch = FetchType.LAZY)
    private List<ChiTietSanPham> listChiTietSanPham;

}
