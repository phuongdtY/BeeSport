package com.poly.application.service.impl;

import com.poly.application.model.response.ThongKeSoLuongTonResponse;
import com.poly.application.model.response.ThongKeTheoDMYResponse;
import com.poly.application.repository.ThongKeRepository;
import com.poly.application.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    private ThongKeRepository repository;

    @Override
    public ThongKeTheoDMYResponse thongKeTheoNgay(LocalDate ngayThanhToan) {
        return repository.thongKeTheoNgay(ngayThanhToan);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoTuan(LocalDate startOfWeek, LocalDate endOfWeek) {
        return repository.thongKeTheoTuan(startOfWeek, endOfWeek);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoThang(LocalDate startOfMonth, LocalDate endOfMonth) {
        return repository.thongKeTheoTuan(startOfMonth, endOfMonth);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoNam(LocalDate startOfYear, LocalDate endOfYear) {
        return repository.thongKeTheoTuan(startOfYear, endOfYear);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoKhoangNgay(LocalDate start, LocalDate end) {
        return repository.thongKeTheoTuan(start, end);
    }

    @Override
    public Page<ThongKeSoLuongTonResponse> thongKeSoLuongTon(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<ThongKeSoLuongTonResponse> pageThongKe = repository.thongKeSoLuongTon(pageable);
        return pageThongKe;
    }

}
