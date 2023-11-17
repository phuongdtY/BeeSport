package com.poly.application.controller.admin;

import com.poly.application.model.request.create_request.CreatedChiTietSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedChiTietSanPhamRequest;
import com.poly.application.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/chi-tiet-san-pham")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAll(
            @PathVariable("id") Long idSanPham,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan
    ) {
        return ResponseEntity.ok(service.findByAll(idSanPham, idMauSac, idKichCo, idLoaiDe, idDiaHinhSan));
    }

    @GetMapping("")
    public ResponseEntity<?> getListSanPhamAndMauSac(
                @RequestParam(name = "idSanPham", defaultValue = "",required = false) Long idSanPham,
                @RequestParam(name = "idMauSac", defaultValue = "",required = false) Long idMauSac
    ) {
        return ResponseEntity.ok(service.getListSanPhamAndMauSac(idSanPham, idMauSac));
    }

    @GetMapping("/list-page")
    public ResponseEntity<?> getAllPage(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "idSanPham", defaultValue = "") Long idSanPham,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan,
            @RequestParam(name = "minGiaTien", required = false) BigDecimal minGiaTien,
            @RequestParam(name = "maxGiaTien", required = false) BigDecimal maxGiaTien
    ) {
        return ResponseEntity.ok(service.findByAllPage(page,pageSize,idSanPham, idMauSac,idKichCo ,idLoaiDe,  idDiaHinhSan,minGiaTien ,maxGiaTien ));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList() {
        return ResponseEntity.ok(service.getListChiTietSanPham());
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getOne(
            @PathVariable("id") Long idSanPham,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan
    ) {
        return ResponseEntity.ok(service.findOne(idSanPham, idMauSac, idKichCo, idLoaiDe, idDiaHinhSan));
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody List<CreatedChiTietSanPhamRequest> request) {
        System.out.println(request);
        return new ResponseEntity<>(service.addList(request), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update( @RequestBody List<UpdatedChiTietSanPhamRequest> request) {
        service.update(request);
        return ResponseEntity.ok("Danh sách ChiTietSanPham đã được cập nhật thành công.");
    }
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(service.updateTrangThai(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter-page")
    public ResponseEntity<?> filterPage(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(name = "searchText", defaultValue = "") String searchText,
            @RequestParam(name = "sortField", required = false) String sortField,
            @RequestParam(name = "sortOrder", defaultValue = "", required = false) String sortOrder,
            @RequestParam(name = "min", defaultValue = "0") BigDecimal min,
            @RequestParam(name = "max", defaultValue = "999999999") BigDecimal max,
            @RequestParam(name = "idLoaiDe", defaultValue = "") Long idLoaiDe,
            @RequestParam(name = "idMauSac", defaultValue = "") Long idMauSac,
            @RequestParam(name = "idKichCo", defaultValue = "") Long idKichCo,
            @RequestParam(name = "idDiaHinhSan", defaultValue = "") Long idDiaHinhSan,
            @RequestParam(name = "idThuongHieu", defaultValue = "") Long idThuongHieu
    ) {
        return ResponseEntity.ok(service.filterChiTietSanPham(page, pageSize, searchText, sortField, sortOrder, min, max, idLoaiDe, idMauSac, idKichCo, idDiaHinhSan, idThuongHieu));
    }

}
