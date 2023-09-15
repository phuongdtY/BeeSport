package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatedThuongHieuRequest {

    @NotBlank(message = "Vui lòng điền tên thương hiệu")
    private String ten;

    private CommonEnum.TrangThaiThuocTinh trangThai;

}
