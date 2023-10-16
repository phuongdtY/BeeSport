package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedDiaHinhSanRequest;
import com.poly.application.model.request.update_request.UpdatedDiaHinhSanRequest;
import com.poly.application.model.response.DiaHinhSanResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DiaHinhSanService {

    Page<DiaHinhSanResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    DiaHinhSanResponse add(CreatedDiaHinhSanRequest request);

    DiaHinhSanResponse update(Long id, UpdatedDiaHinhSanRequest request);

    void delete(Long id);

    DiaHinhSanResponse findById(Long id);

    List<DiaHinhSanResponse> getDiaHinhSanKhongLap(Long idSanPham);

}
