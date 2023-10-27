package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedHinhAnhSanPhamRequest;
import com.poly.application.service.HinhAnhSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/hinh-anh-san-pham")
public class HinhAnhSanPhamController {

    @Autowired
    private HinhAnhSanPhamService service;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "idSanPham") Long idSanPham,
            @RequestParam(name = "idMauSac") Long idMauSac)
    {
        return ResponseEntity.ok(service.getAll(idSanPham, idMauSac));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody List<CreatedHinhAnhSanPhamRequest> requests) {
        return new ResponseEntity<>(service.add(requests), HttpStatus.CREATED);
    }

}
