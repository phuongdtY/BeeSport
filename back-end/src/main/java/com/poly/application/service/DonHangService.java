package com.poly.application.service;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.model.response.HoaDonResponse;

import java.util.List;

public interface DonHangService {

    List<HoaDonResponse> getAllHoaDonCuaTaiKhoan(Long idTaiKhoan, String trangThaiHoaDon);

    Long countSoHoaDon(Long taiKhoanId, String trangThaiHoaDon);

    void sendEmailDonHang(Long id);

}
