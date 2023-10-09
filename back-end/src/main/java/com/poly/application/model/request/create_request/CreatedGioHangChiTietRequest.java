package com.poly.application.model.request.create_request;

import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.entity.GioHang;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreatedGioHangChiTietRequest {

    private Long id;

    private Integer soLuong;

    private String ghiChu;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private Integer trangThai;

    private GioHang gioHang;

    private ChiTietSanPham chiTietSanPham;

}
