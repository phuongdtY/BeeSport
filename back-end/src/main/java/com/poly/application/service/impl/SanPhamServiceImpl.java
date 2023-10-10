package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.MauSac;
import com.poly.application.entity.SanPham;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.SanPhamMapper;
import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.SanPhamResponse;
import com.poly.application.repository.SanPhamRepository;
import com.poly.application.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository repository;

    @Autowired
    private SanPhamMapper mapper;

    @Override
    public Page<SanPhamResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, Long thuongHieuId, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.TrangThaiSanPham trangThai;

        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiSanPham.valueOf(trangThaiString);
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<SanPham> pageSanPham = repository.findByAll(pageable, searchText, thuongHieuId, trangThai);
        return pageSanPham.map(mapper::convertEntityToResponse);
    }

    @Override
    public SanPhamResponse add(CreatedSanPhamRequest request) {
        if (repository.existsByTen(request.getTen())) {
            throw new BadRequestException("Tên sản phẩm đã tồn tại trong hệ thống!");
        }
        SanPham createdSanPham = mapper.convertCreateRequestToEntity(request);

        // Tự GEN mã
        String prefix = "BS";
        String code = prefix;

        // Tạo một mảng boolean để theo dõi các số đã sử dụng
        boolean[] usedNumbers = new boolean[10];

        // Tạo một đối tượng Random để tạo số ngẫu nhiên
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int digit;
            do {
                // Tạo số ngẫu nhiên từ 0 đến 9
                digit = random.nextInt(10);
            } while (usedNumbers[digit]);

            // Đánh dấu số đã sử dụng
            usedNumbers[digit] = true;

            // Thêm số vào mã
            code += digit;
        }
        createdSanPham.setMa(code);
        createdSanPham.setTrangThai(CommonEnum.TrangThaiSanPham.ACTIVE);
        SanPham savedSanPham = this.repository.save(createdSanPham);
        return mapper.convertEntityToResponse(savedSanPham);
    }

    @Override
    public SanPhamResponse update(Long id, UpdatedSanPhamRequest request) {
        Optional<SanPham> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Sản phẩm không tồn tại!");
        }
        if (!request.getTen().equals(optional.get().getTen())&&repository.existsByTen(request.getTen())) {
            throw new BadRequestException("Tên sản phẩm đã tồn tại trong hệ thống!");
        }

        SanPham sanPham = optional.get();
        sanPham.setTen(request.getTen());
        sanPham.setMoTa(request.getMoTa());
        sanPham.setThuongHieu(request.getThuongHieu());
        sanPham.setTrangThai(CommonEnum.TrangThaiSanPham.valueOf(request.getTrangThai()));
        return mapper.convertEntityToResponse(repository.save(sanPham));
    }

    @Override
    public void delete(Long id) {
        Optional<SanPham> optional = this.repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Sản phẩm không tồn tại");
        }
        repository.delete(optional.get());
    }

    @Override
    public SanPhamResponse findById(Long id) {
        Optional<SanPham> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Sản phẩm không tồn tại");
        }

        return mapper.convertEntityToResponse(optional.get());
    }
}
