package com.poly.application.service.impl;

import com.poly.application.common.GenCode;
import com.poly.application.entity.GiaoDich;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.mapper.GiaoDichMapper;
import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.model.request.update_request.UpdatedGiaoDichRequest;
import com.poly.application.model.response.GiaoDichResponse;
import com.poly.application.repository.GiaoDichRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.GiaoDichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GiaoDichServiceImpl implements GiaoDichService {

    @Autowired
    private GiaoDichRepository giaoDichRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private GiaoDichMapper giaoDichMapper;

    @Override
    public GiaoDichResponse add(CreateGiaoDichRequest request) {
        GiaoDich createGiaoDich = giaoDichMapper.convertCreateGiaoDichRequestToGiaoDichEntity(request);

        if (request.getTaiKhoan() != null) {
            TaiKhoan taiKhoan = taiKhoanRepository.findById(request.getTaiKhoan().getId()).orElse(null);
            createGiaoDich.setTaiKhoan(taiKhoan);
        }

        createGiaoDich.setMaGiaoDich(GenCode.generateGiaoDichCode());
        GiaoDich savedGiaoDich = giaoDichRepository.save(createGiaoDich);
        return giaoDichMapper.convertGiaoDichEntityToGiaoDichResponse(savedGiaoDich);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public GiaoDichResponse update(Long id, UpdatedGiaoDichRequest request) {
        return null;
    }
}
