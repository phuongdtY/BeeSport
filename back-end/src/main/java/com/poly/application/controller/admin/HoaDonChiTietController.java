package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreateHoaDonChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonChiTietRequest;
import com.poly.application.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/hoa-don-chi-tiet")
public class HoaDonChiTietController {

    @Autowired
    private HoaDonChiTietService service;
    @PostMapping("/add-list")
    public ResponseEntity<?> addList(@RequestBody  List<CreateHoaDonChiTietRequest> requestList) {
        service.addList(requestList);
        return ResponseEntity.ok("Thành công");
    }
    @PostMapping("/update-list")
    public ResponseEntity<?> updateList(@RequestBody  List<UpdatedHoaDonChiTietRequest> requestList) {
        System.out.println(requestList);
        service.updateList(requestList);
        return ResponseEntity.ok("Thành công");
    }

}

