package com.poly.application.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.poly.application.entity.GioHangChiTiet;
import com.poly.application.model.mapper.GioHangChiTietMapper;
import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangChiTietRequest;
import com.poly.application.model.response.GioHangChiTietResponse;
import com.poly.application.repository.GioHangChiTietRepository;
import com.poly.application.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GioHangChiTietServiceImpl implements GioHangChiTietService {

    @Autowired
    private GioHangChiTietRepository repository;

    @Autowired
    private GioHangChiTietMapper mapper;

    @Override
    public GioHangChiTietResponse add(CreatedGioHangChiTietRequest request) {
        GioHangChiTiet createdGioHangChiTiet = mapper.convertCreateRequestToEntity(request);
        createdGioHangChiTiet.setTrangThai(1);
        GioHangChiTiet savedGioHangChiTiet = this.repository.save(createdGioHangChiTiet);
        return mapper.convertEntityToResponse(savedGioHangChiTiet);
    }

    @Override
    public void delete(Long idGioHangChiTiet) {
        GioHangChiTiet gioHangChiTiet= repository.tim(idGioHangChiTiet);
        repository.delete(gioHangChiTiet);
    }

    @Override
    public GioHangChiTietResponse update(Long idGioHangChiTiet, UpdatedGioHangChiTietRequest request) {
        Optional<GioHangChiTiet> optional = repository.findById(idGioHangChiTiet);
        if (optional.isEmpty()) {
            throw new NotFoundException("Giỏ hàng chi tiết không tồn tại");
        }

        GioHangChiTiet gioHangChiTiet = optional.get();
        mapper.convertUpdateRequestToEntity(request, gioHangChiTiet);
        return mapper.convertEntityToResponse(repository.save(gioHangChiTiet));
    }

    @Override
    public GioHangChiTietResponse getOne(Long idGioHangChiTiet) {
        GioHangChiTiet gioHangChiTiet = repository.tim(idGioHangChiTiet);
        return mapper.convertEntityToResponse(gioHangChiTiet);
    }

}
