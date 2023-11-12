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
    public enum Ten{
        MANAGER("MANAGER","Quản Lý",""),
        EMPLOYEE("EMPLOYEE","Nhân Viên",""),
        CUSTOMER("CUSTOMER","Khách Hàng","");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiSanPham{
        ACTIVE("ACTIVE", "Đang bán", "success"),
        INACTIVE("INACTIVE", "Ngừng kinh doanh", "default");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum LoaiHoaDon{
        ONLINE("ONLINE","Trên website","green"),
        COUNTER("COUNTER","Bán hàng tại quầy","blue");


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
        INACTIVE("INACTIVE", "Ngừng kinh doanh", "red"),
        OUT_OF_STOCK("OUT_OF_STOCK", "Hết hàng", "green"),
        DELETED("DELETED", "Xóa", "");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiHinhAnh{
        DEFAULT("DEFAULT", "Mặc định", "success"),
        AVATAR("AVATAR", "Ảnh đại diện", "red"),
        DELETED("DELETED", "Đã xóa", "green");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum HinhThucGiam{
        ACTIVE("ACTIVE", "Hoạt động","success"),
        INACTIVE("INACTIVE", "Không hoạt động","error");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiVoucher{
        ACTIVE("ACTIVE", "Hoạt động","success"),
        EXPIRED("EXPIRED", "Hết hạn","error"),
        INACTIVE("INACTIVE", "Không hoạt động","warning"),
        UPCOMING("UPCOMING", "Sắp tới","blue");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiGiaoDich{
        SUCCESS("SUCCESS", "Thành công","success"),
        FAILED("FAILED", "Thất bại","error"),
        PENDING("PENDING", "Đang chờ xử lý","warning");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

}