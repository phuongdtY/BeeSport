package com.poly.application.controller.client;

import com.poly.application.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/san-pham")
public class SanPhamClientController {

    @Autowired
    private SanPhamService service;

    @GetMapping("/ban-chay-nhat")
    public ResponseEntity<?> banChayNhat() {
        return ResponseEntity.ok(service.get5SanPhamBanChayNhat());
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterSanPham(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "9") Integer pageSize,
            @RequestParam(name = "sapXep",  defaultValue = "6") String sapXep,
            @RequestParam(name = "minPrice", defaultValue = "0")BigDecimal minPrice,
            @RequestParam(name = "maxPrice", defaultValue = "10000000")BigDecimal maxPrice,
            @RequestParam(name = "listThuongHieu", required = false)List<Long> listThuongHieu,
            @RequestParam(name = "listDiaHinhSan", required = false)List<Long> listDiaHinhSan,
            @RequestParam(name = "listLoaiDe",  required = false) List<Long> listLoaiDe,
            @RequestParam(name = "listKichCo", required = false)List<Long> listKichCo,
            @RequestParam(name = "listMauSac",  required = false) List<Long> listMauSac
            ) {
        return ResponseEntity.ok(service.filterSanPham(page, pageSize, sapXep, minPrice, maxPrice, listThuongHieu, listMauSac, listDiaHinhSan, listKichCo, listLoaiDe));
    }

}
