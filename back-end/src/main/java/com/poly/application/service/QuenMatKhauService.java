package com.poly.application.service;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.request.QuenMatKhauRquest.QuenMatKhauRequest;
import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;

public interface QuenMatKhauService {

    void sendEmail(TaiKhoan taiKhoan);

    TaiKhoan oldPassword(QuenMatKhauRequest request);



    //aa


}
