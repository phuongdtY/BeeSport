package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.VaiTro;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    private String matKhau;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiThuocTinh trangThai;

    private VaiTro vaiTro;

    public TaiKhoanResponse(Long id, String hoVaTen, String email, String matKhau) {
        this.id = id;
        this.hoVaTen = hoVaTen;
        this.email = email;
        this.matKhau = matKhau;
    }


}
