package com.poly.application.model.request.create_request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateHoaDonChiTietRequest {

    private Integer soLuong;

    private BigDecimal donGia;

    private String ghiChu;

    private String nguoiTao;

    private String nguoiSua;

}
