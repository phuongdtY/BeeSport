package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.model.response.ChiTietSanPhamResponse;

import java.util.List;

public interface ChiTietSanPhamService {

    ChiTietSanPhamResponse add(CreatedChiTietSanPhamRequest request);

    void delete(Long id);

    ChiTietSanPhamResponse update(UpdatedChiTietSanPhamRequest request);

}
