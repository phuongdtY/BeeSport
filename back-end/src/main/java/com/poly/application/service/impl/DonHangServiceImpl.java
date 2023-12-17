package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.repository.DonHangRepository;
import com.poly.application.repository.HoaDonRepository;
import com.poly.application.service.DonHangService;
import com.poly.application.utils.EmailSend;
import com.poly.application.utils.PDFExporter;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class DonHangServiceImpl implements DonHangService {

    @Autowired
    private DonHangRepository repository;

    @Autowired
    private HoaDonMapper mapper;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private PDFExporter pdfExporter;

    @Override
    public List<HoaDonResponse> getAllHoaDonCuaTaiKhoan(Long idTaiKhoan, String trangThaiHoaDon) {
        CommonEnum.TrangThaiHoaDon trangThai = null;

        if (trangThaiHoaDon != null && !trangThaiHoaDon.isEmpty()) {
            try {
                trangThai = CommonEnum.TrangThaiHoaDon.valueOf(trangThaiHoaDon.toUpperCase());
            } catch (IllegalArgumentException e) {
                return Collections.emptyList();
            }
        }

        List<HoaDon> list = repository.getAllHoaDonCuaTaiKhoan(idTaiKhoan, trangThai);
        return list.stream()
                .map(mapper::convertHoaDonEntityToHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Long countSoHoaDon(Long taiKhoanId, String trangThaiHoaDon) {
        CommonEnum.TrangThaiHoaDon trangThai = null;

        if (trangThaiHoaDon != null && !trangThaiHoaDon.isEmpty()) {
            try {
                trangThai = CommonEnum.TrangThaiHoaDon.valueOf(trangThaiHoaDon.toUpperCase());
            } catch (IllegalArgumentException e) {
                return null;
            }
        }

        Long soHoaDon = repository.countSoHoaDon(taiKhoanId, trangThai);
        return soHoaDon;
    }

    @Override
    public void sendEmailDonHang(Long id) {

        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Hóa đơn không tồn tại"));

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        List<HoaDonChiTiet> listHdct = hoaDon.getHoaDonChiTietList();

        try {
            helper.setFrom("beesport.fpoly@gmail.com");
            helper.setTo(hoaDon.getEmailNguoiNhan());
            helper.setSubject("[BEE SPORT] Cảm ơn bạn đã đến với bee sport, đây là đơn hàng của bạn");

            // Build HTML content with dynamic table
            StringBuilder tableContent = new StringBuilder("<html><body>" +
                    "<p>Mã đơn hàng: " + hoaDon.getMa() + "</p>" +
                    "<p>Ngày tạo: " + pdfExporter.formatLocalDateTime(hoaDon.getNgayTao())+ "</p>" +
                    "<p>Khách hàng: " + hoaDon.getNguoiNhan() + "</p>" +
                    "<p>Số điện thoại " + hoaDon.getSdtNguoiNhan() + "</p>" +
                    "<p>Địa chỉ: " + hoaDon.getDiaChiNguoiNhan() + "</p>" +
                    "<table border=\"1\">" +
                    "<tr><td>Sản phẩm</td>" +
                    "<td>Số lượng</td>" +
                    "<td>Đơn giá</td>" +
                    "<td>Thành tiền</td></tr>");

            // Iterate through the list of HoaDonChiTiet and add rows to the table
            BigDecimal tongThanhTien = BigDecimal.ZERO;
            for (HoaDonChiTiet hdct : listHdct) {
                String tenSanPham = hdct.getChiTietSanPham().getSanPham().getTen();
                String thuocTinhSanPham = "[" + hdct.getChiTietSanPham().getMauSac().getTen()
                        + " - " + hdct.getChiTietSanPham().getKichCo().getKichCo()
                        + " - " + hdct.getChiTietSanPham().getLoaiDe().getTen()
                        + " - " + hdct.getChiTietSanPham().getDiaHinhSan().getTen()
                        + "]";
                tableContent.append("<tr><td>").append(tenSanPham + thuocTinhSanPham).append("</td>")
                        .append("<td>").append(hdct.getSoLuong()).append("</td>")
                        .append("<td>").append(pdfExporter.formatNumberVietNam(hdct.getDonGia())).append("</td>")
                        .append("<td>").append(pdfExporter.formatNumberVietNam(BigDecimal.valueOf(hdct.getSoLuong())
                                .multiply(hdct.getDonGia()))).append("</td></tr>");

                tongThanhTien = tongThanhTien.add(BigDecimal.valueOf(hdct.getSoLuong())
                        .multiply(hdct.getDonGia()));

            }

            tableContent.append("<tr><td colspan=\"3\">Tổng tiền</td><td>").append(pdfExporter.formatNumberVietNam(tongThanhTien)).append("</td></tr>");
            tableContent.append("<tr><td colspan=\"3\">Giảm giá</td><td>").append(pdfExporter.formatNumberVietNam(hoaDon.getGiamGia())).append("</td></tr>");
            tableContent.append("<tr><td colspan=\"3\">Tiền ship</td><td>").append(pdfExporter.formatNumberVietNam(hoaDon.getPhiShip())).append("</td></tr>");
            tableContent.append("<tr><td colspan=\"3\">Tổng thanh toán</td><td>").append(pdfExporter.formatNumberVietNam(hoaDon.getTongTienKhiGiam())).append("</td></tr>");


            // Close the table and HTML body
            tableContent.append("</table></body></html>");

            // Set the HTML content in the email
            helper.setText(tableContent.toString(), true);
        } catch (MessagingException e) {
            // Handle exception
            e.printStackTrace();
        }

        emailSender.send(mimeMessage);
    }

}
