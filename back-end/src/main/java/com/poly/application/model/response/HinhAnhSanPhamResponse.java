package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import com.poly.application.entity.SanPham;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HinhAnhSanPhamResponse {

    private Long id;

    private String duongDan;

    private CommonEnum.TrangThaiHinhAnh trangThai;

    private SanPham sanPham;

    private MauSac mauSac;

}
