package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdatedDiaHinhSanRequest {


    @NotBlank(message = "Vui lòng điền tên địa hình sân")
    private String ten;

    private LocalDate ngayTao;

    private LocalDate ngaySua;

    private CommonEnum.TrangThaiThuocTinh trangThai;

}
