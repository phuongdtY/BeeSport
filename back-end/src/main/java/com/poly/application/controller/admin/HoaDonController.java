package com.poly.application.controller.admin;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.model.dto.HoaDonHoaDonChiTietListResponseDTO;
import com.poly.application.model.request.create_request.CreateHoaDonRequest;
import com.poly.application.model.request.create_request.CreateTaiKhoanRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.service.HoaDonChiTietService;
import com.poly.application.service.HoaDonService;
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

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/hoa-don")
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @GetMapping()
    public ResponseEntity<?> getAll(
            @RequestParam(value = "currentPage", defaultValue = "1") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "searchText", defaultValue = "", required = false) String searchText,
            @RequestParam(value = "sortField", defaultValue = "", required = false) String sorter,
            @RequestParam(value = "sortOrder", defaultValue = "", required = false) String sortOrder,
            @RequestParam(value = "loaiHoaDon", defaultValue = "", required = false) String loaiHoaDon,
            @RequestParam(value = "trangThaiHoaDon", defaultValue = "", required = false) String trangThaiHoaDon
    ) {
        return ResponseEntity.ok(hoaDonService.getAll(page, pageSize, searchText, sorter, sortOrder, loaiHoaDon, trangThaiHoaDon));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id")Long id){
        return ResponseEntity.ok(hoaDonService.findById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody CreateHoaDonRequest createHoaDonRequest) {
        return new ResponseEntity<>(hoaDonService.add(createHoaDonRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody UpdatedHoaDonRequest updatedHoaDonRequest, @PathVariable(name = "id")Long id) {
        return ResponseEntity.ok(hoaDonService.update(id,updatedHoaDonRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id")Long id ){
        hoaDonChiTietService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test-hoa-don/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id")Long id){
        List<HoaDonChiTietResponse> hoaDonChiTietResponses = hoaDonChiTietService.findByHoaDonId(id);
        HoaDonResponse hoaDonResponse = hoaDonService.findById(id);

        HoaDonHoaDonChiTietListResponseDTO hoaDonHoaDonChiTietListResponseDTO = new HoaDonHoaDonChiTietListResponseDTO();
        hoaDonHoaDonChiTietListResponseDTO.setHoaDonResponse(hoaDonResponse);
//        hoaDonHoaDonChiTietListResponseDTO.setHoaDonChiTietResponseList(hoaDonChiTietResponses);
        return ResponseEntity.ok(hoaDonHoaDonChiTietListResponseDTO);
    }

}
