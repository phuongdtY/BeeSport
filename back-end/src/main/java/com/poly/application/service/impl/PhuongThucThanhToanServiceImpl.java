package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.PhuongThucThanhToan;
import com.poly.application.entity.VaiTro;
import com.poly.application.model.mapper.PhuongThucThanhToanMapper;
import com.poly.application.model.request.create_request.CreatedVaiTroRequest;
import com.poly.application.model.request.update_request.UpdatedVaiTroRequest;
import com.poly.application.model.response.PhuongThucThanhToanResponse;
import com.poly.application.model.response.VaiTroResponse;
import com.poly.application.repository.PhuongThucThanhToanRepository;
import com.poly.application.service.PhuongThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PhuongThucThanhToanServiceImpl implements PhuongThucThanhToanService {

    @Autowired
    private PhuongThucThanhToanRepository phuongThucThanhToanRepository;

    @Autowired
    private PhuongThucThanhToanMapper phuongThucThanhToanMapper;

    @Override
    public Page<PhuongThucThanhToanResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
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
        Page<PhuongThucThanhToan> phuongThucThanhToanPage = phuongThucThanhToanRepository.findByAll(pageable, searchText, trangThai);
        return phuongThucThanhToanPage.map(phuongThucThanhToanMapper::convertPhuongThucThanhToanEntityToPhuongThucThanhToanResponse);
    }

    @Override
    public PhuongThucThanhToanResponse add(CreatedVaiTroRequest request) {
        return null;
    }

    @Override
    public PhuongThucThanhToanResponse update(Long id, UpdatedVaiTroRequest request) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public PhuongThucThanhToanResponse findById(Long id) {
        return null;
    }
}
