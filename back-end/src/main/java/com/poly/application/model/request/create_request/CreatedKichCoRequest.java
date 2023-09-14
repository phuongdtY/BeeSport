package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatedKichCoRequest {

    @NotBlank(message = "Vui lòng điền kích cỡ")
    private Float kichCo;

    private CommonEnum.TrangThaiThuocTinh trangThai;

}
