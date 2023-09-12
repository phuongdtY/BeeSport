package com.poly.application.model.mapper;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.request.create_request.CreateTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaiKhoanMapper {

    @Autowired
    private ModelMapper modelMapper;

    public TaiKhoan convertResponseToEntity(TaiKhoanResponse taiKhoanResponse) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(taiKhoanResponse, TaiKhoan.class);
    }

    public TaiKhoanResponse convertEntityToResponse(TaiKhoan taiKhoan) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(taiKhoan, TaiKhoanResponse.class);
    }

    public TaiKhoan convertCreateRequestToEntity(CreateTaiKhoanRequest createTaiKhoanRequest) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(createTaiKhoanRequest, TaiKhoan.class);
    }

    public void convertUpdateRequestToEntity(UpdatedTaiKhoanRequest updateRequest, TaiKhoan detail) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        modelMapper.map(updateRequest, detail);
    }

}
