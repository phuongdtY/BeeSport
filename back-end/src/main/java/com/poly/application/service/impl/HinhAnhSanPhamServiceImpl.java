package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HinhAnhSanPham;
import com.poly.application.model.mapper.HinhAnhSanPhamMapper;
import com.poly.application.model.request.create_request.CreatedHinhAnhSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedHinhAnhSanPhamRequest;
import com.poly.application.model.response.HinhAnhSanPhamResponse;
import com.poly.application.repository.HinhAnhSanPhamRepository;
import com.poly.application.service.HinhAnhSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HinhAnhSanPhamServiceImpl implements HinhAnhSanPhamService {

    @Autowired
    private HinhAnhSanPhamRepository repository;

    @Autowired
    private HinhAnhSanPhamMapper mapper;

    @Override
    public List<HinhAnhSanPhamResponse> getAll(Long idSanPham, Long idMauSac) {
        List<HinhAnhSanPham> listHinhAnh = repository.getAll(idSanPham, idMauSac);
        return listHinhAnh.stream()
                .map(hinhAnh -> mapper.convertEntityToResponse(hinhAnh))
                .collect(Collectors.toList());
    }

    @Override
    public List<HinhAnhSanPhamResponse> add(List<CreatedHinhAnhSanPhamRequest> request) {
        List<HinhAnhSanPhamResponse> listHinhAnh = new ArrayList<>();

        if (request.size() == 1) {
            CreatedHinhAnhSanPhamRequest createdHinhAnh = request.get(0);
            HinhAnhSanPham entityHinhAnh = mapper.convertCreateRequestToEntity(createdHinhAnh);
            entityHinhAnh.setTrangThai(CommonEnum.TrangThaiHinhAnh.DEFAULT);
            HinhAnhSanPham savedHinhAnh = repository.save(entityHinhAnh);
            HinhAnhSanPhamResponse responseHinhAnh = mapper.convertEntityToResponse(savedHinhAnh);

            listHinhAnh.add(responseHinhAnh);
        } else {
            for (CreatedHinhAnhSanPhamRequest hinhAnh: request) {
                HinhAnhSanPham entityHinhAnh = mapper.convertCreateRequestToEntity(hinhAnh);
                entityHinhAnh.setTrangThai(CommonEnum.TrangThaiHinhAnh.DEFAULT);
                HinhAnhSanPham savedHinhAnh = repository.save(entityHinhAnh);
                HinhAnhSanPhamResponse responseHinhAnh = mapper.convertEntityToResponse(savedHinhAnh);

                listHinhAnh.add(responseHinhAnh);
            }
        }
        return listHinhAnh;
    }

    @Override
    public void delete(List<HinhAnhSanPham> request) {

    }

    @Override
    public HinhAnhSanPham update(List<UpdatedHinhAnhSanPhamRequest> request) {
        return null;
    }
}
