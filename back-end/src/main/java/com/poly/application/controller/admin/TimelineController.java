package com.poly.application.controller.admin;

import com.amazonaws.Response;
import com.poly.application.service.TimelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/api/timeline")
public class TimelineController {

    @Autowired
    private TimelineService timelineService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllListByHoaDonId(@PathVariable(name = "id")Long id) {
        return ResponseEntity.ok(timelineService.getAllList(id));
    }

}
