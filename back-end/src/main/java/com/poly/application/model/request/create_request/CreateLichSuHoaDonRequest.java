package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateLichSuHoaDonRequest {

    private Long id;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String ghiChu;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiLichSuHoaDon trangThaiLichSuHoaDon;


}
