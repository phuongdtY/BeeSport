package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class UpdatedGiaoDichRequest {

    private Long id;

    private String maGiaoDich;

    private String nhanVienGiaoDich;

    private BigDecimal soTienGiaoDich;

    @Enumerated(EnumType.STRING)
    private CommonEnum.PhuongThucThanhToan phuongThucThanhToan;

    private String ghiChu;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private Integer trangThaiGiaoDich;

}
