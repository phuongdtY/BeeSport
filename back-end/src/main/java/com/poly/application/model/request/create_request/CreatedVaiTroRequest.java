package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class CreatedVaiTroRequest {

    private CommonEnum.Ten ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiThuocTinh trangThai;
}
