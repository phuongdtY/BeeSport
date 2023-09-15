package com.poly.application.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.model.mapper.DiaHinhSanMapper;
import com.poly.application.model.request.create_request.CreatedDiaHinhSanRequest;
import com.poly.application.model.request.update_request.UpdatedDiaHinhSanRequest;
import com.poly.application.model.response.DiaHinhSanResponse;
import com.poly.application.repository.DiaHinhSanRepository;
import com.poly.application.service.DiaHinhSanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiaHinhSanServiceImpl implements DiaHinhSanService {

    @Autowired
    private DiaHinhSanRepository repository;

    @Autowired
    private DiaHinhSanMapper mapper;

    @Override
    public Page<DiaHinhSanResponse> getAll(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<DiaHinhSan> page = repository.findAll(pageable);
        return page.map(mapper::convertEntityToResponse);
    }

    @Override
    public DiaHinhSanResponse add(CreatedDiaHinhSanRequest request) {
        DiaHinhSan createdDiaHinhSan = mapper.convertCreateResponseToEntity(request);
        createdDiaHinhSan.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        DiaHinhSan savedDiaHinhSan = repository.save(createdDiaHinhSan);
        return mapper.convertEntityToResponse(savedDiaHinhSan);
    }

    @Override
    public DiaHinhSanResponse update(Long id, UpdatedDiaHinhSanRequest request) {
        Optional<DiaHinhSan> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa hình sân không tồn tại");
        }

        DiaHinhSan diaHinhSan = optional.get();
        mapper.convertUpdateRequestToEntity(request, diaHinhSan);
        return mapper.convertEntityToResponse(repository.save(diaHinhSan));
    }

    @Override
    public DiaHinhSanResponse delete(Long id) {
        Optional<DiaHinhSan> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa hình sân không tồn tại");
        }
        DiaHinhSan diaHinhSan = optional.get();
        repository.delete(diaHinhSan);
        return mapper.convertEntityToResponse(diaHinhSan);
    }

    @Override
    public DiaHinhSanResponse findById(Long id) {
        Optional<DiaHinhSan> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa hình sân không tồn tại");
        }
        DiaHinhSan diaHinhSan = optional.get();
        return mapper.convertEntityToResponse(diaHinhSan);
    }

}
