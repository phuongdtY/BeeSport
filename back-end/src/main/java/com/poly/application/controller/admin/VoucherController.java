package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedVoucherRequest;
import com.poly.application.model.request.update_request.UpdateVoucherRequest;
import com.poly.application.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/voucher")
public class VoucherController {

    @Autowired
    private VoucherService service;
    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "pageSize", defaultValue = "2") Integer pageSize
    ) {
        return ResponseEntity.ok(service.getAll(pageNo, pageSize));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody CreatedVoucherRequest request) {
        return ResponseEntity.ok(service.add(request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id,@RequestBody UpdateVoucherRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

}
