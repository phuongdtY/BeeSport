package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedVaiTroRequest;
import com.poly.application.model.request.update_request.UpdatedVaiTroRequest;
import com.poly.application.model.response.VaiTroResponse;
import org.springframework.data.domain.Page;

public interface VaiTroService {
    Page<VaiTroResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    VaiTroResponse add(CreatedVaiTroRequest request);

    VaiTroResponse update(Long id, UpdatedVaiTroRequest request);

    void  delete(Long id);

    VaiTroResponse findById(Long id);
}
