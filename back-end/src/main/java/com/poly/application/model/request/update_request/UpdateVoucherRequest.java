package com.poly.application.model.request.update_request;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
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

    private Integer soLuong;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiVoucher trangThai;
}
