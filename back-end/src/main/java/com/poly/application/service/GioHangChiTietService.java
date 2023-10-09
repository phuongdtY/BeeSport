package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangChiTietRequest;
import com.poly.application.model.response.GioHangChiTietResponse;

public interface GioHangChiTietService {

    GioHangChiTietResponse add(CreatedGioHangChiTietRequest request);

    void delete(Long idGioHangChiTiet);

    GioHangChiTietResponse update(Long idGioHangChiTiet, UpdatedGioHangChiTietRequest request);

    GioHangChiTietResponse getOne(Long idGioHangChiTiet);

}
