package com.poly.application.model.request.update_request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class UpdatedTaiKhoanRequest {

    @NotBlank(message = "Vui lòng nhập họ và tên")
    @Pattern(message = "Họ và tên không hợp lệ", regexp = "^[\\p{L}\\s]+$")
    private String hoVaTen;

    @NotBlank(message = "Vui lòng điền số căn cước công dân")
    private String canCuocCongDan;

    @NotNull(message = "Vui lòng chọn ngày sinh")
    @PastOrPresent(message = "Ngày sinh không thể trong tương lai")
    private LocalDate ngaySinh;

    @NotNull(message = "Vui lòng chọn giới tính")
    private Boolean gioiTinh;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(message = "Số điện thoại không hợp lệ", regexp = "^0[35789]\\d{8}$")
    private String soDienThoai;

    @NotBlank(message = "Vui lòng nhập emai")
    @Email(message = "Email không hợp lệ", regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
    private String email;

    @NotBlank(message = "Vui lòng chọn tỉnh/thành phố")
    private String thanhPho;

    @NotBlank(message = "Vui lòng chọn quận/huyện")
    private String quanHuyen;

    @NotBlank(message = "Vui lòng chọn phường/xã")
    private String phuongXa;

    @NotBlank(message = "Vui lòng điền địa chỉ cụ thể")
    private String diaChiCuThe;

    private MultipartFile flieAnhDaiDien;

    private Integer trangThai;

}
