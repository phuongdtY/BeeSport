package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import com.poly.application.entity.SanPham;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreatedHinhAnhSanPhamRequest {

    private Long id;

    private String duongDan;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiHinhAnh trangThai;

    private SanPham sanPham;

    private MauSac mauSac;

}
