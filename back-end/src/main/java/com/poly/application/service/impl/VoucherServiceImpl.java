package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhThucGiamGia;
import com.poly.application.entity.SanPham;
import com.poly.application.entity.Voucher;
import com.poly.application.exception.BadRequestException;
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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository repository;

    @Autowired
    private VoucherMapper mapper;


    @Override
    public Page<VoucherResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder,
                                        String searchText, Long hinhThucGiamGiaId,String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }
        CommonEnum.TrangThaiVoucher trangThai;
        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiVoucher.valueOf(trangThaiString);
        }
        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<Voucher> voucherPage = repository.findByALl(pageable, searchText, hinhThucGiamGiaId, trangThai);
        return voucherPage.map(mapper::convertEntityToResponse);
    }

    @Override
    public VoucherResponse add(CreatedVoucherRequest request) {
        Voucher createdVoucher = mapper.convertCreateRequestToEntity(request);

        String defaultString  = "BeeSprot"; // Chữ cái mặc định
        String code = defaultString;

        // Tạo một mảng boolean để theo dõi các số đã sử dụng
        boolean[] usedDigits  = new boolean[6];

        // Tạo một đối tượng Random để tạo số ngẫu nhiên
        Random random = new Random();

        for (int i = 0; i <= 6; i++) {
            int digit;
            do {
                digit = random.nextInt(6);
            } while (usedDigits[digit]);

            // Đánh dấu số đã sử dụng
            usedDigits[digit] = true;

            // Thêm số vào mã
            code += digit;
        }
        createdVoucher.setMa(code);
        createdVoucher.setTrangThai(CommonEnum.TrangThaiVoucher.ACTIVE);
        createdVoucher.setHinhThucGiamGia(request.getHinhThucGiam());
        Voucher savedVoucher = this.repository.save(createdVoucher);
        return mapper.convertEntityToResponse(savedVoucher);
    }

    @Override
    public VoucherResponse update(Long id, UpdateVoucherRequest request) {
        Optional<Voucher> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Voucher không tồn tại");
        }

        Voucher voucher = optional.get();
        voucher.setNgaySua(LocalDateTime.now());
        voucher.setHinhThucGiamGia(request.getHinhThucGiam());
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
