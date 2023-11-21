package com.poly.application.controller.admin;

import com.poly.application.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/thong-ke")
public class ThongKeController {

    @Autowired
    private ThongKeService service;

    @GetMapping()
    public ResponseEntity<?> thongKeTheoNgay(@RequestParam(name = "ngay", required = false)LocalDate ngay) {
        return ResponseEntity.ok(service.thongKeTheoNgay(ngay));
    }

}
