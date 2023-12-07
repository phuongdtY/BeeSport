package com.poly.application.service;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.dto.PasswordRequest;
import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import org.springframework.data.domain.Page;

import java.util.List;


public interface TaiKhoanService {

    Page<TaiKhoanResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder,String gioiTinhString, String searchText, String trangThaiString);

    List<TaiKhoan> getAllKhachHang1();
    Page<TaiKhoanResponse> getAllKhachHang(Integer page, Integer pageSize, String sortField, String sortOrder,String gioiTinhString, String searchText, String trangThaiString);

    TaiKhoanResponse add(CreatedTaiKhoanRequest request);

    TaiKhoanResponse update(Long id, UpdatedTaiKhoanRequest request);

    TaiKhoanResponse updateKhachHang(Long id, UpdatedTaiKhoanRequest request);

    void  delete(Long id);

    TaiKhoanResponse findById(Long id);

    TaiKhoanResponse addKhachHang(CreatedTaiKhoanRequest request);

    TaiKhoan getAllTaiKhoan(String email);

    String changePassword(PasswordRequest passwordRequest);

}
;