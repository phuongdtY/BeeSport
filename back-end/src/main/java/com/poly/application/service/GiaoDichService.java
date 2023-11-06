package com.poly.application.service;

import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedGiaoDichRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangChiTietRequest;
import com.poly.application.model.response.GiaoDichResponse;
import com.poly.application.model.response.GioHangChiTietResponse;
import com.poly.application.model.response.HoaDonResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface GiaoDichService {

    GiaoDichResponse add(CreateGiaoDichRequest request);

    void delete(Long id);

    GiaoDichResponse update(Long id, UpdatedGiaoDichRequest request);


}
