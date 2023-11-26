package com.poly.application.service.impl;


import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.VaiTro;
import com.poly.application.exception.BadRequestException;
import com.poly.application.model.dto.JwtAuthenticationResponse;
import com.poly.application.model.dto.RefreshTokenRequest;
import com.poly.application.model.dto.SignUpRequest;
import com.poly.application.model.dto.SigninRequest;
import com.poly.application.model.response.TaiKhoanResponse;
import com.poly.application.repository.TaiKhoanRepository;
import com.poly.application.repository.VaiTroRepository;
import com.poly.application.security.TaiKhoanInfoDetailsServices;
import com.poly.application.service.AuthenticationService;
import com.poly.application.service.JWTService;
import com.poly.application.utils.EmailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class AuthenticationServiceIplm implements AuthenticationService {

    @Autowired
    private TaiKhoanRepository userRepository;

    @Autowired
    private VaiTroRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private TaiKhoanInfoDetailsServices user;

    private AuthenticationManager authenticationManager;


    private JWTService jwtService;

    @Autowired
    private EmailSend emailSender;

    public AuthenticationServiceIplm(TaiKhoanInfoDetailsServices user,AuthenticationManager authenticationManager,  JWTService jwtService) {
        this.user = user;
        this.authenticationManager= authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public TaiKhoan signup(SignUpRequest signUpRequest) {
        TaiKhoan soDienThoai = userRepository.findBySoDienThoai(signUpRequest.getSoDienThoai());
        if (soDienThoai != null) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống!");
        }
        if(signUpRequest.getGioiTinh()==null){
            signUpRequest.setGioiTinh(CommonEnum.GioiTinh.OTHER);
        }
        TaiKhoan user = new TaiKhoan();
        user.setHoVaTen(signUpRequest.getHoVaTen());
        user.setSoDienThoai(signUpRequest.getSoDienThoai());
        user.setEmail(signUpRequest.getEmail());
        user.setVaiTro(roleRepository.findId(Long.valueOf(3)));
        user.setTrangThai(CommonEnum.TrangThaiThuocTinh.ACTIVE);
        user.setAnhDaiDien("defaultAvatar.jpg");
        user.setMatKhau(passwordEncoder.encode(signUpRequest.getMatKhau()));
        TaiKhoan taiKhoan = userRepository.save(user);
        taiKhoan.setMatKhau(signUpRequest.getMatKhau());
        emailSender.sendEmail(taiKhoan);
        return taiKhoan;
    }

    @Override
    public boolean addAdmin() {
        Optional<VaiTro> roleId = roleRepository.findById(Long.valueOf(1));
        VaiTro role = roleId.get();
            TaiKhoan user = new TaiKhoan();
            user.setHoVaTen("hoanggiang");
            user.setSoDienThoai("0348079278");
            user.setEmail("giangminh030222@gmail.com");
            user.setVaiTro(role);
            user.setMatKhau(new BCryptPasswordEncoder().encode("giang123123"));
            userRepository.save(user);

        return true;
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),
                    signinRequest.getMatKhau()));
        } catch (AuthenticationException e) {
            // Invalid credentials
            throw new BadRequestException("Tài khoản hoặc mật khẩu không tồn tại.");
        }

        TaiKhoan taiKhoan = userRepository.findTaiKhoanByEmail(signinRequest.getEmail());
        var userToke = user.loadUserByUsername(signinRequest.getEmail());
        var jwt = jwtService.generateToken(userToke);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), userToke);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setRoleId(taiKhoan.getVaiTro().getId());
        jwtAuthenticationResponse.setId(taiKhoan.getId());
        jwtAuthenticationResponse.setEmail(taiKhoan.getEmail());
        return jwtAuthenticationResponse;
    }



    @Override
    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        UserDetails userToken = user.loadUserByUsername(userEmail);

        if(jwtService.isTokenValid(refreshTokenRequest.getToken(),userToken)){
            var jwt = jwtService.generateToken(userToken);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());

            return jwtAuthenticationResponse;
        }


        return null;
    }


}
