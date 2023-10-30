package com.poly.application.model.dto;

import com.poly.application.entity.HoaDon;
import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.model.response.HoaDonChiTietResponse;
import com.poly.application.model.response.HoaDonResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HoaDonHoaDonChiTietListResponseDTO {

    private HoaDonResponse hoaDonResponse;

    private Page<HoaDonChiTietResponse> hoaDonChiTietResponsePage;
}
