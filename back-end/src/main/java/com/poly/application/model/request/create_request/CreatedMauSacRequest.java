package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatedMauSacRequest {

    @NotBlank(message = "Vui lòng điền mã màu")
    private String ma;

    @NotBlank(message = "Vui lòng điền tên màu")
    private String ten;

    private CommonEnum.TrangThaiThuocTinh trangThai;

}
