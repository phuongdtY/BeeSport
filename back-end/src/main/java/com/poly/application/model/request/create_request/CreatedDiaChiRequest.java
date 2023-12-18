package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class CreatedDiaChiRequest {
    private String hoVaTen;

    private String soDienThoai;

    private String thanhPho;

    private String quanHuyen;

    private String phuongXa;

    private String diaChiCuThe;


    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiDiaChi trangThaiDiaChi;

    private String email;
}
