package com.poly.application.model.mapper;

import com.poly.application.entity.DiaChi;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.SanPham;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdatedDiaHinhSanRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.DiaChiReponse;
import com.poly.application.model.response.DiaHinhSanResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DiaChiMapper {
    @Autowired
    private ModelMapper mapper;

    public DiaChiReponse convertEntityToResponse(DiaChi diaChi) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(diaChi, DiaChiReponse.class);
    }


    public DiaChi convertCreateResponseToEntity(CreatedDiaChiRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(request, DiaChi.class);
    }

    public DiaChi convertUpdateRequestToEntity(UpdatedDiaChiRequest request, DiaChi diaChi) {
        mapper.map(request, diaChi);
        return diaChi;
    }

}
