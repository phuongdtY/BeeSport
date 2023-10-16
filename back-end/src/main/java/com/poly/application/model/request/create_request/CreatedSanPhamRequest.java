package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
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
public class CreatedSanPhamRequest {

    private Long id;

    @NotBlank(message = "Vui lòng điền mã sản phẩm")
    private String ma;

    @NotBlank(message = "Vui lòng điền tên sản phẩm")
    private String ten;

    private String moTa;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    @NotNull(message = "Vui lòng chọn thương hiệu")
    private ThuongHieu thuongHieu;

    private CommonEnum.TrangThaiSanPham trangThai;

}
