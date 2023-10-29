package com.poly.application.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.poly.application.common.CommonEnum;
import com.poly.application.entity.KichCo;
import com.poly.application.exception.BadRequestException;
import com.poly.application.model.mapper.KichCoMapper;
import com.poly.application.model.request.create_request.CreatedKichCoRequest;
import com.poly.application.model.request.update_request.UpdatedKichCoRequest;
import com.poly.application.model.response.KichCoResponse;
import com.poly.application.repository.KichCoRepository;
import com.poly.application.service.KichCoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KichCoServiceImpl implements KichCoService {

    @Autowired
    private KichCoRepository repository;

    @Autowired
    private KichCoMapper mapper;

    @Override
    public List<KichCoResponse> listKichCo() {
        List<KichCo> list = repository.getKichCoByNgayTaoDESC();
        return list.stream()
                .map(mapper::convertEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<KichCoResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.TrangThaiThuocTinh trangThai;

        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiThuocTinh.valueOf(trangThaiString);
        }

        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<KichCo> kichCoPage = repository.findByAll(pageable, searchText,trangThai);
        return kichCoPage.map(mapper::convertEntityToResponse);
    }

    @Override
    public KichCoResponse add(CreatedKichCoRequest request) {
        if (repository.existsByKichCo(request.getKichCo())) {
            throw new BadRequestException("Kích cỡ đã tồn tại trong hệ thống!");
        }
        KichCo createdKichCo = mapper.convertCreateRequestToEntity(request);
        createdKichCo.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        KichCo savedKichCo = this.repository.save(createdKichCo);
        return mapper.convertEntityToResponse(savedKichCo);
    }

    @Override
    public KichCoResponse update(Long id, UpdatedKichCoRequest request) {
        Optional<KichCo> optional = repository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Kích cỡ không tồn tại");
        }

        if (!request.getKichCo().equals(optional.get().getKichCo()) && repository.existsByKichCo(request.getKichCo())) {
            throw new BadRequestException("Tên loại đế đã tồn tại trong hệ thống!");
        }

        KichCo kichCo = optional.get();
        mapper.convertUpdateRequestToEntity(request, kichCo);
        return mapper.convertEntityToResponse(repository.save(kichCo));
    }

    @Override
    public void delete(Long id) {
        Optional<KichCo> optional = repository.findById(id);

        if (optional.isEmpty()) {
            throw new NotFoundException("Kích cỡ không tồn tại");
        }

        KichCo kichCo = optional.get();
        repository.delete(kichCo);
    }

    @Override
    public KichCoResponse findById(Long id) {
        Optional<KichCo> optional = repository.findById(id);

        if (optional.isEmpty()) {
            throw new NotFoundException("Kích cỡ không tồn tại");
        }

        KichCo kichCo = optional.get();
        return mapper.convertEntityToResponse(kichCo);
    }

    @Override
    public List<KichCoResponse> getKichCoKhongLap(Long id) {
        List<KichCo> listKichCo = repository.getKichCoKhongLap(id);

        List<KichCoResponse> kichCoResponse = listKichCo.stream()
                .map(mapper::convertEntityToResponse)
                .collect(Collectors.toList());

        return kichCoResponse;
    }

}
