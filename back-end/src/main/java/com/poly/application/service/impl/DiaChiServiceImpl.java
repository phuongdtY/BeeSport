package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.DiaChi;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.exception.BadRequestException;
import com.poly.application.model.mapper.DiaChiMapper;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.response.DiaChiReponse;
import com.poly.application.repository.DiaChiRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiaChiServiceImpl implements DiaChiService {

    @Autowired
    private DiaChiMapper diaChiMapper;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Override
    public DiaChiReponse add(Long id,CreatedDiaChiRequest request) {
        DiaChi createdDiaChi = diaChiMapper.convertCreateResponseToEntity(request);
        createdDiaChi.setLoaiDiaChi(CommonEnum.LoaiDiaChi.OTHER);
        createdDiaChi.setTrangThaiDiaChi(CommonEnum.TrangThaiDiaChi.ACTIVE);
        createdDiaChi.setTaiKhoan(taiKhoanRepository.findId(id));
        DiaChi savedDC = diaChiRepository.save(createdDiaChi);
        return diaChiMapper.convertEntityToResponse(savedDC);
    }
}
