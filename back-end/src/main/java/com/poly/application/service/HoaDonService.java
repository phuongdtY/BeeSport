package com.poly.application.service;

import com.poly.application.common.CommonEnum;
import com.poly.application.model.request.create_request.CreateHoaDonRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import com.poly.application.model.response.HoaDonResponse;
import org.springframework.data.domain.Page;

public interface HoaDonService {

    Page<HoaDonResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder, String loaiHoaDonString, String trangThaiHoaDonString);

    HoaDonResponse add(CreateHoaDonRequest createHoaDonRequest);

    HoaDonResponse findById(Long id);

    HoaDonResponse update(Long id,UpdatedHoaDonRequest updatedHoaDonRequest);

    void delete(Long id);



}
