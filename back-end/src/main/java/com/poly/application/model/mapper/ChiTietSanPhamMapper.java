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

import java.util.ArrayList;
import java.util.List;

@Component
public class ChiTietSanPhamMapper {

    @Autowired
    private ModelMapper mapper;

    public ChiTietSanPhamResponse convertEntityToResponse(ChiTietSanPham chiTietSanPham) {
        if (chiTietSanPham != null) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
            return mapper.map(chiTietSanPham, ChiTietSanPhamResponse.class);
        } else {
            System.out.println("HQL null");
            return null;
        }
    }

    public List<ChiTietSanPhamResponse> toResponseList(List<ChiTietSanPham> chiTietSanPhams) {
        List<ChiTietSanPhamResponse> responses = new ArrayList<>();
        for (ChiTietSanPham chiTietSanPham : chiTietSanPhams) {
            responses.add(convertEntityToResponse(chiTietSanPham));
        }
        return responses;
    }

    public ChiTietSanPham convertCreateRequestToEntity(CreatedChiTietSanPhamRequest request) {
        ChiTietSanPham chiTietSanPham = new ChiTietSanPham();

        chiTietSanPham.setSoLuong(request.getSoLuong());
        chiTietSanPham.setGiaTien(request.getGiaTien());
        chiTietSanPham.setNgayTao(request.getNgayTao());
        chiTietSanPham.setNgaySua(request.getNgaySua());
        chiTietSanPham.setNguoiTao(request.getNguoiTao());
        chiTietSanPham.setNguoiSua(request.getNguoiSua());
        chiTietSanPham.setTrangThai(request.getTrangThai());
        chiTietSanPham.setLoaiDe(request.getLoaiDe());
        chiTietSanPham.setDiaHinhSan(request.getDiaHinhSan());
        chiTietSanPham.setSanPham(request.getSanPham());
        chiTietSanPham.setMauSac(request.getMauSac());
        chiTietSanPham.setKichCo(request.getKichCo());

        return chiTietSanPham;
    }

    public void convertUpdateRequestToEntity(UpdatedChiTietSanPhamRequest request, ChiTietSanPham chiTietSanPham) {
        mapper.map(request, chiTietSanPham);
    }

}
