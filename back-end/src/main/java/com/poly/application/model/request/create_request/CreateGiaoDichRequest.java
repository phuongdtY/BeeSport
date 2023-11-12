package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.PhuongThucThanhToan;
import com.poly.application.entity.TaiKhoan;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateGiaoDichRequest {

    private Long id;

    private String maGiaoDich;

    private BigDecimal soTienGiaoDich;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiGiaoDich trangThaiGiaoDich;

    private HoaDon hoaDon;

    private TaiKhoan taiKhoan;

    private PhuongThucThanhToan phuongThucThanhToan;


}
