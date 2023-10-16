package com.poly.application.controller.client;

import com.poly.application.service.DiaHinhSanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/dia-hinh-san")
public class DiaHinhSanClientController {

    @Autowired
    private DiaHinhSanService service;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDiaHinhSanKhongLap(@PathVariable(name = "id") Long idSanPham) {
        return ResponseEntity.ok(service.getDiaHinhSanKhongLap(idSanPham));
    }

}
