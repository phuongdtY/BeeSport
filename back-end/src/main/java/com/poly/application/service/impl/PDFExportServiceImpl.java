package com.poly.application.service.impl;

import com.poly.application.entity.GiaoDich;
import com.poly.application.entity.HoaDon;
import com.poly.application.exception.NotFoundException;
import com.poly.application.repository.GiaoDichRepository;
import com.poly.application.repository.HoaDonRepository;
import com.poly.application.service.PDFExportService;
import com.poly.application.utils.PDFExporter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PDFExportServiceImpl implements PDFExportService {

    @Autowired
    private PDFExporter pdfExporter;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Override
    public void exportPDF(HttpServletResponse httpServletResponse, Long id) {
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hóa đơn có id " + id));
        try {
            pdfExporter.export(httpServletResponse,hoaDon);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
