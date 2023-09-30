package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedVoucherRequest;
import com.poly.application.model.request.update_request.UpdateVoucherRequest;
import com.poly.application.model.response.VoucherResponse;
import org.springframework.data.domain.Page;

public interface VoucherService {

    Page<VoucherResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString);

    VoucherResponse add(CreatedVoucherRequest request);

    VoucherResponse update(Long id, UpdateVoucherRequest request);

    VoucherResponse delete(Long id);

    VoucherResponse findById(Long id);

}
