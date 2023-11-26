package com.poly.application.service.impl;

import com.poly.application.model.response.ThongKeSoLuongTonResponse;
import com.poly.application.model.response.ThongKeTheoDMYResponse;
import com.poly.application.model.response.ThongKeTheoDoanhThuResponse;
import com.poly.application.repository.ThongKeRepository;
import com.poly.application.service.ThongKeService;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    private ThongKeRepository repository;

    @Override
    public ThongKeTheoDMYResponse thongKeTheoNgay(LocalDate ngayThanhToan) {
        return repository.thongKeTheoNgay(ngayThanhToan);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoTuan(LocalDate startOfWeek, LocalDate endOfWeek) {
        return repository.thongKeTheoTuan(startOfWeek, endOfWeek);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoThang(LocalDate startOfMonth, LocalDate endOfMonth) {
        return repository.thongKeTheoTuan(startOfMonth, endOfMonth);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoNam(LocalDate startOfYear, LocalDate endOfYear) {
        return repository.thongKeTheoTuan(startOfYear, endOfYear);
    }

    @Override
    public ThongKeTheoDMYResponse thongKeTheoKhoangNgay(LocalDate start, LocalDate end) {
        return repository.thongKeTheoTuan(start, end);
    }

    @Override
    public Page<ThongKeSoLuongTonResponse> thongKeSoLuongTon(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<ThongKeSoLuongTonResponse> pageThongKe = repository.thongKeSoLuongTon(pageable);
        return pageThongKe;
    }

    @Override
    public Page<ThongKeTheoDoanhThuResponse> thongKeTheoDoanhThu(Integer page, Integer pageSize) {

        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<ThongKeTheoDoanhThuResponse> pageThongKe = repository.thongKeTheoDoanhThu(pageable);
        return pageThongKe;
    }

    @Override
    public byte[] exportExcelThongKe() throws IOException {
        List<ThongKeSoLuongTonResponse> data = repository.thongKeSoLuongTonList();
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("ThongKeSoLuongTon");

        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("STT");
        headerRow.createCell(1).setCellValue("Tên sản phẩm");
        headerRow.createCell(2).setCellValue("Số lượng tồn");

        int rowNum = 1;
        int stt = 1;

        // Tạo CellStyle cho dữ liệu văn bản
        CellStyle textStyle = workbook.createCellStyle();
        textStyle.setAlignment(HorizontalAlignment.LEFT); // Thiết lập canh trái cho dữ liệu văn bản

        for (ThongKeSoLuongTonResponse res: data) {
            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(stt++);
            row.createCell(1).setCellValue(res.getTen());
            row.createCell(2).setCellValue(res.getSoLuongTon());
        }

        // Áp dụng CellStyle cho tất cả các cột (trừ cột STT)
        for (int i = 0; i <= 3; i++) {
            sheet.setDefaultColumnStyle(i, textStyle);
        }

        // Thiết lập độ rộng cột cho cột
        sheet.setColumnWidth(0, 1500);
        // Auto-size cột 1 và 2 (STT và Tên sản phẩm)
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }

}
