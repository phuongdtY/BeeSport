package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedTaiKhoanRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import com.poly.application.service.QuenMatKhauService;
import com.poly.application.service.TaiKhoanService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/nhan-vien")
public class NhanVienController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(value = "currentPage", defaultValue = "1") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "searchText", defaultValue = "", required = false) String searchText,
            @RequestParam(value = "trangThai", defaultValue = "", required = false) String trangThai,
            @RequestParam(value = "gioiTinh", required = false) String gioiTinhString,
            @RequestParam(value = "sortField", defaultValue = "", required = false) String sorter,
            @RequestParam(value = "sortOrder", defaultValue = "", required = false) String sortOrder
    ) {
        return ResponseEntity.ok(taiKhoanService.getAll(page, pageSize, sorter,sortOrder, gioiTinhString, searchText, trangThai));
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id")Long id){
        return ResponseEntity.ok(taiKhoanService.findById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody CreatedTaiKhoanRequest createTaiKhoanRequest) {
        return new ResponseEntity<>(taiKhoanService.add(createTaiKhoanRequest), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody UpdatedTaiKhoanRequest request) {
        TaiKhoanResponse taiKhoan = taiKhoanService.update(id, request);
        return ResponseEntity.ok(taiKhoan);
    }

    @GetMapping("/excel")
    public void exportExcel(HttpServletResponse response) throws IOException {
        byte[] excelFile = taiKhoanService.exportExcelTaiKhoan();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=nhan_vien.xlsx");
        response.getOutputStream().write(excelFile);
    }


}
