package com.poly.application.model.request.create_request;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.Voucher;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreatedVoucherChiTietRequest {

    private Integer SoLanSuDung;

    private Voucher voucher;

    private List<TaiKhoan> taiKhoan;

}
