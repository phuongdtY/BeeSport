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
        name = "ThongKeTheoDoanhThuMapping",
        classes = {
                @ConstructorResult(
                        targetClass = ThongKeTheoDoanhThuResponse.class,
                        columns = {
                                @ColumnResult(name = "id", type = Long.class),
                                @ColumnResult(name = "ten", type = String.class),
                                @ColumnResult(name = "soLuongDaBan", type = Integer.class),
                                @ColumnResult(name = "doanhThu", type = BigDecimal.class)
                        }
                )
        }
)
public class ThongKeTheoDoanhThuResponse {

    private Long id;

    private String ten;

    private Integer soLuongDaBan;

    private BigDecimal doanhThu;

}
