package com.poly.application.controller.admin;

import com.poly.application.entity.TaiKhoan;
import com.poly.application.model.dto.JwtAuthenticationResponse;
import com.poly.application.model.dto.RefreshTokenRequest;
import com.poly.application.model.dto.SignUpRequest;
import com.poly.application.model.dto.SigninRequest;
import com.poly.application.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AuthenticationController {

    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<TaiKhoan> signup(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @GetMapping("/admin")
    public ResponseEntity<?> add(){
        return ResponseEntity.ok(authenticationService.addAdmin());
    }

    @PostMapping("/sign-in")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest){
        return ResponseEntity.ok(authenticationService.signin(signinRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response, HttpServletRequest request) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setDomain(request.getServerName());
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        return ResponseEntity.ok("Đăng xuất thành công");
    }
}