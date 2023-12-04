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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("serial")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "vai_tro")
@Entity
public class VaiTro implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "ten")
    private String ten;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    @Column(name = "ngay_sua")
    private LocalDateTime ngaySua;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private CommonEnum.TrangThaiThuocTinh trangThai;

    @JsonIgnore
    @OneToMany(mappedBy = "vaiTro", fetch = FetchType.LAZY)
    private List<TaiKhoan> taiKhoanList;

    public VaiTro(String ten){this.ten=ten;}

}
