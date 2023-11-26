package com.poly.application.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.VoucherChiTiet;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class VoucherResponse {

    private Long id;

    private String ma;

    private String ten;

    private Integer soLuong;

    private LocalDateTime ngayBatDau;

    private LocalDateTime ngayKetThuc;

    private HinhThucGiamGia hinhThucGiam;

    private BigDecimal giaTriGiam;

    private BigDecimal donToiThieu;

    private BigDecimal giamToiDa;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiVoucher trangThai;

    private List<VoucherChiTiet> voucherChiTietList;

    private  List<HoaDon> hoaDonList;

}
