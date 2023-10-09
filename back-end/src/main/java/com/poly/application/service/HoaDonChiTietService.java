package com.poly.application.service;

import com.poly.application.model.request.create_request.CreateHoaDonChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonChiTietRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import org.springframework.data.domain.Page;

public interface HoaDonChiTietService {

    Page<HoaDonChiTietResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder);

    HoaDonChiTietResponse add(CreateHoaDonChiTietRequest createHoaDonChiTietRequest);

    HoaDonChiTietResponse findById(Long id);

    HoaDonChiTietResponse update(UpdatedHoaDonChiTietRequest updatedHoaDonChiTietRequest);

    void delete(Long id);

}
