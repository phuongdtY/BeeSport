package com.poly.application.controller.client;

import com.poly.application.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/san-pham-detail")
public class SanPhamDetailClientController {

    @Autowired
    private SanPhamService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getSanPhamDetail(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.getSanPhamDetail(id));
    }


}
