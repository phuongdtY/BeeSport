package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.TaiKhoan;
import com.poly.application.entity.Voucher;
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
public class VoucherChiTietResponseMapping {

    private Long id;
    private Integer soLanSuDung;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private CommonEnum.TrangThaiThuocTinh trangThai;
    private Voucher voucher;
    private TaiKhoan taiKhoan;

}
