package com.poly.application.model.response;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.HoaDon;
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
        name = "VoucherChiTietMapping",
        classes = {
                @ConstructorResult(
                        targetClass = VoucherChiTietResponseMapping.class,
                        columns = {
                                @ColumnResult(name = "id", type = Long.class),
                                @ColumnResult(name = "soLanSuDung", type = Integer.class),
                                @ColumnResult(name = "ngayTao", type = LocalDateTime.class),
                                @ColumnResult(name = "ngaySua", type = LocalDateTime.class),
                                @ColumnResult(name = "trangThai", type = CommonEnum.TrangThaiVoucherChiTiet.class),
                                @ColumnResult(name = "taiKhoanId", type = Long.class), // Use taiKhoanId instead of TaiKhoan
                                @ColumnResult(name = "taiKhoan", type = TaiKhoan.class),
                                @ColumnResult(name = "daSuDung", type = Long.class),
                        }
                )
        }
)
public class VoucherChiTietResponseMapping {

    private Long id;
    private Integer soLanSuDung;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private CommonEnum.TrangThaiVoucherChiTiet trangThai;
    private Long taiKhoanId; // Use taiKhoanId instead of TaiKhoan
    private TaiKhoan taiKhoan;
    private Long daSuDung;

    // Add getters and setters for the new field
}
