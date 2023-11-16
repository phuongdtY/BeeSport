package com.poly.application.model.request.update_request;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.Voucher;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatedVoucherChiTietRequest {

    private Long id;

    private Integer SoLanSuDung;

    private CommonEnum.TrangThaiThuocTinh trangThai;

    private Voucher voucher;

    private TaiKhoan taiKhoan;

}
