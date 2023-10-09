package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedGioHangChiTietRequest;
import com.poly.application.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/gio-hang-chi-tiet")
public class GioHangChiTietController {

    @Autowired
    private GioHangChiTietService service;

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody CreatedGioHangChiTietRequest request) {
        return new ResponseEntity<>(service.add(request), HttpStatus.CREATED);
    }

}
