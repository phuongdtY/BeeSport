package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.response.DiaChiReponse;

public interface DiaChiService {
    DiaChiReponse add(Long id,CreatedDiaChiRequest request);
}
