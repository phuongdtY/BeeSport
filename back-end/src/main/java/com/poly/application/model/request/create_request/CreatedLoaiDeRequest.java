package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatedLoaiDeRequest {

    @NotBlank(message = "Vui lòng điền tên loại đế")
    private String ten;

    private CommonEnum.TrangThaiThuocTinh trangThai;

}
