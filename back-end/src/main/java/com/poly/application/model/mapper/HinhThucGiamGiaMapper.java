package com.poly.application.model.mapper;

import com.poly.application.entity.HinhThucGiamGia;
import com.poly.application.model.request.create_request.CreatedHinhThucGiamGiaRequest;
import com.poly.application.model.request.update_request.UpdatedHinhThucGiamGiaRequest;
import com.poly.application.model.response.HinhThucGiamGiaResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HinhThucGiamGiaMapper {

    @Autowired
    private ModelMapper modelMapper;

    public HinhThucGiamGiaResponse convertEntityToResponse(HinhThucGiamGia hinhThucGiamGia) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(hinhThucGiamGia, HinhThucGiamGiaResponse.class);
    }

    public HinhThucGiamGia convertCreateRequestToEntity(CreatedHinhThucGiamGiaRequest request) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return  modelMapper.map(request, HinhThucGiamGia.class);
    }

    public void convertUpdateRequestToEntity(UpdatedHinhThucGiamGiaRequest request, HinhThucGiamGia hinhThucGiamGia) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        modelMapper.map(request, hinhThucGiamGia);
    }

}
