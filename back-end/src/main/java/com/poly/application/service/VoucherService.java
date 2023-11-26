package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedVoucherRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherRequest;
import com.poly.application.model.response.VoucherResponse;
import org.springframework.data.domain.Page;

import java.util.List;

import java.time.LocalDateTime;
import java.util.List;

public interface VoucherService {

    Page<VoucherResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder,
                                 String searchText, Long hinhThucGiamGiaId, String trangThaiString,
                                 LocalDateTime ngayBatDau, LocalDateTime ngayKetThuc);

    List<VoucherResponse> getListVoucher();

    VoucherResponse add(CreatedVoucherRequest request);

    VoucherResponse update(Long id, UpdatedVoucherRequest request);

    VoucherResponse delete(Long id);

    VoucherResponse findById(Long id);

    VoucherResponse findByMa(String ma);

    void updateVoucherStatus();

    void cancelVoucher(Long id);
}
