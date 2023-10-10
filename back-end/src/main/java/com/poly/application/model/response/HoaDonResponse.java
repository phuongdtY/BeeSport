package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class HoaDonResponse {

    private Long id;

    private String ma;

    private CommonEnum.LoaiHoaDon loaiHoaDon;

    private LocalDateTime ngayThanhToan;

    private BigDecimal phiShip;

    private BigDecimal tongTien;

    private BigDecimal tongTienKhiGiam;

    private String ghiChu;

    private String nguoiNhan;

    private String sdtNguoiNhan;

    private LocalDateTime ngayShip;

    private String diaChiNguoiNhan;

    private String emailNguoiNhan;

    private LocalDateTime ngayNhan;

    private LocalDateTime ngayMongMuon;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private CommonEnum.TrangThaiHoaDon trangThaiHoaDon;

}
