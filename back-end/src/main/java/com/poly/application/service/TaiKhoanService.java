package com.poly.application.service;

import com.poly.application.model.request.create_request.CreateTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaiKhoanService {

    Page<TaiKhoanResponse> getAll(Integer currentPage, Integer pageSize, String searchText, Integer trangThai, String gioiTinhString, String sorter, String sortOrder);

    TaiKhoanResponse add(CreateTaiKhoanRequest request);

    TaiKhoanResponse findById(Long id);

    TaiKhoanResponse update(Long id, UpdatedTaiKhoanRequest request);

    void delete(Long id);


}
;