package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.KichCo;
import com.poly.application.entity.LoaiDe;
import com.poly.application.entity.MauSac;
import com.poly.application.entity.SanPham;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ChiTietSanPhamResponse {

    private Long id;

    private Integer soLuong;

    private BigDecimal giaTien;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private CommonEnum.TrangThaiChiTietSanPham trangThai;

    private LoaiDe loaiDe;

    private DiaHinhSan diaHinhSan;

    private SanPham sanPham;

    private MauSac mauSac;

    private KichCo kichCo;

}
