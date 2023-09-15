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
    public enum TrangThaiThuocTinh{
        ACTIVE("ACTIVE", "Hoạt động", ""),
        INACTIVE("INACTIVE", "Không hoạt động", "");

        private final String ten;
        private final String moTa;
        private final String mauSac;
    }

    @AllArgsConstructor
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    public enum TrangThaiVoucher{
        ACTIVE("ACTIVE", "Hoạt động",""),
        EXPIRED("ACTIVE", "Hết hạn",""),
        INACTIVE("INACTIVE", "Không hoạt động",""),
        UPCOMING("UPCOMING", "sắp tới","");

        private final String ten;
        private final String moTa;
        private final String voucher;
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

}
