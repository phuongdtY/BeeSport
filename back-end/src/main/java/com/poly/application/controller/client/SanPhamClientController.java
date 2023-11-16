package com.poly.application.controller.client;

import com.poly.application.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/san-pham")
public class SanPhamClientController {

    @Autowired
    private SanPhamService service;

    @GetMapping("/ban-chay-nhat")
    public ResponseEntity<?> banChayNhat() {
        return ResponseEntity.ok(service.get5SanPhamBanChayNhat());
    }

}
