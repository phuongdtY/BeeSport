package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
public class DiaChiReponse {

    private Long id;

    private String hoVaTen;

    private String soDienThoai;

    private String thanhPho;

    private String quanHuyen;

    private String phuongXa;

    private String diaChiCuThe;


    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private CommonEnum.TrangThaiDiaChi trangThaiDiaChi;

    private String email;
}
