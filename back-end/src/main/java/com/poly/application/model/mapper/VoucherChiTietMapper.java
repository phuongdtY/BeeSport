package com.poly.application.model.mapper;

import com.poly.application.entity.VoucherChiTiet;
import com.poly.application.model.request.create_request.CreatedVoucherChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherChiTietRequest;
import com.poly.application.model.response.VoucherChiTietResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VoucherChiTietMapper {

    @Autowired
    private ModelMapper modelMapper;

    public VoucherChiTietResponse convertEntityToResponse(VoucherChiTiet voucher) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(voucher, VoucherChiTietResponse.class);
    }

    public VoucherChiTiet convertCreateRequestToEntity(CreatedVoucherChiTietRequest request) {
        return modelMapper.map(request, VoucherChiTiet.class);
    }

    public VoucherChiTiet convertUpdateRequestToEntity(UpdatedVoucherChiTietRequest request, VoucherChiTiet detail) {
        modelMapper.map(request, detail);
        return detail;
    }

}
