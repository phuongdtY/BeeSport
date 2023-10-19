package com.poly.application.service.impl;

import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.model.mapper.ChiTietSanPhamMapper;
import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import com.poly.application.repository.ChiTietSanPhamRepository;
import com.poly.application.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChiTietSanPhamServiceImpl implements ChiTietSanPhamService {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @Autowired
    private ChiTietSanPhamMapper mapper;

    @Override
    public List<ChiTietSanPhamResponse> findByAll(Long idSanPham, Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan) {
        List<ChiTietSanPham> list = repository.findByAll(idSanPham, idMauSac, idLoaiDe, idKichCo, idDiaHinhSan);
        return mapper.toResponseList(list);
    }

    @Override
    public ChiTietSanPhamResponse findOne(Long idSanPham, Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan) {
        ChiTietSanPham chiTietSanPham = repository.findOneChiTietSanPham(idSanPham, idMauSac, idLoaiDe, idKichCo, idDiaHinhSan);
        return mapper.convertEntityToResponse(chiTietSanPham);
    }

    @Override
    public ChiTietSanPhamResponse add(CreatedChiTietSanPhamRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public ChiTietSanPhamResponse update(UpdatedChiTietSanPhamRequest request) {
        return null;
    }

}
