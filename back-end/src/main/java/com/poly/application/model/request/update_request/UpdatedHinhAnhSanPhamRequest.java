package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import com.poly.application.entity.SanPham;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatedHinhAnhSanPhamRequest {

    private Long id;

    private String duongDan;

    private CommonEnum.TrangThaiHinhAnh trangThai;

    private SanPham sanPham;

    private MauSac mauSac;

}
