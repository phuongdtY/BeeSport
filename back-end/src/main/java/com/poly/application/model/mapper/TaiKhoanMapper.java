package com.poly.application.model.mapper;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaiKhoanMapper {

    @Autowired
    private ModelMapper modelMapper;

    public TaiKhoanResponse convertEntityToResponse(TaiKhoan taiKhoan) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(taiKhoan, TaiKhoanResponse.class);
    }

    public TaiKhoan convertCreateRequestToEntity(CreatedTaiKhoanRequest createTaiKhoanRequest) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        TypeMap<CreatedTaiKhoanRequest, TaiKhoan> typeMap = modelMapper.getTypeMap(CreatedTaiKhoanRequest.class, TaiKhoan.class);

        if (typeMap == null) {
            typeMap = modelMapper.createTypeMap(CreatedTaiKhoanRequest.class, TaiKhoan.class);
            typeMap.addMappings(mapper -> {
                mapper.map(source -> source.getVaiTro(), TaiKhoan::setVaiTro);
                // Ánh xạ các thuộc tính khác tại đây nếu cần
            });
        }

        return modelMapper.map(createTaiKhoanRequest, TaiKhoan.class);
    }




    public void convertUpdateRequestToEntity(UpdatedTaiKhoanRequest updateRequest, TaiKhoan detail) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.map(updateRequest, detail);
    }

}
