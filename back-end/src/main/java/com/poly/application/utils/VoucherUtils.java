package com.poly.application.utils;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@Primary
public class VoucherUtils {
    public static String getVoucherStatusWithInactive(LocalDate startDate, LocalDate endDate) {
        LocalDate currentDate = LocalDate.now();

        if (currentDate.isBefore(startDate)) {
            return "UPCOMING";
        } else if (currentDate.isAfter(endDate)) {
            return "EXPIRED";
        } else if (currentDate.isEqual(startDate) || currentDate.isEqual(endDate)) {
            return "ACTIVE";
        } else {
            return "INACTIVE";
        }
    }

//    public static String getVoucherStatusWithInactive(LocalDateTime startDate, LocalDateTime endDate) {
//        LocalDateTime currentDate = LocalDateTime.now();
//        if (currentDate.isBefore(startDate)) {
//            return "UPCOMING";
//        } else if (currentDate.isAfter(endDate)) {
//            return "EXPIRED";
//        } else if (currentDate.isEqual(startDate) || currentDate.isEqual(endDate)) {
//            return "ACTIVE";
//        } else {
//            return "INACTIVE";
//        }
//    }

}