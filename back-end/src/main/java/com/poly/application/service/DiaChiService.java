package com.poly.application.service;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaChi;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdateDCReuest;
import com.poly.application.model.request.update_request.UpdatedDiaChiRequest;
import com.poly.application.model.response.DiaChiReponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DiaChiService {

    Page<DiaChiReponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String trangThaiDiaChi, String searchText,Long idKH);

    DiaChiReponse add(Long id,CreatedDiaChiRequest request);

    List<DiaChiReponse> findByListDiaChi(Long idTaiKhoan);

    DiaChiReponse findById(Long id);

    DiaChi update(Long id, UpdatedDiaChiRequest request);

    DiaChi updateTrangThai(Long id, UpdateDCReuest request);

    void delete(Long id);

}
