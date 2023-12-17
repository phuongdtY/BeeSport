package com.poly.application.model.request.update_request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.PhuongThucThanhToan;
import com.poly.application.entity.TaiKhoan;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UpdatedGiaoDichRequest {

    private Long id;

    private String maGiaoDich;

    private BigDecimal soTienGiaoDich;

    private LocalDateTime ngayThanhToan;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiGiaoDich trangThaiGiaoDich;

    private HoaDon hoaDon;

    private TaiKhoan taiKhoan;

    private PhuongThucThanhToan phuongThucThanhToan;

}
