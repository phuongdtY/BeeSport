package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.service.GiaoDichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/giao-dich")
public class GiaoDichController {

    @Autowired
    private GiaoDichService giaoDichService;

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody CreateGiaoDichRequest createGiaoDichRequest) {
        return  new ResponseEntity<>(giaoDichService.add(createGiaoDichRequest), HttpStatus.CREATED);
    }

}
