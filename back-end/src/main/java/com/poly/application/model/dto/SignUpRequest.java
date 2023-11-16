package com.poly.application.model.dto;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class SignUpRequest {

    private String hoVaTen;

    private String soDienThoai;

    private String email;

    private String matKhau;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiThuocTinh trangThai;

    @Column(name = "gioi_tinh")
    private CommonEnum.GioiTinh gioiTinh;

    private String anhDaiDien;

    private Integer roleId;

}
