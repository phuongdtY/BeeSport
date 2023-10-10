package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedLoaiDeRequest;
import com.poly.application.model.request.update_request.UpdatedLoaiDeRequest;
import com.poly.application.model.response.LoaiDeResponse;
import org.springframework.data.domain.Page;

public interface LoaiDeService {

    Page<LoaiDeResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    LoaiDeResponse add(CreatedLoaiDeRequest request);

    LoaiDeResponse update(Long id, UpdatedLoaiDeRequest request);

    void delete(Long id);

    LoaiDeResponse findById(Long id);

}
