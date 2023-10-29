package com.poly.application.service.impl;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.request.QuenMatKhauRquest.QuenMatKhauRequest;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.service.QuenMatKhauService;
import com.poly.application.utils.EmailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class QuenMatKhauServiceImpl implements QuenMatKhauService {

    @Autowired
    TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private EmailSend emailSend;
    @Override
    public void sendEmail(TaiKhoan taiKhoan) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("beesport.fpoly@gmail.com");
        String subject = "[BEE SPORT] Chào mừng bạn đến với bee sport, đây là mật khẩu của bạn";
        String content = "Mật khẩu: " + emailSend.randomPasswords();
        content = content.replace("Mật khẩu: ", "");
        taiKhoan.setMatKhau(content);
        taiKhoanRepository.save(taiKhoan);
        message.setTo(taiKhoan.getEmail());
        message.setSubject(subject);
        message.setText("Mật khẩu: " + content);
        emailSender.send(message);

    }
    @Override
    public TaiKhoan oldPassword(QuenMatKhauRequest request){
        return taiKhoanRepository.findTaiKhoanByEmail(request.getEmail());
    }


}
