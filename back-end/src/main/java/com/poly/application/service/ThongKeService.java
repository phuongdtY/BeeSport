package com.poly.application.service;

import com.poly.application.model.response.ThongKeSoLuongTonResponse;
import com.poly.application.model.response.ThongKeTheoDMYResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface ThongKeService {

    ThongKeTheoDMYResponse thongKeTheoNgay(LocalDate ngayThanhToan);

    ThongKeTheoDMYResponse thongKeTheoTuan(LocalDate startOfWeek, LocalDate endOfWeek);

    ThongKeTheoDMYResponse thongKeTheoThang(LocalDate startOfMonth, LocalDate endOfMonth);

    ThongKeTheoDMYResponse thongKeTheoNam(LocalDate startOfYear, LocalDate endOfYear);

    ThongKeTheoDMYResponse thongKeTheoKhoangNgay(LocalDate start, LocalDate end);

    Page<ThongKeSoLuongTonResponse> thongKeSoLuongTon(Integer page, Integer pageSize);


}
