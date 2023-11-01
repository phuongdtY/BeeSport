package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.HinhThucGiamGiaMapper;
import com.poly.application.model.request.create_request.CreatedHinhThucGiamGiaRequest;
import com.poly.application.model.request.update_request.UpdatedHinhThucGiamGiaRequest;
import com.poly.application.model.response.HinhThucGiamGiaResponse;
import com.poly.application.repository.HinhThucGiamGiaRepository;
import com.poly.application.service.HinhThucGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class HinhThucGiamGiaServiceImpl implements HinhThucGiamGiaService {

    @Autowired
    private HinhThucGiamGiaRepository repository;

    @Autowired
    private HinhThucGiamGiaMapper mapper;

    @Override
    public Page<HinhThucGiamGiaResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder,
                                                String searchText, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.HinhThucGiam trangThai;

        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.HinhThucGiam.valueOf(trangThaiString);
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<HinhThucGiamGia> hinhThucGiamGiaPage = repository.findByAll(pageable, searchText, trangThai);
        return hinhThucGiamGiaPage.map(mapper::convertEntityToResponse);
    }

    @Override
    public HinhThucGiamGiaResponse add(CreatedHinhThucGiamGiaRequest request) {
        if (repository.existsByTen(request.getTen())) {
            throw new BadRequestException("Tên hình thức giảm giá đã tồn tại trong hệ thống!");
        }

        HinhThucGiamGia createdHinhThucGiam = mapper.convertCreateRequestToEntity(request);
        createdHinhThucGiam.setTrangThai(CommonEnum.HinhThucGiam.ACTIVE);
        return mapper.convertEntityToResponse(repository.save(createdHinhThucGiam));
    }

    @Override
    public void delete(Long id) {
        Optional<HinhThucGiamGia> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Hình thức giảm giá không tồn tại");
        }

        HinhThucGiamGia hinhThucGiamGia = optional.get();
        repository.delete(hinhThucGiamGia);
    }

    @Override
    public HinhThucGiamGiaResponse update(Long id, UpdatedHinhThucGiamGiaRequest request) {
        Optional<HinhThucGiamGia> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Hình thức giảm giá không tồn tại");
        }
        HinhThucGiamGia hinhThucGiamGia = optional.get();
        hinhThucGiamGia.setNgaySua(LocalDateTime.now());
        mapper.convertUpdateRequestToEntity(request, hinhThucGiamGia);
        return mapper.convertEntityToResponse(repository.save(hinhThucGiamGia));
    }

    @Override
    public HinhThucGiamGiaResponse findById(Long id) {
        Optional<HinhThucGiamGia> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Hình thức giảm giá không tồn tại");
        }

        HinhThucGiamGia hinhThucGiamGia = optional.get();
        return mapper.convertEntityToResponse(hinhThucGiamGia);
    }
}
