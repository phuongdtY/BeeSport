package com.poly.application.model.request.update_request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdatedMauSacRequest {

    @NotBlank(message = "Vui lòng điền mã màu")
    private String ma;

    @NotBlank(message = "Vui lòng điền tên màu")
    private String ten;

    private LocalDate ngayTao;

    private LocalDate ngaySua;

    private String trangThai;

}
