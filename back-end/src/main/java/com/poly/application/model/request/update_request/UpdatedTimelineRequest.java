package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UpdatedTimelineRequest {

    private Long id;

    private String ghiChu;

    private String ma;

    private LocalDateTime ngayTao;

    private CommonEnum.TrangThaiHoaDon trangThai;

    private HoaDon hoaDon;


}
