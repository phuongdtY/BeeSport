package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaChi;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.DiaChiMapper;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdatedDiaChiRequest;
import com.poly.application.model.response.DiaChiReponse;
import com.poly.application.repository.DiaChiRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiaChiServiceImpl implements DiaChiService {

    @Autowired
    private DiaChiMapper diaChiMapper;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Override
    public Page<DiaChiReponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String trangThaiDiaChi, String searchText, String loaiDiaChi,Long taiKhoanId) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.TrangThaiDiaChi trangThai;
        if (trangThaiDiaChi == null || trangThaiDiaChi.equals("")) {
            trangThai = null;
        }else {
            trangThai = CommonEnum.TrangThaiDiaChi.valueOf(trangThaiDiaChi);
        }
        CommonEnum.LoaiDiaChi loaiDiaChi1;

        if (loaiDiaChi == null || loaiDiaChi.equals("")) {
            loaiDiaChi1 = null;
        } else {
            loaiDiaChi1 = CommonEnum.LoaiDiaChi.valueOf(loaiDiaChi);
        }
        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<DiaChi> diaChiPage = diaChiRepository.findAllByTaiKhoanId(pageable, searchText,trangThai,loaiDiaChi1,taiKhoanId);
        return diaChiPage.map(diaChiMapper::convertEntityToResponse);
    }

    @Override
    public DiaChiReponse add(Long id,CreatedDiaChiRequest request) {
        DiaChi createdDiaChi = diaChiMapper.convertCreateResponseToEntity(request);
        createdDiaChi.setLoaiDiaChi(CommonEnum.LoaiDiaChi.OTHER);
        createdDiaChi.setTrangThaiDiaChi(CommonEnum.TrangThaiDiaChi.ACTIVE);
        createdDiaChi.setTaiKhoan(taiKhoanRepository.findId(id));
        DiaChi savedDC = diaChiRepository.save(createdDiaChi);
        return diaChiMapper.convertEntityToResponse(savedDC);
    }

    @Override
    public DiaChiReponse findById(Long id) {
        Optional<DiaChi> diaChi = diaChiRepository.findId(id);
        if (diaChi.isEmpty()) {
            throw new NotFoundException("Địa chỉ không tồn tại");
        }
        return diaChiMapper.convertEntityToResponse(diaChi.get());
    }

    @Override
    public DiaChiReponse update(Long id, UpdatedDiaChiRequest request) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa chỉ không tồn tại");
        }

        DiaChi detail = optional.get();
        diaChiMapper.convertUpdateRequestToEntity(request, detail);
        System.out.println(detail);
        DiaChiReponse diaChiReponse = diaChiMapper.convertEntityToResponse(diaChiRepository.save(detail));
        System.out.println(diaChiReponse.getId());
        System.out.println(diaChiReponse);
        return diaChiReponse;
    }


}
