package com.poly.application.service;

import com.poly.application.common.CommonEnum;
import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.model.request.update_request.UpdatedGiaoDichRequest;
import com.poly.application.model.response.GiaoDichResponse;

import java.util.List;

public interface GiaoDichService {

    GiaoDichResponse add(CreateGiaoDichRequest request);

    void delete(Long id);

    GiaoDichResponse update(Long id, UpdatedGiaoDichRequest request);

    String updateByMa(String ma, String ngayThanhToan, CommonEnum.TrangThaiGiaoDich trangThaiGiaoDich);

    List<GiaoDichResponse> getListGiaoDich(Long idHoaDon);

    GiaoDichResponse findByMaGiaoDich(String maGiaoDich);


}
