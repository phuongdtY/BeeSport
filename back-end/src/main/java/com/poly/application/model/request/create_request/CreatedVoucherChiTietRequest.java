package com.poly.application.model.request.create_request;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.Voucher;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CreatedVoucherChiTietRequest {

    private Integer soLanSuDung;

    private Voucher voucher;

    private TaiKhoan taiKhoan;


}
