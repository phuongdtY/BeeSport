package com.poly.application.controller.admin;

import com.poly.application.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/chi-tiet-san-pham")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAll(
            @PathVariable("id") Long idSanPham,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan
    ) {
        return ResponseEntity.ok(service.findByAll(idSanPham, idMauSac, idKichCo, idLoaiDe, idDiaHinhSan));
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getOne(
            @PathVariable("id") Long idSanPham,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan
    ) {
        return ResponseEntity.ok(service.findByAll(idSanPham, idMauSac, idKichCo, idLoaiDe, idDiaHinhSan));
    }

}
