package com.poly.application.model.request.update_request;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.sql.Date;

@Getter
@Setter
public class UpdateVoucherRequest {
    private Long id;

    private String ma;

    private String ten;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    private HinhThucGiamGia hinhThucGiam;

    private BigDecimal giaToiThieu;

    private BigDecimal giaTriGiam;

    private BigDecimal giaTriGiamToiDa;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiVoucher trangThai;
}
