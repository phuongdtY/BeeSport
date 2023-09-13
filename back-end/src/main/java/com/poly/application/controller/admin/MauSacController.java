package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedMauSacRequest;
import com.poly.application.model.request.update_request.UpdatedMauSacRequest;
import com.poly.application.service.MauSacService;
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
@RequestMapping("/admin/api/mau-sac")
public class MauSacController {

    @Autowired
    private MauSacService service;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "pageSize", defaultValue = "1") Integer pageSize
    ) {
       return ResponseEntity.ok(service.getAll(pageNo, pageSize));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody CreatedMauSacRequest request) {
        return ResponseEntity.ok(service.add(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id,@RequestBody UpdatedMauSacRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

}
