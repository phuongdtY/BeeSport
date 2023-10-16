package com.poly.application.controller.client;

import com.poly.application.service.KichCoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/kich-co")
public class KichCoClientController {

    @Autowired
    private KichCoService service;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getKichCoKhongLap(@PathVariable(name = "id") Long idSanPham) {
        return ResponseEntity.ok(service.getKichCoKhongLap(idSanPham));
    }

}
