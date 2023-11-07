package com.poly.application.model.mapper;

import com.poly.application.entity.ThuongHieu;
import com.poly.application.entity.TimeLine;
import com.poly.application.model.request.create_request.CreatedThuongHieuRequest;
import com.poly.application.model.request.create_request.CreatedTimelineRequest;
import com.poly.application.model.request.update_request.UpdatedThuongHieuRequest;
import com.poly.application.model.request.update_request.UpdatedTimelineRequest;
import com.poly.application.model.response.ThuongHieuResponse;
import com.poly.application.model.response.TimelineResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TimelineMapper {

    @Autowired
    private ModelMapper mapper;

    public TimelineResponse convertEntityToResponse(TimeLine timeLine) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return mapper.map(timeLine, TimelineResponse.class);
    }

    public TimeLine convertCreateRequestToEntity(CreatedTimelineRequest request) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return  mapper.map(request, TimeLine.class);
    }

    public void convertUpdateRequestToEntity(UpdatedTimelineRequest request, TimeLine timeLine) {
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        mapper.map(request, timeLine);
    }

}
