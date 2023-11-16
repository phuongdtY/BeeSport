package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.Voucher;

import java.time.LocalDateTime;

public class VoucherChiTietResponse {

    private Long id;
    private Integer SoLanSuDung;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private CommonEnum.TrangThaiThuocTinh trangThai;
    private Voucher voucher;
    private TaiKhoan taiKhoan;

}
