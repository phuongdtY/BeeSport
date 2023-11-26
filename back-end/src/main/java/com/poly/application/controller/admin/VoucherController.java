package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedVoucherRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherRequest;
import com.poly.application.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin/api/voucher")
public class VoucherController {

    @Autowired
    private VoucherService service;
    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "sortField", required = false) String sortField,
            @RequestParam(name = "sortOrder", defaultValue = "", required = false) String sortOrder,
            @RequestParam(name = "searchText", defaultValue = "") String searchText,
            @RequestParam(name = "hinhThucGiamGiaId", defaultValue = "") Long hinhThucGiamGiaId,
            @RequestParam(name = "trangThai", required = false) String trangThaiString,
            @RequestParam(name = "ngayBatDau", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime ngayBatDau,
            @RequestParam(name = "ngayKetThuc", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime ngayKetThuc

    ) {
        return ResponseEntity.ok(service.getAll(page, pageSize, sortField, sortOrder, searchText, hinhThucGiamGiaId,
                trangThaiString, ngayBatDau, ngayKetThuc));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(service.getListVoucher());
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody CreatedVoucherRequest request) {
        return new ResponseEntity<>(service.add(request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/maVoucher")
    public ResponseEntity<?> getOneMa(@RequestParam(name = "maVoucher") String ma) {
        return ResponseEntity.ok(service.findByMa(ma));
    }

    @PutMapping("/cancel-voucher/{id}")
    public ResponseEntity<?> cancelVoucher(@PathVariable(name = "id") Long id) {
        service.cancelVoucher(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id,@RequestBody UpdatedVoucherRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

}
