package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.SanPhamResponse;
import org.springframework.data.domain.Page;

public interface SanPhamService {

    Page<SanPhamResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText,
                                 Long thuongHieuId, Long loaiDeId, Long diaHinhSanId, String trangThaiString);

    SanPhamResponse add(CreatedSanPhamRequest request);

    SanPhamResponse update(Long id, UpdatedSanPhamRequest request);

    void  delete(Long id);

    SanPhamResponse findById(Long id);

}
