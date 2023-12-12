package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.model.request.update_request.UpdatedGiaoDichRequest;
import com.poly.application.service.GiaoDichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        return new ResponseEntity<>(giaoDichService.add(createGiaoDichRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody UpdatedGiaoDichRequest updatedGiaoDichRequest) {
        return ResponseEntity.ok(giaoDichService.update(id, updatedGiaoDichRequest));
    }

    @GetMapping("/{ma}")
    public ResponseEntity<?> getByMa(@PathVariable("ma") String ma) {
        return ResponseEntity.ok(giaoDichService.findByMaGiaoDich(ma));
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> listGiaoDich(@PathVariable("id") Long idHhoaDon) {
        return ResponseEntity.ok(giaoDichService.getListGiaoDich(idHhoaDon));
    }

}
