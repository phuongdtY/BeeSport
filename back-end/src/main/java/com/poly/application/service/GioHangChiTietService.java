package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangChiTietRequest;
import com.poly.application.model.response.GioHangChiTietResponse;

import java.util.List;

public interface GioHangChiTietService {

    GioHangChiTietResponse add(CreatedGioHangChiTietRequest request);

    void delete(Long idGioHangChiTiet);
    void deleteAll(Long idGioHang);

    GioHangChiTietResponse update(Long idGioHangChiTiet, UpdatedGioHangChiTietRequest request);

    void updateGioHang(List<UpdatedGioHangChiTietRequest> requests);

    List<GioHangChiTietResponse> getListGioHangChiTietByGioHangId(Long idGioHang);

}
