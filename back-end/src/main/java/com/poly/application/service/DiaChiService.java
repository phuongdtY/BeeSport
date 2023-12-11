package com.poly.application.service;

import com.poly.application.common.CommonEnum;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdatedDiaChiRequest;
import com.poly.application.model.response.DiaChiReponse;
import org.springframework.data.domain.Page;

public interface DiaChiService {

    Page<DiaChiReponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String trangThaiDiaChi, String searchText, String loaiDiaChi,Long idKH);

    DiaChiReponse add(Long id,CreatedDiaChiRequest request);

    DiaChiReponse findById(Long id);

    DiaChiReponse update(Long id, UpdatedDiaChiRequest request);

}
