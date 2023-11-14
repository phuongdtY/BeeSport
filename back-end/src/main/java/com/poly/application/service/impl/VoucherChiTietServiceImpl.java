package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.VoucherChiTiet;
import com.poly.application.model.mapper.VoucherChiTietMapper;
import com.poly.application.model.request.create_request.CreatedVoucherChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherChiTietRequest;
import com.poly.application.model.response.VoucherChiTietResponse;
import com.poly.application.repository.VoucherChiTietRepository;
import com.poly.application.service.VoucherChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherChiTietServiceImpl implements VoucherChiTietService {

    @Autowired
    private VoucherChiTietRepository repository;

    @Autowired
    private VoucherChiTietMapper mapper;

    @Override
    public List<VoucherChiTietResponse> getAllList() {
        List<VoucherChiTiet> list = repository.findAll();
        return list.stream().map(mapper::convertEntityToResponse).collect(Collectors.toList());
    }

    @Override
    public Page<VoucherChiTietResponse> getAllPage(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<VoucherChiTiet> chiTietPage = repository.getAllPage(pageable);
        return chiTietPage.map(mapper::convertEntityToResponse);
    }

    @Override
    public List<VoucherChiTietResponse> addList(CreatedVoucherChiTietRequest request) {
        List<VoucherChiTiet> list = new ArrayList<>();
        for (TaiKhoan taiKhoan : request.getTaiKhoan()) {
            VoucherChiTiet voucherChiTiet = VoucherChiTiet.builder().voucher(request.getVoucher()).soLanSuDung(request.getSoLanSuDung()).taiKhoan(taiKhoan).trangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE).build();
            list.add(voucherChiTiet);
        }
        repository.saveAll(list);
        return list.stream().map(mapper::convertEntityToResponse).collect(Collectors.toList());
    }

    @Override
    public VoucherChiTietResponse update(Long id, UpdatedVoucherChiTietRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
