package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
public class VoucherResponse {

    private Long id;

    private String ma;

    private String ten;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    private CommonEnum.HinhThucGiam hinhThucGiam;

    private BigDecimal giaToiThieu;

    private BigDecimal giaTriGiam;

    private BigDecimal giaTriGiamToiDa;

    private CommonEnum.TrangThaiVoucher trangThai;

}
