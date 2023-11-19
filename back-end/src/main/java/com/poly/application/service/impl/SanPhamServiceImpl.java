package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.SanPham;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.SanPhamMapper;
import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.*;
import com.poly.application.repository.SanPhamRepository;
import com.poly.application.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

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
    public Page<SanPhamFilterResponse> filterSanPham(Integer page, Integer pageSize, String sapXep, BigDecimal minPrice, BigDecimal maxPrice, List<Long> listThuongHieu, List<Long> listMauSac, List<Long> listDiaHinhSan, List<Long> listKichCo, List<Long> listLoaiDe) {
        Sort sort;
        if (sapXep.equalsIgnoreCase("1")) {
            sort = Sort.by("giaMin").ascending();
        } else if (sapXep.equalsIgnoreCase("2")) {
            sort = Sort.by("giaMin").descending();
        } else if (sapXep.equalsIgnoreCase("3")) {
            sort = Sort.by("ten").ascending();
        } else if (sapXep.equalsIgnoreCase("4")) {
            sort = Sort.by("ten").descending();
        } else if (sapXep.equalsIgnoreCase("5")) {
            sort = Sort.by("ngayTao").ascending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<SanPhamFilterResponse> sanPhamPage = repository.filterSanPham(pageable, minPrice, maxPrice, listThuongHieu, listMauSac, listDiaHinhSan, listKichCo, listLoaiDe);
        return sanPhamPage;
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
        SanPham detail = optional.get();

        if (!request.getTen().equals(detail.getTen()) && repository.existsByTen(request.getTen())) {
            throw new BadRequestException("Tên sản phẩm đã tồn tại trong hệ thống!");
        }

        // Ánh xạ các trường từ UpdatedSanPhamRequest sang SanPham
        mapper.convertUpdateRequestToEntity(request,detail);

        // Lưu thay đổi vào cơ sở dữ liệu
        detail = repository.save(detail);
        // Trả về thông tin sản phẩm sau khi cập nhật
        SanPhamResponse response = new SanPhamResponse();
        // Điền thông tin sản phẩm vào response dựa trên detail

        return response;
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



    @Override
    public List<SanPhamResponse> get5SanPhamMoiNhat() {
        List<SanPham> sanPhamMoiNhat = repository.get5SanPhamMoiNhat();

        List<SanPhamResponse> sanPhamResponses = sanPhamMoiNhat
                .stream()
                .map(mapper::convertEntityToResponse)
                .collect(Collectors.toList());

        return sanPhamResponses
                .stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    @Override
    public List<SanPhamMoiNhatResponse> giaTien5SanPhamMoiNhat() {
        List<SanPhamMoiNhatResponse> giaTien5SanPhamMoiNhat = repository.findAllSanPhamMoiNhat();

        List<SanPhamMoiNhatResponse> chiTietSanPhamResponse = giaTien5SanPhamMoiNhat
                .stream()
                .collect(Collectors.toList());

        return chiTietSanPhamResponse
                .stream()
                .limit(10)
                .collect(Collectors.toList());
    }

    @Override
    public SanPhamDetailResponse getSanPhamDetail(Long id) {
        SanPhamDetailResponse detail = repository.getDetailSanPham(id);
        return detail;
    }

    @Override
    public List<SanPhamResponse> getAllSanPhamNullCTSP() {
        List<SanPham> listSanPham = repository.getAllSanPhamNullCTSP();
        return listSanPham.stream()
                .map(sanPham -> mapper.convertEntityToResponse(sanPham))
                .collect(Collectors.toList());
    }

    @Override
    public List<SanPhamBanChayResponse> get5SanPhamBanChayNhat() {
        List<SanPhamBanChayResponse> banChayNhat = repository.findAllSanPhamBanChay();

        List<SanPhamBanChayResponse> chiTietSanPhamResponse = banChayNhat
                .stream()
                .collect(Collectors.toList());

        return chiTietSanPhamResponse
                .stream()
                .limit(5)
                .collect(Collectors.toList());
    }

}
