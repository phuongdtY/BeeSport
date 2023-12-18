package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.common.GenCode;
import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.entity.GiaoDich;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.TimeLine;
import com.poly.application.entity.Voucher;
import com.poly.application.entity.VoucherChiTiet;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.request.create_request.CreateHoaDonRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonRequest;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.repository.ChiTietSanPhamRepository;
import com.poly.application.repository.GiaoDichRepository;
import com.poly.application.repository.HoaDonRepository;
import com.poly.application.repository.PhuongThucThanhToanRepository;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.repository.TimelineRepository;
import com.poly.application.repository.VoucherChiTietRepository;
import com.poly.application.repository.VoucherRepository;
import com.poly.application.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherChiTietRepository voucherChiTietRepository;

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
            sort = Sort.by("ngaySua").descending();
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

//        PhuongThucThanhToan phuongThucThanhToan = phuongThucThanhToanRepository.findPhuongThucThanhToanById(createHoaDonRequest.getIdPhuongThuc());
        TimeLine timeLine = new TimeLine();
        if (createHoaDonRequest.getTaiKhoan() != null) {
            TaiKhoan taiKhoan = taiKhoanRepository.findById(createHoaDonRequest.getTaiKhoan().getId()).orElse(null);
            createHoaDon.setTaiKhoan(taiKhoan);
        }

        if (createHoaDonRequest.getVoucher() != null){
            Voucher voucher = voucherRepository.findById(createHoaDonRequest.getVoucher().getId()).orElse(null);
            assert voucher != null;
            if(voucher.getLoaiVoucher().getTen().equals( CommonEnum.LoaiVoucher.CUSTOMER.getTen())){
                VoucherChiTiet vctFind = voucherRepository.findVoucherChiTiet(createHoaDonRequest.getVoucher().getId(), createHoaDonRequest.getTaiKhoan().getId());
                vctFind.setSoLanSuDung(vctFind.getSoLanSuDung() - 1);
                System.out.println("phuongdty");
                voucherChiTietRepository.save(vctFind);
            }

        }

        createHoaDon.setMa(GenCode.generateHoaDonCode());
        HoaDon savedHoaDon = hoaDonRepository.save(createHoaDon);
        timeLine.setGhiChu("chờ xác nhận");
        timeLine.setHoaDon(savedHoaDon);
        timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.PENDING);
        timelineRepository.save(timeLine);
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

        Optional.ofNullable(updatedHoaDonRequest.getPhiShip()).ifPresent(hoaDon::setPhiShip);
        Optional.ofNullable(updatedHoaDonRequest.getLoaiHoaDon()).ifPresent(hoaDon::setLoaiHoaDon);
        Optional.ofNullable(updatedHoaDonRequest.getNgayThanhToan()).ifPresent(hoaDon::setNgayThanhToan);
        Optional.ofNullable(updatedHoaDonRequest.getTrangThaiHoaDon()).ifPresent(hoaDon::setTrangThaiHoaDon);
        Optional.ofNullable(updatedHoaDonRequest.getTongTien()).ifPresent(hoaDon::setTongTien);
        Optional.ofNullable(updatedHoaDonRequest.getGhiChu()).ifPresent(hoaDon::setGhiChu);
        Optional.ofNullable(updatedHoaDonRequest.getTongTienKhiGiam()).ifPresent(hoaDon::setTongTienKhiGiam);
        Optional.ofNullable(updatedHoaDonRequest.getGiamGia()).ifPresent(hoaDon::setGiamGia);
        Optional.ofNullable(updatedHoaDonRequest.getSdtNguoiNhan()).ifPresent(hoaDon::setSdtNguoiNhan);
        Optional.ofNullable(updatedHoaDonRequest.getNguoiNhan()).ifPresent(hoaDon::setNguoiNhan);
        Optional.ofNullable(updatedHoaDonRequest.getDiaChiNguoiNhan()).ifPresent(hoaDon::setDiaChiNguoiNhan);
        Optional.ofNullable(updatedHoaDonRequest.getEmailNguoiNhan()).ifPresent(hoaDon::setEmailNguoiNhan);
        Optional.ofNullable(updatedHoaDonRequest.getTaiKhoan()).ifPresent(hoaDon::setTaiKhoan);
        Optional.ofNullable(updatedHoaDonRequest.getVoucher()).ifPresent(hoaDon::setVoucher);

        boolean isExistTimeLine = timelineRepository.existsTimeLineByTrangThaiAndHoaDonId(hoaDon.getTrangThaiHoaDon(), hoaDon.getId());
        boolean isExistConfirmedTimeLine = timelineRepository.existsTimeLineByTrangThaiAndHoaDonId(CommonEnum.TrangThaiHoaDon.CONFIRMED, hoaDon.getId());
        boolean isExistPendingTimeLine = timelineRepository.existsTimeLineByTrangThaiAndHoaDonId(CommonEnum.TrangThaiHoaDon.PENDING, hoaDon.getId());

        if (!isExistTimeLine) {
            if (hoaDon.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.CANCELLED && isExistPendingTimeLine && hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.ONLINE && !isExistConfirmedTimeLine) {
                TimeLine timeLine = new TimeLine();
                timeLine.setGhiChu(updatedHoaDonRequest.getGhiChuTimeLine());
                timeLine.setHoaDon(hoaDon);
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.CANCELLED);
                timelineRepository.save(timeLine);
            }
            if (hoaDon.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.CANCELLED && isExistPendingTimeLine && hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.ONLINE && isExistConfirmedTimeLine) {
                updateTrangThaiHoaDon(id, hoaDon.getTrangThaiHoaDon(), updatedHoaDonRequest.getGhiChuTimeLine(), updatedHoaDonRequest.getIdPhuongThuc());
            }
            if (hoaDon.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.CANCELLED && hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.COUNTER) {
                TimeLine timeLine = new TimeLine();
                timeLine.setGhiChu(updatedHoaDonRequest.getGhiChuTimeLine());
                timeLine.setHoaDon(hoaDon);
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.CANCELLED);
                timelineRepository.save(timeLine);
            }
            if (hoaDon.getTrangThaiHoaDon() != CommonEnum.TrangThaiHoaDon.CANCELLED) {
                updateTrangThaiHoaDon(id, hoaDon.getTrangThaiHoaDon(), updatedHoaDonRequest.getGhiChuTimeLine(), updatedHoaDonRequest.getIdPhuongThuc());
            }
        }

        if (hoaDon.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.CONFIRMED && isExistConfirmedTimeLine) {
            TimeLine timeLine = timelineRepository.findTimeLinesByHoaDonIdAndAndTrangThai(hoaDon.getId(), CommonEnum.TrangThaiHoaDon.CONFIRMED);
            TimeLine timeLineNew = new TimeLine();
            timelineRepository.delete(timeLine);
            timeLineNew.setGhiChu(updatedHoaDonRequest.getGhiChuTimeLine());
            timeLineNew.setHoaDon(hoaDon);
            timeLineNew.setTrangThai(CommonEnum.TrangThaiHoaDon.CONFIRMED);
            timelineRepository.save(timeLineNew);
        }

        if(updatedHoaDonRequest.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.APPROVED){
            hoaDon.setNgayThanhToan(LocalDateTime.now());
            GiaoDich giaoDich = giaoDichRepository.findByHoaDonAndTrangThaiGiaoDich(hoaDon.getId(), CommonEnum.TrangThaiGiaoDich.PENDING);
            if(giaoDich != null){
                giaoDich.setNgayThanhToan(LocalDateTime.now());
                giaoDich.setTrangThaiGiaoDich(CommonEnum.TrangThaiGiaoDich.SUCCESS);
                giaoDichRepository.save(giaoDich);
            }

        }

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
    public void updateTrangThaiHoaDon(Long idHoadon, CommonEnum.TrangThaiHoaDon trangThaiHoaDon, String ghiChu, Long idPhuongThucThanhToan) {
        Voucher voucherFind = null;
        boolean checkVct = false;
        VoucherChiTiet voucherChiTietFind = null;
        if (trangThaiHoaDon == null) {
            return;
        }
        HoaDon hoaDon = hoaDonRepository.findById(idHoadon)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hóa đơn có id " + idHoadon));
        if (hoaDon.getVoucher() != null) {
            voucherFind = voucherRepository.findById(hoaDon.getVoucher().getId())
                    .orElseThrow(() -> new NotFoundException("Không tìm thấy phương thức thanh toán có id " + idPhuongThucThanhToan));
            if (hoaDon.getTaiKhoan() != null) {
                checkVct = voucherRepository.existVoucherChiTietBySs(hoaDon.getTaiKhoan().getId(), voucherFind.getId());
                if (checkVct) {
                    voucherChiTietFind = voucherRepository.findVoucherChiTiet(voucherFind.getId(), hoaDon.getTaiKhoan().getId());
                }
            }
        }

        TimeLine timeLine = new TimeLine();
        timeLine.setHoaDon(hoaDon);
        timeLine.setGhiChu(ghiChu);
        switch (trangThaiHoaDon) {
            case SHIPPING:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.SHIPPING);
                timeLine.setGhiChu(ghiChu);
                hoaDonRepository.updateTrangThaiHoaDon(trangThaiHoaDon, idHoadon);
                break;
            case APPROVED:
                timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.APPROVED);
                timeLine.setGhiChu(ghiChu);
                if (hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.COUNTER) {
                    for (HoaDonChiTiet hdct : hoaDon.getHoaDonChiTietList()) {
                        ChiTietSanPham ctsp = chiTietSanPhamRepository.findById(hdct.getChiTietSanPham().getId()).get();
                        ctsp.setSoLuong(ctsp.getSoLuong() - hdct.getSoLuong());
                        if (ctsp.getSoLuong() <= 0) {
                            ctsp.setSoLuong(0);
                            ctsp.setTrangThai(CommonEnum.TrangThaiChiTietSanPham.OUT_OF_STOCK);
                        }
                        chiTietSanPhamRepository.save(ctsp);
                    }
                    if (voucherFind != null) {
                        if (hoaDon.getTaiKhoan() != null && checkVct) {
                            if (voucherChiTietFind.getSoLanSuDung() > 0) {
                                voucherChiTietFind.setSoLanSuDung(voucherChiTietFind.getSoLanSuDung() - 1);
                                if (voucherChiTietFind.getSoLanSuDung() <= 0) {
                                    voucherChiTietFind.setTrangThai(CommonEnum.TrangThaiVoucherChiTiet.INACTIVE);
                                }
                                voucherChiTietRepository.save(voucherChiTietFind);
                            }
                        }
                    }
                }
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
                if (hoaDon.getLoaiHoaDon() == CommonEnum.LoaiHoaDon.ONLINE && hoaDon.getTrangThaiHoaDon() == CommonEnum.TrangThaiHoaDon.CONFIRMED) {
                    TimeLine timeLine2 = new TimeLine();
                    timeLine2.setHoaDon(hoaDon);
                    timeLine2.setTrangThai(CommonEnum.TrangThaiHoaDon.PICKUP);
                    timelineRepository.save(timeLine2);
                    timeLine2.setGhiChu("Đang lấy hàng");
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

    @Override
    public Long getSoLuongHoaDonCho() {
        return hoaDonRepository.getSoLuongHoaDonCho();
    }

    @Override
    public HoaDonResponse cancelHoaDon(Long id, String ghiChuTimeLine) {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElseThrow(() -> new NotFoundException("Hóa đơn không tồn tại"));
        hoaDon.setTrangThaiHoaDon(CommonEnum.TrangThaiHoaDon.CANCELLED);
        hoaDonRepository.save(hoaDon);
        for (GiaoDich gd : hoaDon.getGiaoDichList()) {
            GiaoDich giaoDich = giaoDichRepository.findById(gd.getId()).orElse(null);
            assert giaoDich != null;
            if (giaoDich.getTrangThaiGiaoDich() == CommonEnum.TrangThaiGiaoDich.SUCCESS) {
                giaoDich.setTrangThaiGiaoDich(CommonEnum.TrangThaiGiaoDich.REFUND);
            } else {
                giaoDich.setTrangThaiGiaoDich(CommonEnum.TrangThaiGiaoDich.FAILED);
            }
            giaoDichRepository.save(giaoDich);
        }
        for (HoaDonChiTiet hdct : hoaDon.getHoaDonChiTietList()) {
            ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(hdct.getChiTietSanPham().getId()).orElse(null);
            assert chiTietSanPham != null;
            Integer soLuongTon = chiTietSanPham.getSoLuong();
            chiTietSanPham.setSoLuong(soLuongTon + hdct.getSoLuong());
            chiTietSanPhamRepository.save(chiTietSanPham);
        }
        TimeLine timeLine = new TimeLine();
        timeLine.setHoaDon(hoaDon);
        timeLine.setGhiChu(ghiChuTimeLine);
        timeLine.setTrangThai(CommonEnum.TrangThaiHoaDon.CANCELLED);
        timelineRepository.save(timeLine);
        return hoaDonMapper.convertHoaDonEntityToHoaDonResponse(hoaDon);
    }

}
