package com.poly.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "gio_hang")
@Entity
public class GioHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_gio_hang")
    private String maGioHang;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "ngay_tao", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Column(name = "ngay_sua", columnDefinition = "TIMESTAMP")
    private LocalDateTime ngaySua;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "nguoi_so_huu", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    @JsonIgnore
    @OneToMany(mappedBy = "gioHang", fetch = FetchType.LAZY)
    private List<GioHangChiTiet> gioHangChiTietList;

}
