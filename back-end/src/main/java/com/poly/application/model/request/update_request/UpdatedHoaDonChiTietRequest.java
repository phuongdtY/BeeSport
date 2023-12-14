package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.entity.HoaDon;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class UpdatedHoaDonChiTietRequest {

    private Long id;

    private Integer soLuong;

    private BigDecimal donGia;

    private String ghiChu;

    private String nguoiTao;

    private String nguoiSua;

    private CommonEnum.TrangThaiHoaDonChiTiet trangThaiHoaDonChiTiet;

    private HoaDon hoaDon;

    private ChiTietSanPham chiTietSanPham;

}
