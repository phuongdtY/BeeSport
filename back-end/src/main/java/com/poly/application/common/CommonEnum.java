package com.poly.application.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class CommonEnum {

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum GioiTinh{
        MALE("MALE", "Nam", "blue"),
        FEMALE("FEMALE", "Nữ", "magenta"),
        OTHER("OTHER", "Khác", "default");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiSanPham{
        ACTIVE("ACTIVE", "Hoạt động", ""),
        INACTIVE("INACTIVE", "Không hoạt động", ""),
        DISCONTINUED("DISCONTINUED", "Ngừng sản xuất", "");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum LoaiHoaDon{
        ONLINE("ONLINE","Trên website",""),
        COUNTER("COUNTER","Bán hàng tại quầy",""),
        PHONE_ORDER("PHONE_ORDER","Đặt hàng bằng điện thoại","");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiHoaDon{

        PENDING("PENDING", "Đang chờ xác nhận", "warning"),
        CONFIRMED("CONFIRMED", "Đã xác nhận", "success"),
        SHIPPING("SHIPPING", "Đang vận chuyển", "secondary"),
        CANCELLED("CANCELLED", "Đã hủy", "error"),
        APPROVED("APPROVED", "Đã hoàn thành", "primary");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiLichSuHoaDon{
        CREATED("CREATED", "Tạo Đơn Hàng", "#2dc258"),
        CONFIRMED("CONFIRMED", "Đã Xác Nhận Thông Tin Thanh Toán", "#2dc258"),
        SHIPPING("SHIPPING", "Đã Giao Cho Đơn Vị Vận Chuyển", "#2dc258"),
        APPROVED("APPROVED", "Đã Nhận Được Hàng", "#2dc258"),
        CANCELLED("CANCELLED", "Đơn Hàng Đã Hủy", "#9c2919"),
        EDITED("EDITED", "Chỉnh Sửa Đơn Hàng", "#ffc107");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum PhuongThucThanhToan{
        BANKING("CREATED", "Tạo Đơn Hàng", "#2dc258"),
        CASH("CONFIRMED", "Đã Xác Nhận Thông Tin Thanh Toán", "#2dc258"),
        COD("SHIPPING", "Đã Giao Cho Đơn Vị Vận Chuyển", "#2dc258");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiHoaDonChiTiet{
        APPROVED("APPROVED", "Đã Xác Nhận", "primary"),
        UNAPPROVED("UNAPPROVED", "Không Xác Nhận", "error");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

}
