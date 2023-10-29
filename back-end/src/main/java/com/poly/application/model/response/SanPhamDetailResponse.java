package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SqlResultSetMapping(
        name = "SanPhamDetailMapping",
        classes = {
                @ConstructorResult(
                        targetClass = SanPhamMoiNhatResponse.class,
                        columns = {
                                @ColumnResult(name = "id", type = Long.class),
                                @ColumnResult(name = "ma", type = String.class),
                                @ColumnResult(name = "ten", type = String.class),
                                @ColumnResult(name = "moTa", type = String.class),
                                @ColumnResult(name = "giaMin", type = BigDecimal.class),
                                @ColumnResult(name = "giaMax", type = BigDecimal.class),
                                @ColumnResult(name = "trangThai", type = CommonEnum.TrangThaiSanPham.class),
                        }
                )
        }
)
public class SanPhamDetailResponse {

    private Long id;

    private String ma;

    private String ten;

    private String moTa;

    private BigDecimal giaMin;

    private BigDecimal giaMax;

    private CommonEnum.TrangThaiSanPham trangThai;

}
