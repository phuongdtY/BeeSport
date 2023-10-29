package com.poly.application.model.mapper;

import com.poly.application.entity.HinhAnhSanPham;
import com.poly.application.entity.SanPham;
import com.poly.application.model.request.create_request.CreatedHinhAnhSanPhamRequest;
import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedHinhAnhSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.HinhAnhSanPhamResponse;
import com.poly.application.model.response.SanPhamResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HinhAnhSanPhamMapper {

    @Autowired
    private ModelMapper mapper;

    public HinhAnhSanPhamResponse convertEntityToResponse(HinhAnhSanPham hinhAnh) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(hinhAnh, HinhAnhSanPhamResponse.class);
    }

    public HinhAnhSanPham convertCreateRequestToEntity(CreatedHinhAnhSanPhamRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request, HinhAnhSanPham.class);
    }

    public void convertUpdateRequestToEntity(UpdatedHinhAnhSanPhamRequest request, HinhAnhSanPham hinhAnh) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, hinhAnh);
    }

}
