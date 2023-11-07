package com.poly.application.model.mapper;

import com.poly.application.entity.HoaDon;
import com.poly.application.model.request.create_request.CreateHoaDonRequest;
import com.poly.application.model.request.update_request.UpdatedHoaDonRequest;
import com.poly.application.model.response.HoaDonResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HoaDonMapper {

    @Autowired
    private ModelMapper modelMapper;

    public HoaDon convertHoaDonResponseToEntity(HoaDonResponse hoaDonResponse){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(hoaDonResponse, HoaDon.class);
    }

    public HoaDonResponse convertHoaDonEntityToHoaDonResponse(HoaDon hoaDon){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(hoaDon, HoaDonResponse.class);
    }

    public HoaDon convertCreateHoaDonRequestToHoaDonEntity(CreateHoaDonRequest createHoaDonRequest){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(createHoaDonRequest, HoaDon.class);
    }

    public void convertUpdatedHoaDonRequestToHoaDonEntity(UpdatedHoaDonRequest updatedHoaDonRequest, HoaDon detail){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        modelMapper.map(updatedHoaDonRequest, detail);
    }

    public List<HoaDonResponse> convertListHoaDonEntityToHoaDonResponse(List<HoaDon> hoaDonList){
        List<HoaDonResponse> list = new ArrayList<>(hoaDonList.size());
        for (HoaDon hd : hoaDonList){
            list.add(convertHoaDonEntityToHoaDonResponse(hd));
        }
        return list;
    }

}
