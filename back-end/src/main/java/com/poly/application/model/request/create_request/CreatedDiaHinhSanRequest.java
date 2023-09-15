package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatedDiaHinhSanRequest {

    @NotBlank(message = "Vui lòng điền tên địa hình sân")
    private String ten;

    private CommonEnum.TrangThaiThuocTinh trangThai;

}
