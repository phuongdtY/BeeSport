package com.poly.application.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.poly.application.entity.GioHang;
import com.poly.application.entity.GioHangChiTiet;
import com.poly.application.model.mapper.GioHangChiTietMapper;
import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangChiTietRequest;
import com.poly.application.model.response.GioHangChiTietResponse;
import com.poly.application.repository.GioHangChiTietRepository;
import com.poly.application.repository.GioHangRepository;
import com.poly.application.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GioHangChiTietServiceImpl implements GioHangChiTietService {

    @Autowired
    private GioHangChiTietRepository repository;

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private GioHangChiTietMapper mapper;

    @Override
    public GioHangChiTietResponse add(CreatedGioHangChiTietRequest request) {
        GioHangChiTiet gioHangChiTiet = repository.existGioHangChiTiet(request.getChiTietSanPham().getId(), request.getGioHang().getId());
        if (gioHangChiTiet != null) {
            gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong() + request.getSoLuong());
            GioHangChiTiet savedGioHangChiTiet = this.repository.save(gioHangChiTiet);
            return mapper.convertEntityToResponse(savedGioHangChiTiet);
        } else {
            GioHangChiTiet createdGioHangChiTiet = mapper.convertCreateRequestToEntity(request);
            createdGioHangChiTiet.setTrangThai(1);
            GioHangChiTiet savedGioHangChiTiet = this.repository.save(createdGioHangChiTiet);
            return mapper.convertEntityToResponse(savedGioHangChiTiet);
        }
    }

    @Override
    public void delete(Long idGioHangChiTiet) {
        Optional<GioHangChiTiet> optional = repository.findById(idGioHangChiTiet);

        if (optional.isEmpty()) {
            throw new NotFoundException("Giỏ hàng chi tiết không tồn tại");
        }

        GioHangChiTiet gioHangChiTiet = optional.get();
        repository.delete(gioHangChiTiet);
    }

    @Override
    public void deleteAll(Long idGioHang) {
        GioHang gioHang = gioHangRepository.findById(idGioHang).orElse(null);

        if (gioHang != null) {
            gioHang.getGioHangChiTietList().forEach(ghct -> repository.delete(ghct));
        }
    }


    @Override
    public GioHangChiTietResponse update(Long idGioHangChiTiet, UpdatedGioHangChiTietRequest request) {
        Optional<GioHangChiTiet> optional = repository.findById(idGioHangChiTiet);
        if (optional.isEmpty()) {
            throw new NotFoundException("Giỏ hàng chi tiết không tồn tại");
        }

        GioHangChiTiet gioHangChiTiet = optional.get();
        gioHangChiTiet.setSoLuong(request.getSoLuong());
        gioHangChiTiet.setNgayTao(gioHangChiTiet.getNgayTao());
        mapper.convertUpdateRequestToEntity(request, gioHangChiTiet);
        return mapper.convertEntityToResponse(repository.save(gioHangChiTiet));
    }

    @Override
    public void updateGioHang(List<UpdatedGioHangChiTietRequest> requests) {
        for (UpdatedGioHangChiTietRequest gioHang: requests) {
            update(gioHang.getId(), gioHang);
        }
    }

    @Override
    public List<GioHangChiTietResponse> getListGioHangChiTietByGioHangId(Long idGioHang) {
        List<GioHangChiTiet> list = repository.findGioHangChiTietsByGioHangId(idGioHang);

        List<GioHangChiTietResponse> gioHangChiTietResponses = list
                .stream()
                .map(mapper::convertEntityToResponse)
                .collect(Collectors.toList());

        return gioHangChiTietResponses
                .stream()
                .collect(Collectors.toList());
    }

}
