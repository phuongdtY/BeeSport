package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdatedHinhThucGiamGiaRequest {

    @NotBlank(message = "Vui lòng điền tên hình thức giảm giá")
    private String ten;

    private LocalDate ngaySua;

    private CommonEnum.HinhThucGiam trangThai;

}
