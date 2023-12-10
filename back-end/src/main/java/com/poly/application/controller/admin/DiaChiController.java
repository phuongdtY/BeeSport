package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/khach-hang/dia-chi")
public class DiaChiController {

    @Autowired
    private DiaChiService diaChiService;
    @PostMapping("/add")
    public ResponseEntity<?> addDiaChi( @RequestParam("id") Long id,@RequestBody CreatedDiaChiRequest createDCRequest) {
        return new ResponseEntity<>(diaChiService.add(id,createDCRequest), HttpStatus.CREATED);
    }
}
