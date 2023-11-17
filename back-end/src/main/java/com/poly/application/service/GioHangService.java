package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedGioHangRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangRequest;
import com.poly.application.model.response.GioHangResponse;

public interface GioHangService {

    GioHangResponse create(CreatedGioHangRequest request);

    GioHangResponse getOne(Long id);

    GioHangResponse update(Long id, UpdatedGioHangRequest request);

}
