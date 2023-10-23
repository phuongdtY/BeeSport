package com.poly.application.model.request.update_request;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class UpdateVoucherRequest {
    private Long id;

    private String ma;

    private String ten;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    @NotNull(message = "Vui lòng chọn hình thức giảm giá")
    private HinhThucGiamGia hinhThucGiam;

    private BigDecimal giaToiThieu;

    private BigDecimal giaTriGiam;

    private BigDecimal giaTriGiamToiDa;

    private LocalDateTime ngaySua;
//    @Enumerated(EnumType.STRING)
//    private CommonEnum.TrangThaiVoucher trangThai;
}
