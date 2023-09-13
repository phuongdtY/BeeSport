package com.poly.application.model.mapper;

import com.poly.application.entity.MauSac;
import com.poly.application.model.request.create_request.CreatedMauSacRequest;
import com.poly.application.model.request.update_request.UpdatedMauSacRequest;
import com.poly.application.model.response.MauSacResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MauSacMapper {

    @Autowired
    private ModelMapper modelMapper;

    public MauSacResponse convertEntityToResponse(MauSac mauSac) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(mauSac, MauSacResponse.class);
    }

    public MauSac convertCreateRequestToEntity(CreatedMauSacRequest request) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(request, MauSac.class);
    }

    public void convertUpdatedRequestToEntity(UpdatedMauSacRequest request, MauSac mauSac) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        modelMapper.map(request, mauSac);
    }

}
