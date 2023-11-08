package com.poly.application.service.impl;

import com.poly.application.entity.ThuongHieu;
import com.poly.application.entity.TimeLine;
import com.poly.application.model.mapper.HoaDonMapper;
import com.poly.application.model.mapper.TimelineMapper;
import com.poly.application.model.response.TimelineResponse;
import com.poly.application.repository.TimelineRepository;
import com.poly.application.service.TimelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimelineServiceImpl implements TimelineService {

    @Autowired
    private HoaDonMapper hoaDonMapper;

    @Autowired
    private TimelineRepository timelineRepository;

    @Autowired
    private TimelineMapper timelineMapper;

    @Override
    public List<TimelineResponse> getAllList(Long id) {
        List<TimeLine> list = timelineRepository.findTimeLinesByHoaDonId(id);
        return list.stream()
                .map(timelineMapper::convertEntityToResponse)
                .collect(Collectors.toList());
    }
}
