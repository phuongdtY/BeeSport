package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedThuongHieuRequest;
import com.poly.application.model.request.update_request.UpdatedThuongHieuRequest;
import com.poly.application.model.response.ThuongHieuResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ThuongHieuService {

    List<ThuongHieuResponse> getThuongHieuByNgayTaoDESC();

    Page<ThuongHieuResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    ThuongHieuResponse add(CreatedThuongHieuRequest request);

    void delete(Long id);

    ThuongHieuResponse update(Long id, UpdatedThuongHieuRequest request);

    ThuongHieuResponse findById(Long id);

}
