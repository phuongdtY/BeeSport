package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.MauSacMapper;
import com.poly.application.model.request.create_request.CreatedMauSacRequest;
import com.poly.application.model.request.update_request.UpdatedMauSacRequest;
import com.poly.application.model.response.MauSacResponse;
import com.poly.application.repository.MauSacRepository;
import com.poly.application.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    private MauSacRepository repository;

    @Autowired
    private MauSacMapper mapper;

    @Override
    public Page<MauSacResponse> getAll(Integer pageNo, Integer pageSize) {
//        Sort sort;
//
//        if ("ascend".equals(sortOrder)) {
//            sort = Sort.by(sorter).ascending();
//        } else if ("descend".equals(sortOrder)) {
//            sort = Sort.by(sorter).descending();
//        } else {
//            sort = Sort.by("ngayTao").descending();
//        }

//        CommonEnum.TrangThaiMauSac trangThai;
//
//        if (trangThaiString == null || trangThaiString.equals("")) {
//            trangThai = null;
//        } else {
//            trangThai = CommonEnum.TrangThaiMauSac.valueOf(trangThaiString);
//        }

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<MauSac> page = repository.findAll(pageable);
        return page.map(mapper::convertEntityToResponse);
    }

    @Override
    public MauSacResponse add(CreatedMauSacRequest request) {
        MauSac createdMauSac = mapper.convertCreateRequestToEntity(request);
        createdMauSac.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        MauSac savedMauSac = this.repository.save(createdMauSac);
        return mapper.convertEntityToResponse(savedMauSac);
    }

    @Override
    public MauSacResponse update(Long id, UpdatedMauSacRequest request) {
        Optional<MauSac> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Màu sắc không tồn tại");
        }

        MauSac mauSac = optional.get();
        mapper.convertUpdatedRequestToEntity(request, mauSac);
        return mapper.convertEntityToResponse(repository.save(mauSac));
    }

    @Override
    public MauSacResponse delete(Long id) {
        Optional<MauSac> optional = this.repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Màu sắc không tồn tại");
        }
        repository.delete(optional.get());
        return mapper.convertEntityToResponse(optional.get());
    }

    @Override
    public MauSacResponse findById(Long id) {
        Optional<MauSac> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Màu sắc không tồn tại");
        }

        return mapper.convertEntityToResponse(optional.get());
    }

}
