package com.poly.application.service.impl;

import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.HoaDonChiTietMapper;
import com.poly.application.model.request.create_request.CreateHoaDonChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonChiTietRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import com.poly.application.repository.HoaDonChiTietRepository;
import com.poly.application.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {

    @Autowired
    private HoaDonChiTietMapper hoaDonChiTietMapper;

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Override
    public Page<HoaDonChiTietResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<HoaDonChiTiet> hoaDonChiTietPage = hoaDonChiTietRepository.findAll(pageable);
        return hoaDonChiTietPage.map(hoaDonChiTietMapper::convertHoaDonChiTietEntityToHoaDonChiTietResponse);
    }

    @Override
    public HoaDonChiTietResponse add(CreateHoaDonChiTietRequest createHoaDonChiTietRequest) {
        HoaDonChiTiet createHoaDonChiTiet = hoaDonChiTietMapper.convertCreateHoaDonChiTietRequestToHoaDonChiTietEntity(createHoaDonChiTietRequest);
        HoaDonChiTiet savedHoaDonChiTiet = hoaDonChiTietRepository.save(createHoaDonChiTiet);
        return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(savedHoaDonChiTiet);
    }

    @Override
    public HoaDonChiTietResponse findById(Long id) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(id);
        if (hoaDonChiTiet.isEmpty()){
            throw new NotFoundException("Hóa đơn chi tiết không tồn tại");
        }
        return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTiet.get());
    }

    @Override
    public HoaDonChiTietResponse update(UpdatedHoaDonChiTietRequest updatedHoaDonChiTietRequest) {
        return null;
    }

    @Override
    public void delete(Long id) {
        Optional<HoaDonChiTiet> optional = hoaDonChiTietRepository.findById(id);

        if (optional.isEmpty()) {
            throw new com.amazonaws.services.mq.model.NotFoundException("hóa đơn chi tiết không tồn tại");
        }

        HoaDonChiTiet donChiTiet = optional.get();

        hoaDonChiTietRepository.delete(donChiTiet);

    }

    @Override
    public List<HoaDonChiTietResponse> findByHoaDonId(Long id) {
        List<HoaDonChiTiet> hoaDonChiTietList = hoaDonChiTietRepository.findAllByHoaDonId(id);
        return hoaDonChiTietMapper.convertListHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTietList);
    }

    @Override
    public Page<HoaDonChiTietResponse> getPageAllByIdHoaDon(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder, Long id) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<HoaDonChiTiet> hoaDonChiTietPage = hoaDonChiTietRepository.findPageHoaDonChiTiet(pageable,searchText,id);
        return hoaDonChiTietPage.map(hoaDonChiTietMapper::convertHoaDonChiTietEntityToHoaDonChiTietResponse);
    }
}
