package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.LoaiDe;
import com.poly.application.entity.ThuongHieu;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SanPhamResponse {

    private Long id;

    private String ma;

    private String ten;

    private String moTa;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiSanPham trangThai;

    private ThuongHieu thuongHieu;

    private LoaiDe loaiDe;

    private DiaHinhSan diaHinhSan;

}
