package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdatedDiaChiRequest {
    private String hoVaTen;

    private String soDienThoai;

    private String thanhPho;

    private String quanHuyen;

    private String phuongXa;

    private String diaChiCuThe;

    private CommonEnum.LoaiDiaChi loaiDiaChi;

    private CommonEnum.TrangThaiDiaChi trangThaiDiaChi;

    private String email;
}
