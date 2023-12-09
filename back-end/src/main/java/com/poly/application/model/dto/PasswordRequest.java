package com.poly.application.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PasswordRequest {
    private Long id;

    private String matKhauCu;

    private String matKhauMoi;

    private String nhapLaiMatKhau;
}
