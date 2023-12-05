package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedGioHangRequest;
import com.poly.application.model.request.update_request.UpdatedGioHangRequest;
import com.poly.application.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/gio-hang")
public class GioHangController {

    @Autowired
    private GioHangService service;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody CreatedGioHangRequest request) {
        return new ResponseEntity<>(service.create(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/tai-khoan/{id}")
    public ResponseEntity<?> getGioHang(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findByIdTK(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody UpdatedGioHangRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

}
