package com.poly.application.controller.admin;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.request.QuenMatKhauRquest.QuenMatKhauRequest;
import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.service.QuenMatKhauService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/")
public class QuenMatKhauController {
    @Autowired
    private QuenMatKhauService quenMatKhauService;


    @PostMapping("forgot-password")
    public ResponseEntity<?> fotgotPassword(@RequestBody QuenMatKhauRequest request){
        TaiKhoan taiKhoan = quenMatKhauService.oldPassword(request);

        if (taiKhoan != null) {
            quenMatKhauService.sendEmail(taiKhoan);
            System.out.println(taiKhoan.getEmail());
            return ResponseEntity.ok("Email sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không tìm thấy tài khoản với email đã cung cấp.");

        }
    }

}
