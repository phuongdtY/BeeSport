package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.common.GenCode;
import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.entity.GiaoDich;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.entity.SanPham;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.TimeLine;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.request.create_request.CreateHoaDonRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.model.response.SanPhamResponse;
import com.poly.application.repository.ChiTietSanPhamRepository;
import com.poly.application.repository.GiaoDichRepository;
import com.poly.application.repository.HoaDonChiTietRepository;
import com.poly.application.repository.HoaDonRepository;
import com.poly.application.repository.PhuongThucThanhToanRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.repository.TimelineRepository;
import com.poly.application.service.HoaDonService;
import jakarta.transaction.Transactional;
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
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private ChiTietSanPhamRepository chiTietSanPhamRepository;

    @Autowired
    private TimelineRepository timelineRepository;

    @Autowired
    private GiaoDichRepository giaoDichRepository;

    @Autowired
    private PhuongThucThanhToanRepository phuongThucThanhToanRepository;

    @Autowired
    private HoaDonMapper hoaDonMapper;

    @Override
    public Page<HoaDonResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder, String loaiHoaDonString, String trangThaiHoaDonString) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }

        CommonEnum.LoaiHoaDon loaiHoaDon;

        if (loaiHoaDonString == null || loaiHoaDonString.equals("")) {
            loaiHoaDon = null;
        } else {
            loaiHoaDon = CommonEnum.LoaiHoaDon.valueOf(loaiHoaDonString);
        }

        CommonEnum.TrangThaiHoaDon trangThaiHoaDon;

        if (trangThaiHoaDonString == null || trangThaiHoaDonString.equals("")) {
            trangThaiHoaDon = null;
        } else {
            trangThaiHoaDon = CommonEnum.TrangThaiHoaDon.valueOf(trangThaiHoaDonString);
        }

        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<HoaDon> hoaDonPage = hoaDonRepository.findPageHoaDon(pageable, searchText, loaiHoaDon, trangThaiHoaDon);
        return hoaDonPage.map(hoaDonMapper::convertHoaDonEntityToHoaDonResponse);
    }

    @Override
    public List<HoaDonResponse> get7HoaDonPendingByDateNew() {
        List<HoaDon> hoaDonMoiNhat = hoaDonRepository.get7HoaDonPendingByDate();
        return hoaDonMoiNhat
                .stream()
                .map(hoaDonMapper::convertHoaDonEntityToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public HoaDonResponse add(CreateHoaDonRequest createHoaDonRequest) {
        HoaDon createHoaDon = hoaDonMapper.convertCreateHoaDonRequestToHoaDonEntity(createHoaDonRequest);
        TimeLine timeLine = new TimeLine();
        // Kiểm tra xem createHoaDonRequest có chứa thông tin về TaiKhoan không
        if (createHoaDonRequest.getTaiKhoan() != null) {
            // Lấy thông tin về TaiKhoan từ createHoaDonRequest và lưu trước
            TaiKhoan taiKhoan = taiKhoanRepository.findById(createHoaDonRequest.getTaiKhoan().getId()).orElse(null);
            createHoaDon.setTaiKhoan(taiKhoan);
        }

        createHoaDon.setMa(GenCode.generateHoaDonCode());
        HoaDon savedHoaDon = hoaDonRepository.save(createHoaDon);
        timeLine.setGhiChu("chờ xác nhận");
        timeLine.setHoaDon(savedHoaDon);
        timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.PENDING);
        timelineRepository.save(timeLine);
        if (createHoaDonRequest.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.ONLINE
                && createHoaDonRequest.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.PENDING){
            GiaoDich giaoDich = new GiaoDich();
            giaoDich.setMaGiaoDich(GenCode.generateGiaoDichCode());
            giaoDich.setSoTienGiaoDich(savedHoaDon.getTongTienKhiGiam());
            giaoDich.setTrangThaiGiaoDich(CommonEnum.TrangThaiGiaoDich.SUCCESS);
            giaoDich.setPhuongThucThanhToan(phuongThucThanhToanRepository.findPhuongThucThanhToanById(1L));
            giaoDich.setHoaDon(savedHoaDon);
            giaoDich.setTaiKhoan(savedHoaDon.getTaiKhoan());
        }
        return hoaDonMapper.convertHoaDonEntityToHoaDonResponse(savedHoaDon);
    }


    @Override
    public HoaDonResponse findById(Long id) {
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(id);
        if (hoaDon.isEmpty()) {
            throw new NotFoundException("Hóa đơn không tồn tại");
        }
        return hoaDonMapper.convertHoaDonEntityToHoaDonResponse(hoaDon.get());
    }

    @Override
    public HoaDonResponse update(Long id, UpdatedHoaDonRequest updatedHoaDonRequest) {
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Hóa đơn không tồn tại"));

        String newMa = updatedHoaDonRequest.getMa();
        if (!hoaDon.getMa().equals(newMa) && hoaDonRepository.existsByMa(newMa)) {
            throw new BadRequestException("Mã hóa đơn đã tồn tại");
        }

        hoaDon.setMa(newMa);
        hoaDon.setPhiShip(updatedHoaDonRequest.getPhiShip());
        hoaDon.setLoaiHoaDon(updatedHoaDonRequest.getLoaiHoaDon());
        hoaDon.setNgayThanhToan(updatedHoaDonRequest.getNgayThanhToan());
        hoaDon.setTrangThaiHoaDon(updatedHoaDonRequest.getTrangThaiHoaDon());
        hoaDon.setTongTien(updatedHoaDonRequest.getTongTien());
        hoaDon.setGhiChu((updatedHoaDonRequest.getGhiChu()));
        hoaDon.setTongTienKhiGiam(updatedHoaDonRequest.getTongTienKhiGiam());
        hoaDon.setSdtNguoiNhan(updatedHoaDonRequest.getSdtNguoiNhan());
        hoaDon.setNguoiNhan(updatedHoaDonRequest.getNguoiNhan());
        hoaDon.setDiaChiNguoiNhan(updatedHoaDonRequest.getDiaChiNguoiNhan());
        hoaDon.setEmailNguoiNhan(updatedHoaDonRequest.getEmailNguoiNhan());
        hoaDon.setTaiKhoan(updatedHoaDonRequest.getTaiKhoan());
        hoaDon.setVoucher(updatedHoaDonRequest.getVoucher());
        boolean isExistTimeLine = timelineRepository.existsTimeLineByTrangThaiAndHoaDonId(hoaDon.getTrangThaiHoaDon(), hoaDon.getId());
        boolean isExistConfirmedTimeLine = timelineRepository.existsTimeLineByTrangThaiAndHoaDonId(CommonEnum.TrangThaiHoaDon.CONFIRMED, hoaDon.getId());
        if (!isExistTimeLine) {
            if (hoaDon.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.CANCELLED && !isExistConfirmedTimeLine) {
                updateTrangThaiHoaDon(id, CommonEnum.TrangThaiHoaDon.CONFIRMED, hoaDon.getGhiChu());
            }
            updateTrangThaiHoaDon(id, hoaDon.getTrangThaiHoaDon(), hoaDon.getGhiChu());
        }
        hoaDon.setGhiChu(updatedHoaDonRequest.getGhiChu());
        hoaDon.setVoucher(updatedHoaDonRequest.getVoucher());

        return hoaDonMapper.convertHoaDonEntityToHoaDonResponse(hoaDonRepository.save(hoaDon));
    }

    @Override
    public HoaDonResponse updateHuyHoaDon(Long id, UpdatedHoaDonRequest updatedHoaDonRequest) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void updateTrangThaiHoaDon(Long idHoadon, CommonEnum.TrangThaiHoaDon trangThaiHoaDon, String ghiChu) {
        if (trangThaiHoaDon == null) {
            return;
        }
        HoaDon hoaDon = hoaDonRepository.findById(idHoadon).orElseThrow(() -> new NotFoundException("Không tìm thấy hóa đơn có id " + idHoadon));
        TimeLine timeLine = new TimeLine();
        timeLine.setHoaDon(hoaDon);
        timeLine.getGhiChu();
        switch (trangThaiHoaDon) {
            case SHIPPING:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.SHIPPING);
                timeLine.setGhiChu(ghiChu);
                hoaDonRepository.updateTrangThaiHoaDon(trangThaiHoaDon, idHoadon);
                break;
            case APPROVED:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.APPROVED);
                timeLine.setGhiChu(ghiChu);
                hoaDonRepository.updateTrangThaiHoaDon(trangThaiHoaDon, idHoadon);
                break;
            case PICKUP:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.PICKUP);
                timeLine.setGhiChu(ghiChu);
                hoaDonRepository.updateTrangThaiHoaDon(trangThaiHoaDon, idHoadon);
                break;
            case CANCELLED:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.CANCELLED);
                timeLine.setGhiChu(ghiChu);
                for (HoaDonChiTiet hdct : hoaDon.getHoaDonChiTietList()) {
                    ChiTietSanPham ctsp = chiTietSanPhamRepository.findById(hdct.getChiTietSanPham().getId()).get();
                    ctsp.setSoLuong(ctsp.getSoLuong() + hdct.getSoLuong());
                    chiTietSanPhamRepository.save(ctsp);
                }
                hoaDonRepository.updateTrangThaiHoaDon(trangThaiHoaDon, idHoadon);
                break;
            case CONFIRMED:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.CONFIRMED);
                timeLine.setGhiChu(ghiChu);
                timelineRepository.save(timeLine);
                for (HoaDonChiTiet hdct : hoaDon.getHoaDonChiTietList()) {
                    ChiTietSanPham ctsp = chiTietSanPhamRepository.findById(hdct.getChiTietSanPham().getId()).get();
                    ctsp.setSoLuong(ctsp.getSoLuong() - hdct.getSoLuong());
                    if (ctsp.getSoLuong() <= 0) {
                        ctsp.setSoLuong(0);
                        ctsp.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.OUT_OF_STOCK);
                    }
                    chiTietSanPhamRepository.save(ctsp);
                }
                if (hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.COUNTER) {
                    TimeLine timeLine2 = new TimeLine();
                    timeLine2.setHoaDon(hoaDon);
                    timeLine2.setTrangThai(CommonEnum.TrangThaiHoaDon.APPROVED);
                    timeLine2.setGhiChu(ghiChu);
                    timelineRepository.save(timeLine2);
                    hoaDonRepository.updateTrangThaiHoaDon(CommonEnum.TrangThaiHoaDon.APPROVED, idHoadon);
                } else if (hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.ONLINE){
                    TimeLine timeLine2 = new TimeLine();
                    timeLine2.setHoaDon(hoaDon);
                    timeLine2.setTrangThai(CommonEnum.TrangThaiHoaDon.PICKUP);
                    timeLine2.setGhiChu(ghiChu);
                    timelineRepository.save(timeLine2);
                    hoaDonRepository.updateTrangThaiHoaDon(CommonEnum.TrangThaiHoaDon.PICKUP, idHoadon);
                } else {
                    hoaDonRepository.updateTrangThaiHoaDon(trangThaiHoaDon, idHoadon);
                }
                break;
            default:
                break;
        }

//        if (!timelineRepository.existsTimeLineByTrangThai(trangThaiHoaDon)) {
//            timelineRepository.save(timeLine);
//        }
        timelineRepository.save(timeLine);
    }

}
