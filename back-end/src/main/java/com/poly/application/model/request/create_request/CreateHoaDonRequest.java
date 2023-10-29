package com.poly.application.model.request.create_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.GiaoDich;
import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.entity.TaiKhoan;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class CreateHoaDonRequest {

    private Long id;

    private String ma;

    @Enumerated(EnumType.STRING)
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

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiHoaDon trangThaiHoaDon;

    private TaiKhoan taiKhoan;

    private List<GiaoDich> giaoDichList;

    private List<HoaDonChiTiet> hoaDonChiTietList;

}
