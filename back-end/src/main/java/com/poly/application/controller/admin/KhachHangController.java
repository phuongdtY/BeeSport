package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/khach-hang")
public class KhachHangController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(value = "currentPage", defaultValue = "1") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "searchText", defaultValue = "", required = false) String searchText,
            @RequestParam(value = "trangThai", defaultValue = "", required = false) String trangThai,
            @RequestParam(value = "gioiTinh", required = false) String gioiTinhString,
            @RequestParam(value = "sortField", defaultValue = "", required = false) String sorter,
            @RequestParam(value = "sortOrder", defaultValue = "", required = false) String sortOrder
    ) {
        return ResponseEntity.ok(taiKhoanService.getAllKhachHang(page, pageSize, sorter,sortOrder, gioiTinhString, searchText, trangThai));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllKhachHang(){
        return ResponseEntity.ok(taiKhoanService.getAllKhachHang1());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addKhachHang(@RequestBody CreatedTaiKhoanRequest createTaiKhoanRequest) {
        return new ResponseEntity<>(taiKhoanService.addKhachHang(createTaiKhoanRequest), HttpStatus.CREATED);
    }

    @PostMapping("/dang-ki")
    public ResponseEntity<?> add(@RequestBody CreatedTaiKhoanRequest createTaiKhoanRequest) {
        return new ResponseEntity<>(taiKhoanService.khachHangCreat(createTaiKhoanRequest), HttpStatus.CREATED);
    }
    //a
}
