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
        ONLINE("ONLINE","Trên website","green"),
        COUNTER("COUNTER","Bán hàng tại quầy","blue"),
        PHONE_ORDER("PHONE_ORDER","Đặt hàng bằng điện thoại","cyan");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiHoaDon{

        PENDING("PENDING", "Chờ xác nhận", "warning"),
        CONFIRMED("CONFIRMED", "Đã xác nhận", "success"),
        SHIPPING("SHIPPING", "Đang vận chuyển", "geekblue"),
        CANCELLED("CANCELLED", "Đã hủy", "volcano"),
        APPROVED("APPROVED", "Đã hoàn thành", "magenta");

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

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum LoaiDiaChi{
        HOME("HOME", "Nhà riêng", ""),
        COMPANY("COMPANY", "Công ty", ""),
        OTHER("OTHER", "Khác", "");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiThuocTinh{
        ACTIVE("ACTIVE", "Hoạt động", "success"),
        INACTIVE("INACTIVE", "Không hoạt động", "red");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiDiaChi{
        ACTIVE("ACTIVE", "Hoạt động", ""),
        INACTIVE("INACTIVE", "Không hoạt động", ""),
        DELETED("DELETED", "Xóa", ""),
        DEFAULT("DEFAULT", "Mặc định", "");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiChiTietSanPham{
        ACTIVE("ACTIVE", "Hoạt động", "success"),
        INACTIVE("INACTIVE", "Không hoạt động", "red"),
        OUT_OF_STOCK("OUT_OF_STOCK", "Hết hàng", "green");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum HinhThucGiam{
        PERCENT("PERCENT", "Phần trăm",""),
        AMOUNT("AMOUNT", "Số lượng","");

        private final String ten;
        private final String moTa;
        private final String voucher;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiVoucher{
        ACTIVE("ACTIVE", "Hoạt động",""),
        EXPIRED("EXPIRED", "Hết hạn",""),
        INACTIVE("INACTIVE", "Không hoạt động",""),
        UPCOMING("UPCOMING", "Sắp tới","");

        private final String ten;
        private final String moTa;
        private final String voucher;
    }

}