package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.Voucher;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VoucherChiTietResponse {

    private Long id;
    private Integer soLanSuDung;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private CommonEnum.TrangThaiThuocTinh trangThai;
    private Voucher voucher;
    private TaiKhoan taiKhoan;

}
