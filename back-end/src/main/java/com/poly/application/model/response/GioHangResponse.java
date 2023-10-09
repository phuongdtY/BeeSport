package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
public class GioHangResponse {

    private Long id;

    private String maGioHang;

    private String ghiChu;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiThuocTinh trangThai;

    private TaiKhoan taiKhoan;

}
