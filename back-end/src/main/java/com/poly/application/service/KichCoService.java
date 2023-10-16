package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedKichCoRequest;
import com.poly.application.model.request.update_request.UpdatedKichCoRequest;
import com.poly.application.model.response.KichCoResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface KichCoService {

    Page<KichCoResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    KichCoResponse add(CreatedKichCoRequest request);

    KichCoResponse update(Long id, UpdatedKichCoRequest request);

    void delete(Long id);

    KichCoResponse findById(Long id);

    List<KichCoResponse> getKichCoKhongLap(Long id);

}
