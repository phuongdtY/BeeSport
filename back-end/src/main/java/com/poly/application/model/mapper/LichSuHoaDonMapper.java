package com.poly.application.model.mapper;

import com.poly.application.entity.LichSuHoaDon;
import com.poly.application.model.request.create_request.CreateLichSuHoaDonRequest;
import com.poly.application.model.request.update_request.UpdatedLichSuHoaDonRequest;
import com.poly.application.model.response.LichSuHoaDonResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LichSuHoaDonMapper {

    @Autowired
    private ModelMapper modelMapper;

    public LichSuHoaDon convertLichSuHoaDonResponseToLichSuHoaDonEntity(LichSuHoaDonResponse lichSuHoaDonResponse) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(lichSuHoaDonResponse, LichSuHoaDon.class);
    }

    public LichSuHoaDonResponse convertLichSuHoaDonEntityToLichSuHoaDonResponse(LichSuHoaDon lichSuHoaDon) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(lichSuHoaDon, LichSuHoaDonResponse.class);
    }

    public LichSuHoaDon convertCreateLichSuHoaDonRequestToLichSuHoaDonEntity(CreateLichSuHoaDonRequest createLichSuHoaDonRequest) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(createLichSuHoaDonRequest, LichSuHoaDon.class);
    }

    public LichSuHoaDon convertUpdatedLichSuHoaDonRequestToLichSuHoaDonEntity(UpdatedLichSuHoaDonRequest updatedLichSuHoaDonRequest) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(updatedLichSuHoaDonRequest, LichSuHoaDon.class);
    }

    public List<LichSuHoaDonResponse> convertListLichSuHoaDonEntityToLichSuHoaDonResponse(List<LichSuHoaDon> lichSuHoaDonList) {
        List<LichSuHoaDonResponse> list = new ArrayList<>(lichSuHoaDonList.size());
        for (LichSuHoaDon lshd : lichSuHoaDonList) {
            list.add(convertLichSuHoaDonEntityToLichSuHoaDonResponse(lshd));
        }
        return list;
    }

}
