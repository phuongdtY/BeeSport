package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.model.request.create_request.CreatedVaiTroRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedVaiTroRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import com.poly.application.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/admin/api/tai-khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "sortField", required = false) String sortField,
            @RequestParam(name = "sortOrder", defaultValue = "", required = false) String sortOrder,
            @RequestParam(name = "searchText", defaultValue = "") String searchText,
            @RequestParam(name = "gioiTinh", required = false) String gioiTinhString,
            @RequestParam(name = "trangThai", required = false) String trangThaiString

    ) {
        return ResponseEntity.ok(taiKhoanService.getAll(page, pageSize,sortField,sortOrder, searchText,gioiTinhString, trangThaiString));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody CreatedTaiKhoanRequest request) {
        return new ResponseEntity<>(taiKhoanService.add(request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        taiKhoanService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(taiKhoanService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id,@RequestBody UpdatedTaiKhoanRequest request) {
        return ResponseEntity.ok(taiKhoanService.update(id, request));
    }



}
