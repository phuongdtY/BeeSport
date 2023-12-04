package com.poly.application.service;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.dto.JwtAuthenticationResponse;
import com.poly.application.model.dto.RefreshTokenRequest;
import com.poly.application.model.dto.SignUpRequest;
import com.poly.application.model.dto.SigninRequest;
import com.poly.application.model.response.TaiKhoanResponse;

public interface AuthenticationService {

    TaiKhoan signup(SignUpRequest signUpRequest);

    boolean addAdmin();

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

}
