package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreatedHinhThucGiamGiaRequest {

    @NotBlank(message = "Vui lòng điền tên thương hiệu")
    private String ten;

    private LocalDate ngayTao;

    private CommonEnum.HinhThucGiam trangThai;

}
