package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ChiTietSanPhamService {

    List<ChiTietSanPhamResponse> findByAll(Long idSanPham,Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan);
    Page<ChiTietSanPhamResponse> findByAllPage(Integer page, Integer pageSize,Long idSanPham, Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan);

    List<ChiTietSanPhamResponse> getListChiTietSanPham();

    ChiTietSanPhamResponse findOne(Long idSanPham,Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan);

    ChiTietSanPhamResponse add(CreatedChiTietSanPhamRequest request);

    List<ChiTietSanPhamResponse> addList(List<CreatedChiTietSanPhamRequest> requests);

    void delete(Long id);

    ChiTietSanPhamResponse update(Long id, UpdatedChiTietSanPhamRequest request);

}
