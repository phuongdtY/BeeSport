package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedThuongHieuRequest;
import com.poly.application.model.request.update_request.UpdatedThuongHieuRequest;
import com.poly.application.model.response.ThuongHieuResponse;
import org.springframework.data.domain.Page;

public interface ThuongHieuService {

    Page<ThuongHieuResponse> getAll(Integer pageNo, Integer pageSize);

    ThuongHieuResponse add(CreatedThuongHieuRequest request);

    ThuongHieuResponse delete(Long id);

    ThuongHieuResponse update(Long id, UpdatedThuongHieuRequest request);

    ThuongHieuResponse findById(Long id);

}
