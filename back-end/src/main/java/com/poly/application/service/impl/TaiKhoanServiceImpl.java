package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.TaiKhoanMapper;
import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.repository.VaiTroRepository;
import com.poly.application.service.TaiKhoanService;
import com.poly.application.utils.EmailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private TaiKhoanMapper taiKhoanMapper;

    @Autowired
    private VaiTroRepository vaiTroRepository;

    @Autowired
    private EmailSend emailSender;

    @Override
    public Page<TaiKhoanResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String gioiTinhString, String searchText, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.GioiTinh gioiTinh;

        if (gioiTinhString == null || gioiTinhString.equals("")) {
            gioiTinh = null;
        }else {
            gioiTinh = CommonEnum.GioiTinh.valueOf(gioiTinhString);
        }
        CommonEnum.TrangThaiThuocTinh trangThai;

        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiThuocTinh.valueOf(trangThaiString);
        }
        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<TaiKhoan> taiKhoanPage = taiKhoanRepository.findAllByVaiTro(pageable, searchText,trangThai,gioiTinh);
        return taiKhoanPage.map(taiKhoanMapper::convertEntityToResponse);
    }

    @Override
    public List<TaiKhoan> getAllKhachHang1() {
        List<TaiKhoan> taiKhoan = taiKhoanRepository.findAllKhachHang();
        return taiKhoan;
    }

    @Override
    public Page<TaiKhoanResponse> getAllKhachHang(Integer page, Integer pageSize, String sortField, String sortOrder, String gioiTinhString, String searchText, String trangThaiString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sortField).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sortField).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.GioiTinh gioiTinh;

        if (gioiTinhString == null || gioiTinhString.equals("")) {
            gioiTinh = null;
        }else {
            gioiTinh = CommonEnum.GioiTinh.valueOf(gioiTinhString);
        }
        CommonEnum.TrangThaiThuocTinh trangThai;

        if (trangThaiString == null || trangThaiString.equals("")) {
            trangThai = null;
        } else {
            trangThai = CommonEnum.TrangThaiThuocTinh.valueOf(trangThaiString);
        }
        Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<TaiKhoan> taiKhoanPage = taiKhoanRepository.findAllByVaiTro2(pageable, searchText,trangThai,gioiTinh);
        return taiKhoanPage.map(taiKhoanMapper::convertEntityToResponse);
    }

    @Override
    public TaiKhoanResponse add(CreatedTaiKhoanRequest request) {
        TaiKhoan canCuocCongDan = taiKhoanRepository.findByCanCuocCongDan(request.getCanCuocCongDan());
        TaiKhoan soDienThoai = taiKhoanRepository.findBySoDienThoai(request.getSoDienThoai());
        if (canCuocCongDan != null) {
            throw new BadRequestException("CMT/CCCD đã tồn tại trong hệ thống!");
        }
        if (soDienThoai != null) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống!");
        }
        if(request.getGioiTinh()==null){
            request.setGioiTinh(CommonEnum.GioiTinh.OTHER);
        }
        TaiKhoan createdTaiKhoan = taiKhoanMapper.convertCreateRequestToEntity(request);
        createdTaiKhoan.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        createdTaiKhoan.setVaiTro(vaiTroRepository.findId(Long.valueOf(2)));
        createdTaiKhoan.setAnhDaiDien("defaultAvatar.jpg");
        createdTaiKhoan.setMatKhau(emailSender.randomPasswords());
        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(createdTaiKhoan);
        emailSender.sendEmail(savedTaiKhoan);
        return taiKhoanMapper.convertEntityToResponse(savedTaiKhoan);
    }

    @Override
    public TaiKhoanResponse findById(Long id) {
        Optional<TaiKhoan> taiKhoan = taiKhoanRepository.findById(id);
        if (taiKhoan.isEmpty()) {
            throw new NotFoundException("Tài khoản không tồn tại");
        }
        return taiKhoanMapper.convertEntityToResponse(taiKhoan.get());
    }

    @Override
    public TaiKhoanResponse findByEmail(String email, String matKhau) {
        TaiKhoan taiKhoan = taiKhoanRepository.findTaiKhoanByEmail(email);
        TaiKhoanResponse taiKhoanResponse = null;
        if (taiKhoan!=null) {
            if (taiKhoan.getMatKhau().equals(matKhau)) {
                taiKhoanResponse = taiKhoanMapper.convertEntityToResponse(taiKhoan);

            } else {
                throw new BadRequestException("Mật khẩu không khớp");
            }
        } else {
            throw new BadRequestException("Tài khoản không tồn tại");
        }

        return taiKhoanResponse;
    }


    @Override
    public TaiKhoanResponse khachHangCreat(CreatedTaiKhoanRequest request) {
        TaiKhoan soDienThoai = taiKhoanRepository.findBySoDienThoai(request.getSoDienThoai());
        if (soDienThoai != null) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống!");
        }
        TaiKhoan createdTaiKhoan = taiKhoanMapper.convertCreateRequestToEntity(request);
        createdTaiKhoan.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        createdTaiKhoan.setVaiTro(vaiTroRepository.findId(Long.valueOf(3)));
        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(createdTaiKhoan);
        TaiKhoanResponse rs = taiKhoanMapper.convertEntityToResponse(savedTaiKhoan);
        emailSender.sendEmail(savedTaiKhoan);
        return rs;
    }

    @Override
    public TaiKhoanResponse addKhachHang(CreatedTaiKhoanRequest request) {
        TaiKhoan canCuocCongDan = taiKhoanRepository.findByCanCuocCongDan(request.getCanCuocCongDan());
        TaiKhoan soDienThoai = taiKhoanRepository.findBySoDienThoai(request.getSoDienThoai());
        if (canCuocCongDan != null) {
            throw new BadRequestException("CMT/CCCD đã tồn tại trong hệ thống!");
        }
        if (soDienThoai != null) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống!");
        }
        if(request.getGioiTinh()==null){
            request.setGioiTinh(CommonEnum.GioiTinh.OTHER);
        }
        TaiKhoan createdTaiKhoan = taiKhoanMapper.convertCreateRequestToEntity(request);
        createdTaiKhoan.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        createdTaiKhoan.setVaiTro(vaiTroRepository.findId(Long.valueOf(3)));
        createdTaiKhoan.setAnhDaiDien("defaultAvatar.jpg");
        createdTaiKhoan.setMatKhau(emailSender.randomPasswords());
        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(createdTaiKhoan);
        emailSender.sendEmail(savedTaiKhoan);
        return taiKhoanMapper.convertEntityToResponse(savedTaiKhoan);
    }

    @Override
    public TaiKhoanResponse update(Long id, UpdatedTaiKhoanRequest request) {
        Optional<TaiKhoan> optional = taiKhoanRepository.findById(id);
        if (optional.isEmpty()) {
            throw new NotFoundException("Tài khoản không tồn tại");
        }

        TaiKhoan canCuocCongDan = taiKhoanRepository.findByCanCuocCongDan(request.getCanCuocCongDan());
        TaiKhoan soDienThoai = taiKhoanRepository.findBySoDienThoai(request.getSoDienThoai());

        if (canCuocCongDan != null && !request.getCanCuocCongDan().equals(canCuocCongDan.getCanCuocCongDan())) {
            if (taiKhoanRepository.existsByCanCuocCongDan(request.getCanCuocCongDan())) {
                throw new BadRequestException("Căn cước công dân đã tồn tại trong hệ thống. Vui lòng sử dụng căn cước công dân khác!");
            }
        }

        if (soDienThoai != null && !request.getSoDienThoai().equals(soDienThoai.getSoDienThoai())) {
            if (taiKhoanRepository.existsBySoDienThoai(request.getSoDienThoai())) {
                throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống. Vui lòng sử dụng số điện thoại khác!");
            }
        }

        TaiKhoan detail = optional.get();
        taiKhoanMapper.convertUpdateRequestToEntity(request, detail);
        System.out.println(detail.getId());
        System.out.println(detail.getGioiTinh());
//        System.out.println(detail.getTrangThai().getTen());
        return taiKhoanMapper.convertEntityToResponse(taiKhoanRepository.save(detail));
    }


    @Override
    public void delete(Long id) {
        Optional<TaiKhoan> optional = this.taiKhoanRepository.findById(id);
        taiKhoanRepository.delete(optional.get());
    }
}
