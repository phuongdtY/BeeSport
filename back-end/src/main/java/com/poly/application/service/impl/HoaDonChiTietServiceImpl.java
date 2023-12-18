package com.poly.application.service.impl;

import com.poly.application.common.CommonEnum;
import com.poly.application.entity.ChiTietSanPham;
import com.poly.application.entity.HoaDon;
import com.poly.application.entity.HoaDonChiTiet;
import com.poly.application.entity.VoucherChiTiet;
import com.poly.application.exception.BadRequestException;
import com.poly.application.exception.NotFoundException;
import com.poly.application.model.mapper.HoaDonChiTietMapper;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.request.create_request.CreateHoaDonChiTietRequest;
import com.poly.application.model.request.create_request.CreatedVoucherChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonChiTietRequest;
import com.poly.application.model.request.update_request.UpdatedVoucherChiTietRequest;
import com.poly.application.model.response.HoaDonChiTietResponse;
import com.poly.application.model.response.HoaDonResponse;
import com.poly.application.repository.ChiTietSanPhamRepository;
import com.poly.application.repository.HoaDonChiTietRepository;
import com.poly.application.service.HoaDonChiTietService;
import com.poly.application.service.HoaDonService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {

    @Autowired
    private HoaDonChiTietMapper hoaDonChiTietMapper;

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Autowired
    private ChiTietSanPhamRepository chiTietSanPhamRepository;

    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonMapper hoaDonMapper;

    @Override
    public Page<HoaDonChiTietResponse> getAll(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<HoaDonChiTiet> hoaDonChiTietPage = hoaDonChiTietRepository.findAll(pageable);
        return hoaDonChiTietPage.map(hoaDonChiTietMapper::convertHoaDonChiTietEntityToHoaDonChiTietResponse);
    }

    @Override
    public HoaDonChiTietResponse add(CreateHoaDonChiTietRequest createHoaDonChiTietRequest, Long id) {
        if (hoaDonChiTietRepository.existsHoaDonChiTietByChiTietSanPhamIdAndHoaDonId(createHoaDonChiTietRequest.getChiTietSanPham().getId(), id)) {
            HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findHoaDonChiTietByChiTietSanPhamIdAndHoaDonId(createHoaDonChiTietRequest.getChiTietSanPham().getId(), id);
            hoaDonChiTiet.setSoLuong(hoaDonChiTiet.getSoLuong() + 1);
            ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(createHoaDonChiTietRequest.getChiTietSanPham().getId()).orElse(null);
            chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() - 1);
            chiTietSanPhamRepository.save(chiTietSanPham);
            return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTietRepository.save(hoaDonChiTiet));
        }
        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(createHoaDonChiTietRequest.getChiTietSanPham().getId()).orElse(null);
        chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() - 1);
        chiTietSanPhamRepository.save(chiTietSanPham);
        HoaDonChiTiet createHoaDonChiTiet = hoaDonChiTietMapper.convertCreateHoaDonChiTietRequestToHoaDonChiTietEntity(createHoaDonChiTietRequest);
        HoaDonResponse hoaDonResponse = hoaDonService.findById(id);
        HoaDon hoaDon = hoaDonMapper.convertHoaDonResponseToEntity(hoaDonResponse);
        createHoaDonChiTiet.setHoaDon(hoaDon);
        HoaDonChiTiet savedHoaDonChiTiet = hoaDonChiTietRepository.save(createHoaDonChiTiet);
        return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(savedHoaDonChiTiet);
    }

    @Override
    @Transactional
    public void addList(List<CreateHoaDonChiTietRequest> requestList) {
        List<HoaDonChiTiet> list = new ArrayList<>();
        for (CreateHoaDonChiTietRequest request : requestList) {
            ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(request.getChiTietSanPham().getId()).orElse(null);
            chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong()-request.getSoLuong());
            chiTietSanPhamRepository.save(chiTietSanPham);
            list.add(hoaDonChiTietMapper.convertCreateHoaDonChiTietRequestToHoaDonChiTietEntity(request));
        }
        System.out.println(list);
        hoaDonChiTietRepository.saveAll(list);
    }

    @Override
    @Transactional
    public void updateList(List<UpdatedHoaDonChiTietRequest> requestList) {
        List<HoaDonChiTiet> newHoaDonChiTietList = new ArrayList<>();
        List<HoaDonChiTiet> updatedHoaDonChiTietList = new ArrayList<>();

        for (UpdatedHoaDonChiTietRequest updateRequest : requestList) {
            if (updateRequest.getId() != null) {
                // If the DTO has an ID, it means it's an update

                Optional<HoaDonChiTiet> optional = hoaDonChiTietRepository.findById(updateRequest.getId());
                if (optional.isPresent()) {
                    ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(optional.get().getChiTietSanPham().getId()).orElse(null);
                    HoaDonChiTiet existingHoaDonChiTiet = optional.get();
                    if (updateRequest.getSoLuong() > existingHoaDonChiTiet.getSoLuong()) {
                        Integer soLuongSuDung = updateRequest.getSoLuong() - existingHoaDonChiTiet.getSoLuong();
                        chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() - soLuongSuDung);
                    } else if (updateRequest.getSoLuong() < existingHoaDonChiTiet.getSoLuong()) {
                        Integer soLuongSuDung = existingHoaDonChiTiet.getSoLuong() - updateRequest.getSoLuong();
                        chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() + soLuongSuDung);
                    }
                    chiTietSanPhamRepository.save(chiTietSanPham);
                    updateRequest.setId(existingHoaDonChiTiet.getId());
                    hoaDonChiTietMapper.convertUpdateRequestToEntity(updateRequest, existingHoaDonChiTiet);
                    updatedHoaDonChiTietList.add(existingHoaDonChiTiet);
                }
            } else if (updateRequest.getId() == null) {
                ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(updateRequest.getChiTietSanPham().getId()).orElse(null);
                chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() - updateRequest.getSoLuong());
                chiTietSanPhamRepository.save(chiTietSanPham);
                HoaDonChiTiet newHoaDonChiTiet = new HoaDonChiTiet();
                newHoaDonChiTiet.setTrangThaiHoaDonChiTiet(CommonEnum.TrangThaiHoaDonChiTiet.APPROVED);
                hoaDonChiTietMapper.convertUpdateRequestToEntity(updateRequest, newHoaDonChiTiet);
                newHoaDonChiTietList.add(newHoaDonChiTiet);
            }
        }
        // Add new objects to the database
        if (!newHoaDonChiTietList.isEmpty()) {
            hoaDonChiTietRepository.saveAll(newHoaDonChiTietList);
        }

        // Update existing objects in the database
        if (!updatedHoaDonChiTietList.isEmpty()) {
            hoaDonChiTietRepository.saveAll(updatedHoaDonChiTietList);
        }

        // You might want to return an appropriate response here based on the operation
    }

    @Override
    public HoaDonChiTietResponse findById(Long id) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(id);
        if (hoaDonChiTiet.isEmpty()) {
            throw new NotFoundException("Hóa đơn chi tiết không tồn tại");
        }
        return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTiet.get());
    }

    @Override
    public HoaDonChiTietResponse update(Long id, UpdatedHoaDonChiTietRequest updatedHoaDonChiTietRequest) {
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Hóa đơn chi tiết không tồn tại"));
        hoaDonChiTiet.setSoLuong(updatedHoaDonChiTietRequest.getSoLuong());
//        hoaDonChiTiet.setDonGia(updatedHoaDonChiTietRequest.getDonGia());
//        hoaDonChiTiet.setTrangThaiHoaDonChiTiet(updatedHoaDonChiTietRequest.getTrangThaiHoaDonChiTiet());
//        hoaDonChiTiet.setChiTietSanPham(updatedHoaDonChiTietRequest.getChiTietSanPham());
//        hoaDonChiTiet.setHoaDon(updatedHoaDonChiTietRequest.getHoaDon());
//        hoaDonChiTiet.setGhiChu(updatedHoaDonChiTietRequest.getGhiChu());
//        hoaDonChiTiet.setNguoiTao(updatedHoaDonChiTietRequest.getNguoiTao());
//        hoaDonChiTiet.setNguoiSua(updatedHoaDonChiTietRequest.getNguoiSua());

        return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTietRepository.save(hoaDonChiTiet));
    }

    @Override
    public HoaDonChiTietResponse updateSoLuong(Long id, Integer soLuong) {
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(id).orElse(null);
        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(hoaDonChiTiet.getChiTietSanPham().getId()).orElse(null);
        if(soLuong> hoaDonChiTiet.getSoLuong()+chiTietSanPham.getSoLuong()){
            Integer soLuongTon =hoaDonChiTiet.getSoLuong()+chiTietSanPham.getSoLuong();
            throw new BadRequestException("Bạn chỉ có thể mua tối đa "+ soLuongTon);
        }
        if (soLuong > hoaDonChiTiet.getSoLuong()) {
            Integer soLuongSuDung = soLuong - hoaDonChiTiet.getSoLuong();
            chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() - soLuongSuDung);

        } else if (soLuong < hoaDonChiTiet.getSoLuong()) {
            Integer soLuongSuDung = hoaDonChiTiet.getSoLuong() - soLuong;
            chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() + soLuongSuDung);
        }
        hoaDonChiTiet.setSoLuong(soLuong);
        chiTietSanPhamRepository.save(chiTietSanPham);
        return hoaDonChiTietMapper.convertHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTietRepository.save(hoaDonChiTiet));

    }

    @Override
    public void delete(Long id) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(id);
        if (hoaDonChiTiet.isEmpty()) {
            throw new NotFoundException("Hóa đơn chi tiết không tồn tại");
        } else {
            ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(hoaDonChiTiet.get().getChiTietSanPham().getId()).orElse(null);
            chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() + hoaDonChiTiet.get().getSoLuong());
            chiTietSanPhamRepository.save(chiTietSanPham);
            hoaDonChiTietRepository.deleteById(id);
        }


    }

    @Override
    public void updateHoaDonChiTiet(List<UpdatedHoaDonChiTietRequest> updatedHoaDonChiTietRequests) {
        for (UpdatedHoaDonChiTietRequest request : updatedHoaDonChiTietRequests) {
            HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(request.getId()).orElse(null);
            ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(request.getChiTietSanPham().getId()).orElse(null);
            if (request.getSoLuong() > hoaDonChiTiet.getSoLuong()) {
                Integer soLuongSuDung = request.getSoLuong() - hoaDonChiTiet.getSoLuong();
                chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() - soLuongSuDung);
            } else if (request.getSoLuong() < hoaDonChiTiet.getSoLuong()) {
                Integer soLuongSuDung = hoaDonChiTiet.getSoLuong() - request.getSoLuong();
                chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() + soLuongSuDung);
            }
            chiTietSanPhamRepository.save(chiTietSanPham);
            update(request.getId(), request);
        }

    }

    @Override
    public List<HoaDonChiTietResponse> findByHoaDonId(Long id) {
        List<HoaDonChiTiet> hoaDonChiTietList = hoaDonChiTietRepository.findAllByHoaDonId(id);
        return hoaDonChiTietMapper.convertListHoaDonChiTietEntityToHoaDonChiTietResponse(hoaDonChiTietList);
    }

    @Override
    public Page<HoaDonChiTietResponse> getPageAllByIdHoaDon(Integer currentPage, Integer pageSize, String searchText, String sorter, String sortOrder, Long id) {
        Sort sort;
        if ("ascend".equals(sortOrder)) {
            sort = Sort.by(sorter).ascending();
        } else if ("descend".equals(sortOrder)) {
            sort = Sort.by(sorter).descending();
        } else {
            sort = Sort.by("ngayTao").descending();
        }
        Pageable pageable = PageRequest.of(currentPage - 1, pageSize, sort);
        Page<HoaDonChiTiet> hoaDonChiTietPage = hoaDonChiTietRepository.findPageHoaDonChiTiet(pageable, searchText, id);
        return hoaDonChiTietPage.map(hoaDonChiTietMapper::convertHoaDonChiTietEntityToHoaDonChiTietResponse);
    }
}
