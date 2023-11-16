package com.poly.application.security;


import com.poly.application.entity.TaiKhoan;
import com.poly.application.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class TaiKhoanInfoDetailsServices implements UserDetailsService{

    @Autowired
    private TaiKhoanRepository userRepository;

    private TaiKhoanInfoDetails userDetails;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<TaiKhoan> userInfo = userRepository.findByEmail(email);
        return userInfo.map(TaiKhoanInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("email not found"));
    }
}
