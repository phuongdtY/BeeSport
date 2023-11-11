package com.poly.application.model.request.update_request;

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
public class UpdateVoucherRequest {
    private Long id;

    private String ma;

    private String ten;

    private LocalDateTime ngayBatDau;

    private LocalDateTime ngayKetThuc;

    private HinhThucGiamGia hinhThucGiam;

    private BigDecimal giaToiThieu;

    private BigDecimal giaTriGiam;

    private BigDecimal giaTriGiamToiDa;

    private Integer soLuong;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiVoucher trangThai;
}
