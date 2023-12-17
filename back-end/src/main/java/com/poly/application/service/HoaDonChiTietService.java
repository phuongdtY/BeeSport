package com.poly.application.service;

import com.poly.application.model.request.create_request.CreateHoaDonChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonChiTietRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HoaDonChiTietService {

    Page<HoaDonChiTietResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder);

    HoaDonChiTietResponse add(CreateHoaDonChiTietRequest createHoaDonChiTietRequest, Long id);

    void addList(List<CreateHoaDonChiTietRequest> requestList);

    void updateList(List<UpdatedHoaDonChiTietRequest> requestList);

    HoaDonChiTietResponse findById(Long id);

    HoaDonChiTietResponse update(Long id, UpdatedHoaDonChiTietRequest updatedHoaDonChiTietRequest);
    HoaDonChiTietResponse updateSoLuong(Long id, Integer soLuong);

    void delete(Long id);

    void updateHoaDonChiTiet(List<UpdatedHoaDonChiTietRequest> updatedHoaDonChiTietRequests);

    List<HoaDonChiTietResponse> findByHoaDonId(Long id);

    Page<HoaDonChiTietResponse> getPageAllByIdHoaDon(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder, Long id);

}
