package com.poly.application.service;

import com.poly.application.model.response.ThongKeTheoDMYResponse;

import java.time.LocalDate;

public interface ThongKeService {

    ThongKeTheoDMYResponse thongKeTheoNgay(LocalDate ngayThanhToan);

}
