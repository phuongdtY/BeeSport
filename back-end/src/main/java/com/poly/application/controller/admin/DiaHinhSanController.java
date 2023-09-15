package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedDiaHinhSanRequest;
import com.poly.application.model.request.update_request.UpdatedDiaHinhSanRequest;
import com.poly.application.service.DiaHinhSanService;
import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/dia-hinh-san")
public class DiaHinhSanController {

    @Autowired
    private DiaHinhSanService service;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "pageSize", defaultValue = "5") Integer pageSize
    ) {
        return ResponseEntity.ok(service.getAll(pageNo, pageSize));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody CreatedDiaHinhSanRequest request) {
        return ResponseEntity.ok(service.add(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody UpdatedDiaHinhSanRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

}
