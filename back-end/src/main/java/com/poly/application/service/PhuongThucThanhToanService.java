package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedVaiTroRequest;
import com.poly.application.model.request.update_request.UpdatedVaiTroRequest;
import com.poly.application.model.response.PhuongThucThanhToanResponse;
import com.poly.application.model.response.VaiTroResponse;
import org.springframework.data.domain.Page;

public interface PhuongThucThanhToanService {

    Page<PhuongThucThanhToanResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    PhuongThucThanhToanResponse add(CreatedVaiTroRequest request);

    PhuongThucThanhToanResponse update(Long id, UpdatedVaiTroRequest request);

    void  delete(Long id);

    PhuongThucThanhToanResponse findById(Long id);

}
