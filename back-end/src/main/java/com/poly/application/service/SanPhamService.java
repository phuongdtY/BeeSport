package com.poly.application.service;

import com.poly.application.model.request.create_request.CreatedSanPhamRequest;
import com.poly.application.model.request.update_request.UpdatedSanPhamRequest;
import com.poly.application.model.response.*;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamService {

    Page<SanPhamResponse> getAll(Integer page, Integer pageSize, String sortField, String sortOrder, String searchText,
                                 Long thuongHieuId, String trangThaiString);

    List<SanPhamResponse> getAllSanPhamNullCTSP();

    SanPhamResponse add(CreatedSanPhamRequest request);

    SanPhamResponse update(Long id, UpdatedSanPhamRequest request);

    void delete(Long id);

    SanPhamResponse findById(Long id);

    Page<SanPhamFilterResponse> filterSanPham(
            Integer page,
            Integer pageSize,
            Integer sapXep,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            List<Long> listThuongHieu,
            List<Long> listMauSac,
            List<Long> listDiaHinhSan,
            List<Long> listKichCo,
            List<Long> listLoaiDe
    );

    List<SanPhamResponse> get5SanPhamMoiNhat();

    List<SanPhamMoiNhatResponse> giaTien5SanPhamMoiNhat();

    List<SanPhamBanChayResponse> get5SanPhamBanChayNhat();

    SanPhamDetailResponse getSanPhamDetail(Long id);

}
