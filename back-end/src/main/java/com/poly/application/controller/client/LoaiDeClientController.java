package com.poly.application.controller.client;

import com.poly.application.service.LoaiDeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/loai-de")
public class LoaiDeClientController {

    @Autowired
    private LoaiDeService service;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getLoaiDeKhongLap(@PathVariable(name = "id") Long idSanPham) {
        return ResponseEntity.ok(service.getLoaiDeKhongLap(idSanPham));
    }

}
