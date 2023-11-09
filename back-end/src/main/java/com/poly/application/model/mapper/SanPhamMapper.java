package com.poly.application.model.mapper;

import com.poly.application.entity.SanPham;
import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.SanPhamResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SanPhamMapper {

    @Autowired
    private ModelMapper mapper;

    public SanPhamResponse convertEntityToResponse(SanPham sanPham) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(sanPham, SanPhamResponse.class);
    }

    public SanPham convertCreateRequestToEntity(CreatedSanPhamRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request, SanPham.class);
    }

    public SanPham convertUpdateRequestToEntity(UpdatedSanPhamRequest request,SanPham sanPham) {
         mapper.map(request, sanPham);
        return sanPham;
    }

}
