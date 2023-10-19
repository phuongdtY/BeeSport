package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import org.springframework.data.domain.Page;


public interface TaiKhoanService {

    Page<TaiKhoanResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder,String gioiTinhString, String searchText, String trangThaiString);

    TaiKhoanResponse add(CreatedTaiKhoanRequest request);

    TaiKhoanResponse update(Long id, UpdatedTaiKhoanRequest request);

    void  delete(Long id);

    TaiKhoanResponse findById(Long id);

    TaiKhoanResponse findByEmail(String email);

    TaiKhoanResponse khachHangCreat(CreatedTaiKhoanRequest request);



}
;