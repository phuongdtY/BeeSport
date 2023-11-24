package com.poly.application.controller.admin;

import com.poly.application.service.ThongKeService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/thong-ke")
public class ThongKeController {

    @Autowired
    private ThongKeService service;

    @GetMapping("ngay")
    public ResponseEntity<?> thongKeTheoNgay(@RequestParam(name = "ngay", required = false)LocalDate ngay) {
        return ResponseEntity.ok(service.thongKeTheoNgay(ngay));
    }

    @GetMapping("tuan")
    public ResponseEntity<?> thongKeTheoTuan(
            @RequestParam(name = "startOfWeek", required = false)LocalDate startOfWeek,
            @RequestParam(name = "endOfWeek", required = false)LocalDate endOfWeek
    ) {
        return ResponseEntity.ok(service.thongKeTheoTuan(startOfWeek, endOfWeek));
    }

    @GetMapping("thang")
    public ResponseEntity<?> thongKeTheoThang(
            @RequestParam(name = "startOfMonth", required = false)LocalDate startOfMonth,
            @RequestParam(name = "endOfMonth", required = false)LocalDate endOfMonth
    ) {
        return ResponseEntity.ok(service.thongKeTheoThang(startOfMonth, endOfMonth));
    }

    @GetMapping("nam")
    public ResponseEntity<?> thongKeTheoNam(
            @RequestParam(name = "startOfYear", required = false)LocalDate startOfYear,
            @RequestParam(name = "endOfYear", required = false)LocalDate endOfYear
    ) {
        return ResponseEntity.ok(service.thongKeTheoNam(startOfYear, endOfYear));
    }

    @GetMapping("khoang-ngay")
    public ResponseEntity<?> thongKeTheoKhoangNgay(
            @RequestParam(name = "start", required = false)LocalDate start,
            @RequestParam(name = "end", required = false)LocalDate end
    ) {
        return ResponseEntity.ok(service.thongKeTheoKhoangNgay(start, end));
    }

    @GetMapping("so-luong-ton")
    public ResponseEntity<?> thongKeSoLuongTon(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "5") Integer pageSize
    ) {
        return ResponseEntity.ok(service.thongKeSoLuongTon(page, pageSize));
    }

    @GetMapping("doanh-thu")
    public ResponseEntity<?> thongKeTheoDoanhThu(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "5") Integer pageSize
    ) {
        return ResponseEntity.ok(service.thongKeTheoDoanhThu(page, pageSize));
    }

    @GetMapping("excel")
    public void exportExcel(HttpServletResponse response) throws IOException {
        byte[] excelFile = service.exportExcelThongKe();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=so_luong_ton.xlsx");
        response.getOutputStream().write(excelFile);
    }


}
