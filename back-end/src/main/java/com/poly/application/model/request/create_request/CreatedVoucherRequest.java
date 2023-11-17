package com.poly.application.model.request.create_request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class  CreatedVoucherRequest {

    private String ma;

    private String ten;

    private Integer soLuong;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime ngayBatDau;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime ngayKetThuc;

    private HinhThucGiamGia hinhThucGiam;

    private BigDecimal donToiThieu;

    private BigDecimal giaTriGiam;

    private BigDecimal giamToiDa;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiVoucher trangThai;
}
