package com.poly.application.service;

import com.poly.application.entity.HinhAnhSanPham;
import com.poly.application.model.request.create_request.CreatedHinhAnhSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedHinhAnhSanPhamRequest;
import com.poly.application.model.response.HinhAnhSanPhamResponse;

import java.util.List;

public interface HinhAnhSanPhamService {

    List<HinhAnhSanPhamResponse> getAll(Long idSanPham, Long idMauSac);

    List<HinhAnhSanPhamResponse> add(List<CreatedHinhAnhSanPhamRequest> request);

    void delete(List<HinhAnhSanPham> request);

    HinhAnhSanPham update(List<UpdatedHinhAnhSanPhamRequest> request);

}
