package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedVoucherChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherChiTietRequest;
import com.poly.application.model.response.VoucherChiTietResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VoucherChiTietService {

    List<VoucherChiTietResponse> getAllList();

    Page<VoucherChiTietResponse> getAllPage(Integer page,Integer pageSize);

    List<VoucherChiTietResponse> addList(CreatedVoucherChiTietRequest request);

    VoucherChiTietResponse update(Long id, UpdatedVoucherChiTietRequest request);

    void delete(Long id);

}
