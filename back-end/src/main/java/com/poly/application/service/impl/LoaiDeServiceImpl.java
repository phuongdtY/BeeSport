package com.poly.application.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.LoaiDe;
import com.poly.application.exception.BadRequestException;
import com.poly.application.model.mapper.LoaiDeMapper;
import com.poly.application.model.request.create_request.CreatedLoaiDeRequest;
import com.poly.application.model.request.update_request.UpdatedLoaiDeRequest;
import com.poly.application.model.response.LoaiDeResponse;
import com.poly.application.repository.LoaiDeRepository;
import com.poly.application.service.LoaiDeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoaiDeServiceImpl implements LoaiDeService {

    @Autowired
    private LoaiDeRepository repository;

    @Autowired
    private LoaiDeMapper mapper;

    @Override
    public Page<LoaiDeResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = org.springframework.data.domain.Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = org.springframework.data.domain.Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.TrangThaiThuocTinh trangThai;

        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiThuocTinh.valueOf(trangThaiString);
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<LoaiDe> loaiDePage = repository.findByAll(pageable, searchText, trangThai);
        return loaiDePage.map(mapper::convertEntityToResponse);
    }

    @Override
    public LoaiDeResponse add(CreatedLoaiDeRequest request) {
        if (repository.existsByTen(request.getTen())) {
            throw new BadRequestException("Tên loại đế đã tồn tại trong hệ thống!");
        }
        LoaiDe createdLoaiDe = mapper.convertCreateResponseToEntity(request);
        createdLoaiDe.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        LoaiDe savedLoaiDe = repository.save(createdLoaiDe);
        return mapper.convertEntityToResponse(savedLoaiDe);
    }

    @Override
    public LoaiDeResponse update(Long id, UpdatedLoaiDeRequest request) {
        Optional<LoaiDe> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Loại đế không tồn tại");
        }

        if (!request.getTen().equals(optional.get().getTen()) && repository.existsByTen(request.getTen())) {
            throw new BadRequestException("Tên loại đế đã tồn tại trong hệ thống!");
        }

        LoaiDe loaiDe = optional.get();
        mapper.convertUpdateRequestToEntity(request, loaiDe);
        return mapper.convertEntityToResponse(repository.save(loaiDe));
    }

    @Override
    public void delete(Long id) {
        Optional<LoaiDe> optional = repository.findById(id);

        if (optional.isEmpty()) {
            throw new NotFoundException("Loại đế không tồn tại");
        }

        LoaiDe loaiDe = optional.get();
        repository.delete(loaiDe);
    }

    @Override
    public LoaiDeResponse findById(Long id) {
        Optional<LoaiDe> optional = repository.findById(id);

        if (optional.isEmpty()) {
            throw new NotFoundException("Loại đế không tồn tại");
        }

        LoaiDe loaiDe = optional.get();
        return mapper.convertEntityToResponse(loaiDe);
    }

}
