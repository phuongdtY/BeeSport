package com.poly.application.model.mapper;

import com.poly.application.entity.VaiTro;
import com.poly.application.model.request.create_request.CreatedVaiTroRequest;
import com.poly.application.model.request.update_request.UpdatedVaiTroRequest;
import com.poly.application.model.response.VaiTroResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VaiTroMapper {
    @Autowired
    private ModelMapper mapper;

    public VaiTroResponse convertEntityToResponse(VaiTro vaiTro){
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(vaiTro,VaiTroResponse.class);
    }

    public VaiTro convertCreateRequestToEntity(CreatedVaiTroRequest request){
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request,VaiTro.class);
    }

    public void convertUpdateRequestToEntity(UpdatedVaiTroRequest request, VaiTro vaiTro) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, vaiTro);
    }
}
