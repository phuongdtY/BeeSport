package com.poly.application.model.dto;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

    @NotBlank(message = "Vui lòng nhập họ và tên")
    @Pattern(message = "Họ và tên không hợp lệ", regexp = "^[\\p{L}\\s]+$")
    private String hoVaTen;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(message = "Số điện thoại không hợp lệ", regexp = "^0[35789]\\d{8}$")
    private String soDienThoai;

    @NotBlank(message = "Vui lòng nhập emai")
    @Email(message = "Email không hợp lệ", regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
    @Size(max = 200, message = "Email không được vượt quá 200 ký tự")
    private String email;

    @NotBlank(message = "Vui lòng nhập mật khẩu")
    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Mật khẩu phải chứa ít nhất một chữ in hoa, một chữ thường, một số và một ký tự đặc biệt"
    )
    private String matKhau;

    @Enumerated(EnumType.STRING)
    private CommonEnum.TrangThaiThuocTinh trangThai;

    @Column(name = "gioi_tinh")
    private CommonEnum.GioiTinh gioiTinh;

    private String anhDaiDien;

    private Integer roleId;

}
