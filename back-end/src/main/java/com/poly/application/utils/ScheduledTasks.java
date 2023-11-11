package com.poly.application.utils;

import com.poly.application.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private VoucherService voucherService;

    @Scheduled(fixedRate = 1000)
    public void updateVoucherStatus() {
        voucherService.updateVoucherStatus();
    }
}
