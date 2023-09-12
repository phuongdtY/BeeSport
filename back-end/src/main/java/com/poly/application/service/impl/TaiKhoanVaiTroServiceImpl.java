package com.poly.application.service.impl;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.TaiKhoanVaiTro;
import com.poly.application.entity.VaiTro;
import com.poly.application.repository.TaiKhoanVaiTroRepository;
import com.poly.application.repository.VaiTroRepository;
import com.poly.application.service.TaiKhoanVaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TaiKhoanVaiTroServiceImpl implements TaiKhoanVaiTroService {

    @Autowired
    private TaiKhoanVaiTroRepository taiKhoanVaiTroRepository;

    @Autowired
    private VaiTroRepository vaiTroRepository;

    @Override
    public void addKhachHang(TaiKhoan taiKhoan) {
        VaiTro khachHang = vaiTroRepository.findByTen("Khách hàng");
        TaiKhoanVaiTro tkvt = new TaiKhoanVaiTro();
        tkvt.setTaiKhoan(taiKhoan);
        tkvt.setVaiTro(khachHang);
        taiKhoanVaiTroRepository.save(tkvt);
    }

    @Override
    public void addNhanVien(TaiKhoan taiKhoan) {
        VaiTro nhanVien = vaiTroRepository.findByTen("Nhân viên");
        VaiTro khachHang = vaiTroRepository.findByTen("Khách hàng");
        List<VaiTro> vaiTroList = Arrays.asList(nhanVien, khachHang);
        for (VaiTro vaiTro : vaiTroList) {
            TaiKhoanVaiTro tkvt = new TaiKhoanVaiTro();
            tkvt.setTaiKhoan(taiKhoan);
            tkvt.setVaiTro(vaiTro);
            taiKhoanVaiTroRepository.save(tkvt);
        }
    }
}
