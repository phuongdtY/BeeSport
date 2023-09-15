package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.Voucher;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.VoucherMapper;
import com.poly.application.model.request.create_request.CreatedVoucherRequest;
import com.poly.application.model.request.update_request.UpdateVoucherRequest;
import com.poly.application.model.response.VoucherResponse;
import com.poly.application.repository.VoucherRepository;
import com.poly.application.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository repository;

    @Autowired
    private VoucherMapper mapper;


    @Override
    public Page<VoucherResponse> getAll(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Voucher> page = repository.findAll(pageable);
        return page.map(mapper::convertEntityToResponse);
    }

    @Override
    public VoucherResponse add(CreatedVoucherRequest request) {
        Voucher voucher = mapper.convertCreateRequestToEntity(request);
        voucher.setHinhThucGiam(CommonEnum.HinhThucGiam.PERCENT);
        voucher.setNgayTao(LocalDateTime.now());
        voucher.setTrangThai(CommonEnum.TrangThaiVoucher.ACTIVE);
        Voucher saveVoucher = this.repository.save(voucher);
        return mapper.convertEntityToResponse(saveVoucher);
    }

    @Override
    public VoucherResponse update(Long id, UpdateVoucherRequest request) {
        Optional<Voucher> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Voucher không tồn tại");
        }

        Voucher voucher = optional.get();
        voucher.setNgaySua(LocalDateTime.now());
        mapper.convertUpdateRequestToEntity(request, voucher);
        return mapper.convertEntityToResponse(repository.save(voucher));
    }

    @Override
    public VoucherResponse delete(Long id) {
        Optional<Voucher> optional = this.repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Voucher không tồn tại");
        }
        repository.delete(optional.get());
        return mapper.convertEntityToResponse(optional.get());
    }

    @Override
    public VoucherResponse findById(Long id) {
        Optional<Voucher> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Voucher không tồn tại");
        }
        return mapper.convertEntityToResponse(optional.get());
    }
}
