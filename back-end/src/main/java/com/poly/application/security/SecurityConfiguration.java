package com.poly.application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public UserDetailsService userDetailsService(){return new TaiKhoanInfoDetailsServices();}

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http.cors().and().csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request.requestMatchers(new AntPathRequestMatcher("/api/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/san-pham/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/mau-sac/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/loai-de/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/dia-hinh-san/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/kich-co/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/thuong-hieu/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/file/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/chi-tiet-san-pham/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/hinh-anh-san-pham/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/gio-hang/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/gio-hang-chi-tiet/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/hoa-don/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/hoa-don-chi-tiet/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/dia-chi/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/voucher-chi-tiet/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/voucher/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/admin/api/**")).hasAnyAuthority("MANAGER","EMPLOYEE")
//                        .requestMatchers(new AntPathRequestMatcher("/admin/api/hoa-don/**")).hasAnyAuthority("EMPLOYEE")
                        .requestMatchers(new AntPathRequestMatcher("/api/**")).hasAnyAuthority("CUSTOMER")
                        .anyRequest().authenticated())

                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
                ).build();

    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)throws Exception{
        return config.getAuthenticationManager();
    }



}
