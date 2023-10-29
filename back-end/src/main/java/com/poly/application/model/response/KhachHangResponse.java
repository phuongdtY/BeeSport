package com.poly.application.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KhachHangResponse {
    private  Long id;

    private String hoVaTen;

    private String soDienThoai;

    private String email;

    private String matKhau;
}
