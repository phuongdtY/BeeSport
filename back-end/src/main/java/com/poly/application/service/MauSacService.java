package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedMauSacRequest;
import com.poly.application.model.request.update_request.UpdatedMauSacRequest;
import com.poly.application.model.response.MauSacResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MauSacService {

    List<MauSacResponse> getMauSacByNgayTaoDESC();

    Page<MauSacResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder,String searchText,String trangThaiString);

    MauSacResponse add(CreatedMauSacRequest request);

    MauSacResponse update(Long id, UpdatedMauSacRequest request);

    void delete(Long id);

    MauSacResponse findById(Long id);

    List<MauSacResponse> getMauSacKhongLap(Long idSanPham);

}
