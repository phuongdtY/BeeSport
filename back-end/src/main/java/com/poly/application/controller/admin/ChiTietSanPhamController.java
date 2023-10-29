package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/list")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(service.getListChiTietSanPham());
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getOne(
            @PathVariable("id") Long idSanPham,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan
    ) {
        return ResponseEntity.ok(service.findOne(idSanPham, idMauSac, idKichCo, idLoaiDe, idDiaHinhSan));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody List<CreatedChiTietSanPhamRequest> request) {
        System.out.println(request);
        return new ResponseEntity<>(service.addList(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody UpdatedChiTietSanPhamRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
