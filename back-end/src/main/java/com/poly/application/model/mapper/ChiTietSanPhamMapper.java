package com.poly.application.model.mapper;

import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.entity.SanPham;
import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import com.poly.application.model.response.SanPhamResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChiTietSanPhamMapper {

    @Autowired
    private ModelMapper mapper;

    public ChiTietSanPhamResponse convertEntityToResponse(ChiTietSanPham chiTietSanPham) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(chiTietSanPham, ChiTietSanPhamResponse.class);
    }

    public ChiTietSanPhamResponse convertCreateRequestToEntity(CreatedChiTietSanPhamRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        // Cấu hình ánh xạ tự động các thuộc tính id từ request vào SanPham
//        PropertyMap<CreatedSanPhamRequest, SanPham> idMapping = new PropertyMap<CreatedSanPhamRequest, SanPham>() {
//            protected void configure() {
//                map().getThuongHieu().setId(source.getThuongHieu().getId());
//            }
//        };
//        mapper.addMappings(idMapping);

        return mapper.map(request, ChiTietSanPhamResponse.class);
    }

    public void convertUpdateRequestToEntity(UpdatedChiTietSanPhamRequest request, ChiTietSanPham chiTietSanPham) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, chiTietSanPham);
    }

}
