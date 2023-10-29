package com.poly.application.utils;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.request.QuenMatKhauRquest.QuenMatKhauRequest;
import com.poly.application.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class EmailSend {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(TaiKhoan taiKhoan) {
        // Code gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("beesport.fpoly@gmail.com");
        String subject = "[BEE SPORT] Chào mừng bạn đến với bee sport, đây là thông tin tài khoản của bạn";
        String content = " Họ Và Tên: " + taiKhoan.getHoVaTen()+ "\n Số Điện Thoại: " + taiKhoan.getSoDienThoai()+ "\n Email: " + taiKhoan.getEmail()+ "\n Mật khẩu: " + taiKhoan.getMatKhau();
        message.setTo(taiKhoan.getEmail());
        message.setSubject(subject);
        message.setText(content);
        emailSender.send(message);

    }

    public String randomPasswords() {
        String kyTu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(kyTu.length());
            password.append(kyTu.charAt(index));
        }
        return password.toString();
    }


}
