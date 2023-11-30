package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.repository.DonHangRepository;
import com.poly.application.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonHangServiceImpl implements DonHangService {

    @Autowired
    private DonHangRepository repository;

    @Autowired
    private HoaDonMapper mapper;

    @Override
    public List<HoaDonResponse> getAllHoaDonCuaTaiKhoan(Long idTaiKhoan, String trangThaiHoaDon) {
        CommonEnum.TrangThaiHoaDon trangThai = null;

        if (trangThaiHoaDon != null && !trangThaiHoaDon.isEmpty()) {
            try {
                trangThai = CommonEnum.TrangThaiHoaDon.valueOf(trangThaiHoaDon.toUpperCase());
            } catch (IllegalArgumentException e) {
                return Collections.emptyList();
            }
        }

        List<HoaDon> list = repository.getAllHoaDonCuaTaiKhoan(idTaiKhoan, trangThai);
        return list.stream()
                .map(mapper::convertHoaDonEntityToHoaDonResponse)
                .collect(Collectors.toList());
    }


}
