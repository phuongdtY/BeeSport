package com.poly.application.model.response;

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
        name = "SanPhamMoiNhatMapping",
        classes = {
                @ConstructorResult(
                        targetClass = SanPhamMoiNhatResponse.class,
                        columns = {
                                @ColumnResult(name = "id", type = Long.class),
                                @ColumnResult(name = "ten", type = String.class),
                                @ColumnResult(name = "giaMin", type = BigDecimal.class),
                                @ColumnResult(name = "giaMax", type = BigDecimal.class)
                        }
                )
        }
)
public class SanPhamMoiNhatResponse {

    private Long id;

    private String ten;

    private BigDecimal giaMin;

    private BigDecimal giaMax;

    private String duongDan;

}
