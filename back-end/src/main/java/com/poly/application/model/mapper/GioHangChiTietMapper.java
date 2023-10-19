package com.poly.application.model.mapper;

import com.poly.application.entity.GioHangChiTiet;
import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.GioHangChiTietResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GioHangChiTietMapper {

    @Autowired
    private ModelMapper mapper;

    public GioHangChiTietResponse convertEntityToResponse(GioHangChiTiet gioHangChiTiet) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(gioHangChiTiet, GioHangChiTietResponse.class);
    }

    public GioHangChiTiet convertCreateRequestToEntity(CreatedGioHangChiTietRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request, GioHangChiTiet.class);
    }

    public void convertUpdateRequestToEntity(UpdatedGioHangChiTietRequest request, GioHangChiTiet gioHangChiTiet) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, GioHangChiTiet.class);
    }

}
