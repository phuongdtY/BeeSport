package com.poly.application.model.mapper;

import com.poly.application.entity.GiaoDich;
import com.poly.application.model.request.create_request.CreateGiaoDichRequest;
import com.poly.application.model.request.update_request.UpdatedGiaoDichRequest;
import com.poly.application.model.response.GiaoDichResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GiaoDichMapper {

    @Autowired
    private ModelMapper modelMapper;

    public GiaoDich convertGiaoDichResponseToGiaoDichEntity(GiaoDichResponse giaoDichResponse){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(giaoDichResponse, GiaoDich.class);
    }

    public GiaoDichResponse convertGiaoDichEntityToGiaoDichResponse(GiaoDich giaoDich){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(giaoDich, GiaoDichResponse.class);
    }

    public GiaoDich convertCreateGiaoDichRequestToGiaoDichEntity(CreateGiaoDichRequest createGiaoDichRequest){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(createGiaoDichRequest, GiaoDich.class);
    }

    public void convertUpdatedGiaoDichRequestToGiaoDichEntity(UpdatedGiaoDichRequest updatedGiaoDichRequest, GiaoDich giaoDich){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        modelMapper.map(updatedGiaoDichRequest, giaoDich);
    }

    public List<GiaoDichResponse> convertListGiaoDichEntityToGiaoDichResponse(List<GiaoDich> giaoDichList){
        List<GiaoDichResponse> list = new ArrayList<>(giaoDichList.size());
        for (GiaoDich gd : giaoDichList){
            list.add(convertGiaoDichEntityToGiaoDichResponse(gd));
        }
        return list;
    }

}
