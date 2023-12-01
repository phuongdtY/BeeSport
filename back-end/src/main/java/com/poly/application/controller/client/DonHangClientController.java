package com.poly.application.controller.client;

import com.poly.application.common.CommonEnum;
import com.poly.application.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/client/api/don-hang")
public class DonHangClientController {

    @Autowired
    private DonHangService service;

    @GetMapping()
    public ResponseEntity<?> getAllDonHangCuaTaiKhoan(
            @RequestParam(value = "taiKhoanId")Long id,
            @RequestParam(value = "trangThai", defaultValue = "") String trangThai
    ) {
        return ResponseEntity.ok(service.getAllHoaDonCuaTaiKhoan(id, trangThai));
    }
}
