package com.poly.application.controller.admin;

import com.poly.application.entity.DiaChi;
import com.poly.application.model.request.create_request.CreatedDiaChiRequest;
import com.poly.application.model.request.update_request.UpdateDCReuest;
import com.poly.application.model.request.update_request.UpdatedDiaChiRequest;
import com.poly.application.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/dia-chi")
public class DiaChi2Controller {

    @Autowired
    private DiaChiService diaChiService;
    
    @GetMapping("/list")
    public ResponseEntity<?> findList(@RequestParam(value = "idTaiKhoan", required = false) Long idTaiKhoan) {
        return ResponseEntity.ok(diaChiService.findByListDiaChi(idTaiKhoan));
    }

    @GetMapping("/default")
    public ResponseEntity<?> getDiaChiDefaultByIdtaiKhoan(@RequestParam(name = "idTaiKhoan") Long idTaiKhoan) {
        return ResponseEntity.ok(diaChiService.getDiaChiDefaultByIDTaiKhoan(idTaiKhoan));
    }

}
