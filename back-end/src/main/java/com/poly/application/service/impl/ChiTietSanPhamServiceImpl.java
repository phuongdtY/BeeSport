package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.ChiTietSanPhamMapper;
import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.model.response.ChiTietSanPhamResponse;
import com.poly.application.repository.ChiTietSanPhamRepository;
import com.poly.application.service.ChiTietSanPhamService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChiTietSanPhamServiceImpl implements ChiTietSanPhamService {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @Autowired
    private ChiTietSanPhamMapper mapper;

    @Override
    public List<ChiTietSanPhamResponse> findByAll(Long idSanPham, Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan) {
        List<ChiTietSanPham> list = repository.findByAll(idSanPham, idMauSac, idLoaiDe, idKichCo, idDiaHinhSan);
        return mapper.toResponseList(list);
    }

    @Override
    public Page<ChiTietSanPhamResponse> findByAllPage(Integer page, Integer pageSize, Long idSanPham, Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan) {
        return null;
    }

    @Override
    public List<ChiTietSanPhamResponse> getListChiTietSanPham() {
        List<ChiTietSanPham> list = repository.findAll();
        return list.stream().map(sanPham -> mapper.convertEntityToResponse(sanPham))
                .collect(Collectors.toList());
    }

    @Override
    public ChiTietSanPhamResponse findOne(Long idSanPham, Long idMauSac, Long idLoaiDe, Long idKichCo, Long idDiaHinhSan) {
        ChiTietSanPham chiTietSanPham = repository.findOneChiTietSanPham(idSanPham, idMauSac, idLoaiDe, idKichCo, idDiaHinhSan);
        return mapper.convertEntityToResponse(chiTietSanPham);
    }

    @Override
    public ChiTietSanPhamResponse add(CreatedChiTietSanPhamRequest request) {
        ChiTietSanPham createdChiTietSanPham = mapper.convertCreateRequestToEntity(request);
        createdChiTietSanPham.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.ACTIVE);
        ChiTietSanPham savedChiTietSanPham = repository.save(createdChiTietSanPham);
        return mapper.convertEntityToResponse(savedChiTietSanPham);
    }

    @Transactional
    @Override
    public List<ChiTietSanPhamResponse> addList(List<CreatedChiTietSanPhamRequest> requests) {
        List<ChiTietSanPhamResponse> responseList = new ArrayList<>();

        if (requests.size() == 1) {
            // Trường hợp chỉ có 1 sản phẩm, không cần sử dụng list và vòng lặp
            CreatedChiTietSanPhamRequest chiTietSanPhamRequest = requests.get(0);
            ChiTietSanPham createdChiTietSanPham = mapper.convertCreateRequestToEntity(chiTietSanPhamRequest);
            createdChiTietSanPham.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.ACTIVE);
            ChiTietSanPham savedChiTietSanPham = repository.save(createdChiTietSanPham);
            ChiTietSanPhamResponse response = mapper.convertEntityToResponse(savedChiTietSanPham);
            responseList.add(response);
        } else {
            // Trường hợp có nhiều sản phẩm, sử dụng list và vòng lặp
            for (CreatedChiTietSanPhamRequest chiTietSanPhamRequest : requests) {
                ChiTietSanPham createdChiTietSanPham = mapper.convertCreateRequestToEntity(chiTietSanPhamRequest);
                createdChiTietSanPham.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.ACTIVE);
                ChiTietSanPham savedChiTietSanPham = repository.save(createdChiTietSanPham);
                ChiTietSanPhamResponse response = mapper.convertEntityToResponse(savedChiTietSanPham);
                responseList.add(response);
            }
        }

        return responseList;
    }

    @Override
    public List<ChiTietSanPhamResponse> getListSanPhamAndMauSac(Long idSanPham, Long idMauSac) {

        List<ChiTietSanPham> list = repository.getListSanPhamAndMauSac(idSanPham, idMauSac);
        return list.stream().map(sanPham -> mapper.convertEntityToResponse(sanPham))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Chi tiết sản phẩm không tồn tại!");
        }

        ChiTietSanPham chiTietSanPham = optional.get();
        chiTietSanPham.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.INACTIVE);
        repository.save(chiTietSanPham);
    }

    @Override
    public ChiTietSanPhamResponse update(Long id, UpdatedChiTietSanPhamRequest request) {
        Optional<ChiTietSanPham> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Chi tiết sản phẩm không tồn tại!");
        }

        ChiTietSanPham chiTietSanPham = optional.get();
        chiTietSanPham.setSoLuong(request.getSoLuong());
        chiTietSanPham.setGiaTien(request.getGiaTien());
        chiTietSanPham.setLoaiDe(request.getLoaiDe());
        chiTietSanPham.setDiaHinhSan(request.getDiaHinhSan());
        chiTietSanPham.setMauSac(request.getMauSac());
        chiTietSanPham.setKichCo(request.getKichCo());
        chiTietSanPham.setSanPham(request.getSanPham());
        chiTietSanPham.setTrangThai(request.getTrangThai());
        return mapper.convertEntityToResponse(repository.save(chiTietSanPham));
    }

}
