package com.poly.application.model.mapper;

import com.poly.application.entity.KichCo;
import com.poly.application.model.request.create_request.CreatedKichCoRequest;
import com.poly.application.model.request.update_request.UpdatedKichCoRequest;
import com.poly.application.model.response.KichCoResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class KichCoMapper {

    @Autowired
    private ModelMapper mapper;

    public KichCoResponse convertEntityToResponse(KichCo kichCo) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(kichCo, KichCoResponse.class);
    }

    public KichCo convertCreateRequestToEntity(CreatedKichCoRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request, KichCo.class);
    }

    public void convertUpdateRequestToEntity(UpdatedKichCoRequest request, KichCo kichCo) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, kichCo);
    }

}
