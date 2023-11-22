package com.poly.application.model.response;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SqlResultSetMapping(
        name = "ThongKeSoLuongTonResponse",
        classes = {
                @ConstructorResult(
                        targetClass = ThongKeSoLuongTonResponse.class,
                        columns = {
                                @ColumnResult(name = "id", type = Long.class),
                                @ColumnResult(name = "ten", type = String.class),
                                @ColumnResult(name = "soLuongTon", type = Integer.class)
                        }
                )
        }
)
public class ThongKeSoLuongTonResponse {

    private Long id;

    private String ten;

    private Integer soLuongTon;

}
