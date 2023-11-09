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
import org.springframework.data.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
    public Page<ChiTietSanPhamResponse> findByAllPage(Integer page, Integer pageSize, Long idSanPham, Long idMauSac, Long idKichCo, Long idLoaiDe, Long idDiaHinhSan, BigDecimal minGiaTien, BigDecimal maxGiaTien) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<ChiTietSanPham> sanPhamPage = repository.findByAllPage(pageable, idSanPham, idMauSac, idKichCo, idLoaiDe, idDiaHinhSan,minGiaTien,maxGiaTien);
        return sanPhamPage.map(mapper::convertEntityToResponse);
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
        List<ChiTietSanPham> list = new ArrayList<>();
        for (CreatedChiTietSanPhamRequest request : requests) {
            ChiTietSanPham sanPham = mapper.convertCreateRequestToEntity(request);
            list.add(sanPham);
        }
        repository.saveAll(list);
        return null;
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
    public ChiTietSanPhamResponse updateTrangThai(Long id) {
        ChiTietSanPham chiTietSanPham = repository.findById(id).orElse(null);

        chiTietSanPham.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.DELETED);
        repository.save(chiTietSanPham);

        return mapper.convertEntityToResponse(chiTietSanPham);
    }

    @Override
    public void update(List<UpdatedChiTietSanPhamRequest> request) {
        List<ChiTietSanPham> newProducts = new ArrayList<>();
        List<ChiTietSanPham> updateProducts = new ArrayList<>();

        for (UpdatedChiTietSanPhamRequest dto : request) {
            if (dto.getId() != null) {
                // If the DTO has an ID, it means it's an update
                Optional<ChiTietSanPham> optional = repository.findById(dto.getId());
                if (optional.isPresent()) {
                    ChiTietSanPham existingProduct = optional.get();
                    dto.setId(existingProduct.getId());
                    mapper.convertUpdateRequestToEntity(dto, existingProduct);
                    updateProducts.add(existingProduct);
                }
            } else if (dto.getId() == null) {
                ChiTietSanPham newProduct = new ChiTietSanPham();
                mapper.convertUpdateRequestToEntity(dto, newProduct);
                newProducts.add(newProduct);
            }
        }

        // Thêm đối tượng mới vào cơ sở dữ liệu
        if (!newProducts.isEmpty()) {
            repository.saveAll(newProducts);
        }

        // Cập nhật đối tượng đã tồn tại trong cơ sở dữ liệu
        if (!updateProducts.isEmpty()) {
            repository.saveAll(updateProducts);
        }

    }

    @Override
    public ChiTietSanPhamResponse getOneCtspById(Long id) {
        Optional<ChiTietSanPham> optional = repository.findById(id);

        if (optional.isEmpty()) {
            throw new com.amazonaws.services.mq.model.NotFoundException("Chi tiết sản phẩm không tồn tại");
        }

        ChiTietSanPham chiTietSanPham = optional.get();
        return mapper.convertEntityToResponse(chiTietSanPham);
    }

    @Override
    public Page<ChiTietSanPhamResponse> filterChiTietSanPham(
            Integer page,
            Integer pageSize,
            String searchText,
            String sortField,
            String sortOrder,
            BigDecimal minGiaTien,
            BigDecimal maxGiaTien,
            Long idLoaiDe,
            Long idMauSac,
            Long idKichCo,
            Long idDiaHinhSan,
            Long idThuongHieu) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        System.out.println(searchText);
        Page<ChiTietSanPham> pageSanPham = repository.filterChiTietSanPham(pageable, searchText, minGiaTien, maxGiaTien, idLoaiDe, idMauSac, idKichCo, idDiaHinhSan, idThuongHieu);
        return pageSanPham.map(mapper::convertEntityToResponse);
    }

}
