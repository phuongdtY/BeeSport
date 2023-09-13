package com.poly.application.model.mapper;

import com.poly.application.entity.DiaHinhSan;
import com.poly.application.model.request.create_request.CreatedDiaHinhSanRequest;
import com.poly.application.model.request.update_request.UpdatedDiaHinhSanRequest;
import com.poly.application.model.response.DiaHinhSanResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DiaHinhSanMapper {

    @Autowired
    private ModelMapper mapper;

    public DiaHinhSanResponse convertEntityToResponse(DiaHinhSan diaHinhSan) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(diaHinhSan, DiaHinhSanResponse.class);
    }

    public DiaHinhSan convertCreateResponseToEntity(CreatedDiaHinhSanRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request, DiaHinhSan.class);
    }

    public void convertUpdateRequestToEntity(UpdatedDiaHinhSanRequest request, DiaHinhSan diaHinhSan) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, diaHinhSan);
    }

}
