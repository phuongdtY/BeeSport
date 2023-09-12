package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class TaiKhoanResponse {

    private  Long id;

    private String hoVaTen;

    private String canCuocCongDan;

    private LocalDate ngaySinh;

    private  Integer tuoi;

    private CommonEnum.GioiTinh gioiTinh;

    private String soDienThoai;

    private String email;

    private String thanhPho;

    private String quanHuyen;

    private String phuongXa;

    private String diaChiCuThe;

    private String anhDaiDien;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private Integer trangThai;


}
