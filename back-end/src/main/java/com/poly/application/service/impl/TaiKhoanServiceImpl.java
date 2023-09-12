package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.TaiKhoanMapper;
import com.poly.application.model.request.create_request.CreateTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.TaiKhoanService;
import com.poly.application.service.TaiKhoanVaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Autowired
    private TaiKhoanVaiTroService taiKhoanVaiTroService;

    @Autowired
    private TaiKhoanMapper taiKhoanMapper;


    @Override
    public Page<TaiKhoanResponse> getAll(Integer currentPage, Integer pageSize, String searchText, Integer trangThai, String gioiTinhString, String sorter, String sortOrder) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.GioiTinh gioiTinh;

        if (gioiTinhString == null || gioiTinhString.equals("")) {
            gioiTinh = null;
        }else {
            gioiTinh = CommonEnum.GioiTinh.valueOf(gioiTinhString);
        }
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<TaiKhoan> taiKhoanPage = taiKhoanRepository.findAllByVaiTro(pageable, "Nhân viên", searchText, trangThai,gioiTinh);
        return taiKhoanPage.map(taiKhoanMapper::convertEntityToResponse);
    }

    @Override
    public TaiKhoanResponse add(CreateTaiKhoanRequest request) {
        TaiKhoan canCuocCongDan = taiKhoanRepository.findByCanCuocCongDan(request.getCanCuocCongDan());
        TaiKhoan soDienThoai = taiKhoanRepository.findBySoDienThoai(request.getSoDienThoai());
        if (canCuocCongDan != null) {
            throw new BadRequestException("CMT/CCCD đã tồn tại trong hệ thống!");
        }
        if (soDienThoai != null) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống!");
        }
        if(request.getGioiTinh()==null){
            request.setGioiTinh(CommonEnum.GioiTinh.OTHER);
        }
        TaiKhoan createdTaiKhoan = taiKhoanMapper.convertCreateRequestToEntity(request);
        createdTaiKhoan.setTrangThai(1);
        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(createdTaiKhoan);
        taiKhoanVaiTroService.addNhanVien(savedTaiKhoan);
        return taiKhoanMapper.convertEntityToResponse(savedTaiKhoan);
    }

    @Override
    public TaiKhoanResponse findById(Long id) {
        Optional<TaiKhoan> taiKhoan = taiKhoanRepository.findById(id);
        if (taiKhoan.isEmpty()) {
            throw new NotFoundException("Tài khoản không tồn tại");
        }
        return taiKhoanMapper.convertEntityToResponse(taiKhoan.get());
    }

    @Override
    public TaiKhoanResponse update(Long id, UpdatedTaiKhoanRequest request) {
        Optional<TaiKhoan> optional = taiKhoanRepository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Tài khoản không tồn tại");
        }
        TaiKhoan canCuocCongDan = taiKhoanRepository.findByCanCuocCongDan(request.getCanCuocCongDan());
        TaiKhoan soDienThoai = taiKhoanRepository.findBySoDienThoai(request.getSoDienThoai());
        if (!request.getCanCuocCongDan().equals(canCuocCongDan.getCanCuocCongDan()) && taiKhoanRepository.existsByCanCuocCongDan(request.getCanCuocCongDan())) {
            throw new BadRequestException("Căn cước công dân đã tồn tại trong hệ thống. Vui lòng sử dụng căn cước công dân khác!");
        }
        if (!request.getCanCuocCongDan().equals(soDienThoai.getSoDienThoai()) && taiKhoanRepository.existsBySoDienThoai(request.getSoDienThoai())) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống. Vui lòng sử dụng số điện thoại khác!");
        }
        TaiKhoan detail = optional.get();
        taiKhoanMapper.convertUpdateRequestToEntity(request, detail);
        return taiKhoanMapper.convertEntityToResponse(taiKhoanRepository.save(detail));
    }

    @Override
    public void delete(Long id) {

    }
}
