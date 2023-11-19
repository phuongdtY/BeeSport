package com.poly.application.model.response;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SqlResultSetMapping(
        name = "SanPhamFilterMapping",
        classes = {
                @ConstructorResult(
                        targetClass = SanPhamFilterResponse.class,
                        columns = {
                                @ColumnResult(name = "id", type = Long.class),
                                @ColumnResult(name = "ten", type = String.class),
                                @ColumnResult(name = "giaMin", type = BigDecimal.class),
                                @ColumnResult(name = "giaMax", type = BigDecimal.class),
                                @ColumnResult(name = "duongDan", type = String.class),
                                @ColumnResult(name = "ngayTao", type = LocalDateTime.class)
                        }
                )
        }
)
public class SanPhamFilterResponse {

    private Long id;

    private String ten;

    private BigDecimal giaMin;

    private BigDecimal giaMax;

    private String duongDan;

    private LocalDateTime ngayTao;

}
