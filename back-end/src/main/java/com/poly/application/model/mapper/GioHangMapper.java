package com.poly.application.model.mapper;

import com.poly.application.entity.GioHang;
import com.poly.application.model.request.create_request.CreatedGioHangRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangRequest;
import com.poly.application.model.response.GioHangResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GioHangMapper {

    @Autowired
    private ModelMapper mapper;

    public GioHangResponse convertEntityToResponse(GioHang gioHang) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(gioHang, GioHangResponse.class);
    }

    public GioHang convertCreateRequestToEntity(CreatedGioHangRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        // Bỏ qua ánh xạ cho trường id
        mapper.typeMap(CreatedGioHangRequest.class, GioHang.class).addMappings(mapping -> {
            mapping.skip(GioHang::setId);
        });

        return mapper.map(request, GioHang.class);
    }

    public void convertUpdateRequestToEntity(UpdatedGioHangRequest request, GioHang gioHang) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, gioHang);
    }

}
