package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/khach-hang")
public class KhachHangController {

    @Autowired
    private TaiKhoanService taiKhoanService;
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody CreatedTaiKhoanRequest createTaiKhoanRequest) {
        return new ResponseEntity<>(taiKhoanService.khachHangCreat(createTaiKhoanRequest), HttpStatus.CREATED);
    }
}
