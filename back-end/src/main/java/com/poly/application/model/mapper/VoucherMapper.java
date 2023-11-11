package com.poly.application.model.mapper;

import com.poly.application.entity.Voucher;
import com.poly.application.model.request.create_request.CreatedVoucherRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherRequest;
import com.poly.application.model.response.VoucherResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VoucherMapper {

    @Autowired
    private ModelMapper modelMapper;

    public VoucherResponse convertEntityToResponse(Voucher voucher) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(voucher, VoucherResponse.class);
    }

    public Voucher convertCreateRequestToEntity(CreatedVoucherRequest createdVoucherRequest) {
        return modelMapper.map(createdVoucherRequest, Voucher.class);
    }

    public Voucher convertUpdateRequestToEntity(UpdatedVoucherRequest updateRequest, Voucher detail) {
        modelMapper.map(updateRequest, detail);
        return detail;
    }

}
