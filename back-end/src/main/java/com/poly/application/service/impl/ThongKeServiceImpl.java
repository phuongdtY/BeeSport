package com.poly.application.service.impl;

import com.poly.application.model.response.ThongKeTheoDMYResponse;
import com.poly.application.repository.ThongKeRepository;
import com.poly.application.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
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

}
