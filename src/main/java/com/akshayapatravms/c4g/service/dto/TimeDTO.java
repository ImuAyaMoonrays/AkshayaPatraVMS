package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.domain.Time;

public class TimeDTO {

    private Integer hours;

    private Integer minutes;

    public TimeDTO() {
    }

    public TimeDTO(Time time) {
        this.hours = time.getHours();
        this.minutes = time.getMinutes();

    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }
}
