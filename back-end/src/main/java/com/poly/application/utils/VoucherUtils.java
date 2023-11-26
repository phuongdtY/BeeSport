package com.poly.application.utils;

import com.poly.application.common.CommonEnum;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Primary
public class VoucherUtils {

    public static CommonEnum.TrangThaiVoucher setTrangThaiVoucher(LocalDateTime ngayBatDau, LocalDateTime ngayKetThuc) {
        // Kiểm tra xem voucher đã bị hủy chưa
        LocalDateTime currentDate = LocalDateTime.now();

        if (currentDate.isBefore(ngayBatDau)) {
            return CommonEnum.TrangThaiVoucher.UPCOMING;
        } else if (currentDate.isEqual(ngayBatDau) || (currentDate.isAfter(ngayBatDau) && currentDate.isBefore(ngayKetThuc))) {
            return CommonEnum.TrangThaiVoucher.ONGOING;
        } else if (currentDate.isBefore(ngayKetThuc)) {
            return CommonEnum.TrangThaiVoucher.ENDING_SOON;
        } else if (currentDate.isEqual(ngayKetThuc) || currentDate.isAfter(ngayKetThuc)) {
            return CommonEnum.TrangThaiVoucher.EXPIRED;
        } else {
            return CommonEnum.TrangThaiVoucher.OUT_OF_STOCK;
        }
    }
}
