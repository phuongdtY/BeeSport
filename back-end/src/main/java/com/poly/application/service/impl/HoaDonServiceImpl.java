package com.poly.application.service.impl;

import com.poly.application.entity.HoaDon;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.request.create_request.CreateHoaDonRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonRequest;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.repository.HoaDonRepository;
import com.poly.application.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class HoaDonServiceImpl implements HoaDonService{

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private HoaDonMapper hoaDonMapper;

    @Override
    public Page<HoaDonResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<HoaDon> hoaDonPage = hoaDonRepository.findAll(pageable);
        return hoaDonPage.map(hoaDonMapper::convertHoaDonEntityToHoaDonResponse);
    }

    @Override
    public HoaDonResponse add(CreateHoaDonRequest createHoaDonRequest) {

        HoaDon createHoaDon = hoaDonMapper.convertCreateHoaDonRequestToHoaDonEntity(createHoaDonRequest);
        HoaDon savedHoaDon = hoaDonRepository.save(createHoaDon);
        return hoaDonMapper.convertHoaDonEntityToHoaDonResponse(savedHoaDon);
    }

    @Override
    public HoaDonResponse findById(Long id) {
        return null;
    }

    @Override
    public HoaDonResponse update(UpdatedHoaDonRequest updatedHoaDonRequest) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
