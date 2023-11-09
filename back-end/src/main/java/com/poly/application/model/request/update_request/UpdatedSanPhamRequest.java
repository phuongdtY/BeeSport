package com.poly.application.model.request.update_request;

import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.LoaiDe;
import com.poly.application.entity.ThuongHieu;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdatedSanPhamRequest {

    @NotBlank(message = "Vui lòng điền tên sản phẩm")
    private String ten;

    private String moTa;

    @NotNull(message = "Vui lòng chọn thương hiệu")
    private ThuongHieu thuongHieu;

    private String trangThai;


}
