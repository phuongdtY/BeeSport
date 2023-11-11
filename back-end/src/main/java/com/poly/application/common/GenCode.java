package com.poly.application.common;

import java.util.Random;

public class GenCode {

    private static final String hoaDon = "HD0";
    private static final String giaoDich = "GD0";
    private static final String voucher = "BeeSprot";

    private static final int NUMBER_LENGTH = 5;
    private static final int NUMBER_HOADON_LENGTH = 6;

    public static String generateHoaDonCode() {
        Random random = new Random();
        int randomNumber = random.nextInt((int) Math.pow(10, NUMBER_HOADON_LENGTH));
        String formattedNumber = String.format("%0" + NUMBER_HOADON_LENGTH + "d", randomNumber);
        return hoaDon + formattedNumber;
    }

    public static String generateGiaoDichCode() {
        Random random = new Random();
        int randomNumber = random.nextInt((int) Math.pow(10, NUMBER_HOADON_LENGTH));
        String formattedNumber = String.format("%0" + NUMBER_LENGTH + "d", randomNumber);
        return giaoDich + formattedNumber;
    }
    public static String generateVoucherCode() {
        Random random = new Random();
        int randomNumber = random.nextInt((int) Math.pow(10, NUMBER_LENGTH));
        String formattedNumber = String.format("%0" + NUMBER_LENGTH + "d", randomNumber);
        return voucher + formattedNumber;
    }

}
