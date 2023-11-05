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
import com.poly.application.utils.VoucherUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository repository;

    @Autowired
    private VoucherMapper mapper;

    @Autowired
    private VoucherUtils voucherUtils;


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

        String defaultString = "BeeSprot"; // Chữ cái mặc định
        int length = 6; // Độ dài của chuỗi số ngẫu nhiên

        // Tạo danh sách các chữ số từ 0 đến 9
        List<Integer> digits = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            digits.add(i);
        }

        // Trộn ngẫu nhiên danh sách chữ số
        Collections.shuffle(digits);

        // Lấy length chữ số đầu tiên từ danh sách đã trộn
        List<Integer> selectedDigits = digits.subList(0, length);

        // Tạo chuỗi số ngẫu nhiên không trùng lặp
        StringBuilder randomDigits = new StringBuilder();
        for (int digit : selectedDigits) {
            randomDigits.append(digit);
        }

        // Kết hợp chuỗi số ngẫu nhiên với chữ cái mặc định
        String code = defaultString + randomDigits.toString();

        createdVoucher.setMa(code);
        createdVoucher.setHinhThucGiamGia(request.getHinhThucGiam());
        String status = voucherUtils.getVoucherStatusWithInactive(
                createdVoucher.getNgayBatDau().toLocalDate(),
                createdVoucher.getNgayKetThuc().toLocalDate()
        );

        if (status.equals("ACTIVE")){
            createdVoucher.setTrangThai(CommonEnum.TrangThaiVoucher.ACTIVE);
        } else if (status.equals("EXPIRED")){
            createdVoucher.setTrangThai(CommonEnum.TrangThaiVoucher.EXPIRED);
        } else if (status.equals("INACTIVE")) {
            createdVoucher.setTrangThai(CommonEnum.TrangThaiVoucher.INACTIVE);
        } else {
            createdVoucher.setTrangThai(CommonEnum.TrangThaiVoucher.UPCOMING);
        }
        System.out.println("Trạng thái: " + status);
        createdVoucher.setNgayTao(LocalDateTime.now());
        System.out.println(createdVoucher.getNgayTao());
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

        voucher.setNgayBatDau(request.getNgayBatDau());
        voucher.setNgayKetThuc(request.getNgayKetThuc());
        voucher.setHinhThucGiamGia(request.getHinhThucGiam());
        voucher.setGiaToiThieu(request.getGiaToiThieu());
        voucher.setGiaTriGiam(request.getGiaTriGiam());
        voucher.setGiaTriGiamToiDa(request.getGiaTriGiamToiDa());

        mapper.convertUpdateRequestToEntity(request, voucher);
        String status = voucherUtils.getVoucherStatusWithInactive(
                voucher.getNgayBatDau().toLocalDate(),
                voucher.getNgayKetThuc().toLocalDate()
        );

        if (status.equals("ACTIVE")) {
            voucher.setTrangThai(CommonEnum.TrangThaiVoucher.ACTIVE);
        } else if (status.equals("EXPIRED")) {
            voucher.setTrangThai(CommonEnum.TrangThaiVoucher.EXPIRED);
        } else if (status.equals("INACTIVE")) {
            voucher.setTrangThai(CommonEnum.TrangThaiVoucher.INACTIVE);
        } else {
            voucher.setTrangThai(CommonEnum.TrangThaiVoucher.UPCOMING);
        }
        System.out.println("Trạng thái: " + status);
        System.out.println(voucher.getTrangThai());
        Voucher updatedVoucher = repository.save(voucher);
        return mapper.convertEntityToResponse(updatedVoucher);
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
