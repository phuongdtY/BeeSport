package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TimelineResponse {

    private Long id;

    private String ghiChu;

    private String ma;

    private LocalDateTime ngayTao;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiHoaDon trangThai;

    private HoaDon hoaDon;

}
