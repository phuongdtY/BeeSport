package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedMauSacRequest;
import com.poly.application.model.request.update_request.UpdatedMauSacRequest;
import com.poly.application.model.response.MauSacResponse;
import org.springframework.data.domain.Page;

public interface MauSacService {

    Page<MauSacResponse> getAll(Integer pageNo, Integer pageSize);

    MauSacResponse add(CreatedMauSacRequest request);

    MauSacResponse update(Long id, UpdatedMauSacRequest request);

    MauSacResponse delete(Long id);

    MauSacResponse findById(Long id);

}
