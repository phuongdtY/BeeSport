package com.poly.application.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.ThuongHieu;
import com.poly.application.model.mapper.ThuongHieuMapper;
import com.poly.application.model.request.create_request.CreatedThuongHieuRequest;
import com.poly.application.model.request.update_request.UpdatedThuongHieuRequest;
import com.poly.application.model.response.ThuongHieuResponse;
import com.poly.application.repository.ThuongHieuRepository;
import com.poly.application.service.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ThuongHieuServiceImpl implements ThuongHieuService {

    @Autowired
    private ThuongHieuRepository repository;

    @Autowired
    private ThuongHieuMapper mapper;

    @Override
    public Page<ThuongHieuResponse> getAll(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<ThuongHieu> page = repository.findAll(pageable);
        return page.map(mapper::convertEntityToResponse);
    }

    @Override
    public ThuongHieuResponse add(CreatedThuongHieuRequest request) {
        ThuongHieu createdThuongHieu = mapper.convertCreateRequestToEntity(request);
        createdThuongHieu.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        ThuongHieu savedThuongHieu = repository.save(createdThuongHieu);
        return mapper.convertEntityToResponse(savedThuongHieu);
    }

    @Override
    public ThuongHieuResponse delete(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Thương hiệu không tồn tại");
        }

        ThuongHieu thuongHieu = optional.get();
        repository.delete(thuongHieu);
        return mapper.convertEntityToResponse(thuongHieu);
    }

    @Override
    public ThuongHieuResponse update(Long id, UpdatedThuongHieuRequest request) {
        Optional<ThuongHieu> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Thương hiệu không tồn tại");
        }

        ThuongHieu thuongHieu = optional.get();
        mapper.convertUpdateRequestToEntity(request, thuongHieu);
        return mapper.convertEntityToResponse(repository.save(thuongHieu));
    }

    @Override
    public ThuongHieuResponse findById(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Thương hiệu không tồn tại");
        }

        ThuongHieu thuongHieu = optional.get();
        return mapper.convertEntityToResponse(thuongHieu);
    }
}
