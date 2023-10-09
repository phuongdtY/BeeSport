package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateHoaDonRequest {

    private String ma;

    private BigDecimal tongTien;

    private String nguoiNhan;

    private String sdtNguoiNhan;

    private CommonEnum.LoaiHoaDon loaiHoaDon;

}
