package com.poly.application.model.dto;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {

    private String token;

    private String refreshToken;

    private String sdt;

    private Long roleId;

    private Long acountId;




}