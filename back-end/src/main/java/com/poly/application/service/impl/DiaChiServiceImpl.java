package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaChi;
import com.poly.application.entity.DiaHinhSan;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.DiaChiMapper;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdateDCReuest;
import com.poly.application.model.request.update_request.UpdatedDiaChiRequest;
import com.poly.application.model.response.DiaChiReponse;
import com.poly.application.repository.DiaChiRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DiaChiServiceImpl implements DiaChiService {

    @Autowired
    private DiaChiMapper diaChiMapper;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Override
    public Page<DiaChiReponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String trangThaiDiaChi, String searchText, Long taiKhoanId) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.TrangThaiDiaChi trangThai;
        if (trangThaiDiaChi == null || trangThaiDiaChi.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiDiaChi.valueOf(trangThaiDiaChi);
        }
        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<DiaChi> diaChiPage = diaChiRepository.findAllByTaiKhoanId(pageable, searchText, trangThai, taiKhoanId);
        return diaChiPage.map(diaChiMapper::convertEntityToResponse);
    }

    @Override
    public DiaChiReponse add(Long id, CreatedDiaChiRequest request) {
        DiaChi createdDiaChi = diaChiMapper.convertCreateResponseToEntity(request);
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa chỉ không tồn tại");
        }

        DiaChi detail = optional.get();

        if (request.getTrangThaiDiaChi() == CommonEnum.TrangThaiDiaChi.DEFAULT) {
            // Đặt các địa chỉ khác thành ACTIVE
            diaChiRepository.findByTaiKhoanAndIdNot(detail.getTaiKhoan(), id)
                    .forEach(address -> {
                        address.setTrangThaiDiaChi(CommonEnum.TrangThaiDiaChi.ACTIVE);
                        diaChiRepository.save(address);
                    });
        }

        // Đặt địa chỉ hiện tại thành trạng thái được yêu cầu
        createdDiaChi.setTrangThaiDiaChi(request.getTrangThaiDiaChi());
        createdDiaChi.setTaiKhoan(taiKhoanRepository.findId(id));
        DiaChi savedDC = diaChiRepository.save(createdDiaChi);
        return diaChiMapper.convertEntityToResponse(savedDC);
    }

    @Override
    public List<DiaChiReponse> findByListDiaChi(Long idTaiKhoan) {
        List<DiaChi> diaChis = diaChiRepository.findByListDiaChi(idTaiKhoan);
        return diaChis
                .stream()
                .map(diaChiMapper::convertEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DiaChiReponse getDiaChiDefaultByIDTaiKhoan(Long idtaiKhoan) {
        return diaChiMapper.convertEntityToResponse(diaChiRepository.getDiaChiDefaultByIdTaiKhoan(idtaiKhoan));
    }

    @Override
    public DiaChiReponse findById(Long id) {
        Optional<DiaChi> diaChi = diaChiRepository.findId(id);
        if (diaChi.isEmpty()) {
            throw new NotFoundException("Địa chỉ không tồn tại");
        }
        return diaChiMapper.convertEntityToResponse(diaChi.get());
    }

    @Override
    public DiaChi update(Long id, UpdatedDiaChiRequest request) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa chỉ không tồn tại");
        }

        DiaChi detail = optional.get();
        CommonEnum.TrangThaiDiaChi trangThaiCu = detail.getTrangThaiDiaChi();
//        diaChiMapper.convertUpdateRequestToEntity(request, detail);
//        System.out.println(detail);
//        DiaChi diaChi = ;
//        System.out.println(diaChiReponse.getId());
//        System.out.println(diaChiReponse);
        detail.setHoVaTen(request.getHoVaTen());
        detail.setSoDienThoai(request.getSoDienThoai());
        detail.setThanhPho(request.getThanhPho());
        detail.setQuanHuyen(request.getQuanHuyen());
        detail.setPhuongXa(request.getPhuongXa());
        detail.setDiaChiCuThe(request.getDiaChiCuThe());
//        detail.setTrangThaiDiaChi(request.getTrangThaiDiaChi());
        if (request.getTrangThaiDiaChi() == CommonEnum.TrangThaiDiaChi.DEFAULT) {
            List<DiaChi> otherAddresses = diaChiRepository.findByTaiKhoanAndIdNot(detail.getTaiKhoan(), id);
            for (DiaChi otherAddress : otherAddresses) {
                otherAddress.setTrangThaiDiaChi(CommonEnum.TrangThaiDiaChi.ACTIVE);
                diaChiRepository.save(otherAddress);
            }
        }

        // Cập nhật trạng thái mới cho địa chỉ hiện tại
        detail.setTrangThaiDiaChi(request.getTrangThaiDiaChi());
        detail.setTaiKhoan(request.getTaiKhoan());
        detail.setPhuongXa(request.getPhuongXa());
        detail.setEmail(request.getEmail());
        return diaChiRepository.save(detail);
    }

    public DiaChi updateTrangThai(Long id, UpdateDCReuest request) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Địa chỉ không tồn tại");
        }

        DiaChi detail = optional.get();

        if (request.getTrangThaiDiaChi() == CommonEnum.TrangThaiDiaChi.DEFAULT) {
            // Đặt các địa chỉ khác thành ACTIVE
            diaChiRepository.findByTaiKhoanAndIdNot(detail.getTaiKhoan(), id)
                    .forEach(address -> {
                        address.setTrangThaiDiaChi(CommonEnum.TrangThaiDiaChi.ACTIVE);
                        diaChiRepository.save(address);
                    });
        }

        // Đặt địa chỉ hiện tại thành trạng thái được yêu cầu
        detail.setTrangThaiDiaChi(request.getTrangThaiDiaChi());
        return diaChiRepository.save(detail);
    }

    @Override
    public void delete(Long id) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        if (optional.isEmpty()) {
            throw new com.amazonaws.services.mq.model.NotFoundException("Địa hình sân không tồn tại");
        }
        DiaChi diaChi = optional.get();
        diaChiRepository.delete(diaChi);
    }


}
