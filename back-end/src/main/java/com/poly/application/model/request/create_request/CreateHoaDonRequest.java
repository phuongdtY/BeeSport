package com.poly.application.model.request.create_request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateHoaDonRequest {

    private String ma;

    private BigDecimal tongTien;

    private String nguoiNhan;

    private String sdtNguoiNhan;

//    private LocalDateTime ngayNhan;
//
//    private LocalDateTime ngayTao;
//
//    private LocalDateTime ngaySua;

}
