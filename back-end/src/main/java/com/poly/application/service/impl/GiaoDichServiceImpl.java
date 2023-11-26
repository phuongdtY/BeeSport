package com.poly.application.service.impl;

import com.poly.application.common.GenCode;
import com.poly.application.entity.GiaoDich;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.GiaoDichMapper;
import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.model.request.update_request.UpdatedGiaoDichRequest;
import com.poly.application.model.response.GiaoDichResponse;
import com.poly.application.repository.GiaoDichRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.GiaoDichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        GiaoDich giaoDich = giaoDichRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Giao dich không tồn tại"));
        if (request.getMaGiaoDich() != null) {
            giaoDich.setMaGiaoDich(request.getMaGiaoDich());
        }
        if (request.getSoTienGiaoDich() != null) {
            giaoDich.setSoTienGiaoDich(request.getSoTienGiaoDich());
        }
        if (request.getTrangThaiGiaoDich() != null) {
            giaoDich.setTrangThaiGiaoDich(request.getTrangThaiGiaoDich());
        }
        if (request.getHoaDon() != null) {
            giaoDich.setHoaDon(request.getHoaDon());
        }
        if (request.getTaiKhoan() != null) {
            giaoDich.setTaiKhoan(request.getTaiKhoan());
        }
        if (request.getPhuongThucThanhToan() != null) {
            giaoDich.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
        }
        return giaoDichMapper.convertGiaoDichEntityToGiaoDichResponse(giaoDichRepository.save(giaoDich));
    }
    @Override
    public List<GiaoDichResponse> getListGiaoDich(Long idHoaDon) {
        List<GiaoDich> giaoDichList = giaoDichRepository.findGiaoDichesByHoaDonId(idHoaDon);
        return giaoDichList
                .stream()
                .map(giaoDichMapper::convertGiaoDichEntityToGiaoDichResponse)
                .collect(Collectors.toList());
    }
}
