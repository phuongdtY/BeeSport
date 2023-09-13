package com.poly.application.model.mapper;

import com.poly.application.entity.MauSac;
import com.poly.application.entity.ThuongHieu;
import com.poly.application.model.request.create_request.CreatedThuongHieuRequest;
import com.poly.application.model.request.update_request.UpdatedThuongHieuRequest;
import com.poly.application.model.response.ThuongHieuResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ThuongHieuMapper {

    @Autowired
    private ModelMapper mapper;

    public ThuongHieuResponse convertEntityToResponse(ThuongHieu thuongHieu) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(thuongHieu, ThuongHieuResponse.class);
    }

    public ThuongHieu convertCreateRequestToEntity(CreatedThuongHieuRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return  mapper.map(request, ThuongHieu.class);
    }

    public void convertUpdateRequestToEntity(UpdatedThuongHieuRequest request, ThuongHieu thuongHieu) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, thuongHieu);
    }

}
