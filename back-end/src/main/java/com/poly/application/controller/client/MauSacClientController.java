package com.poly.application.controller.client;

import com.poly.application.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/mau-sac")
public class MauSacClientController {

    @Autowired
    private MauSacService service;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getMauSacKhongLap(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.getMauSacKhongLap(id));
    }

}