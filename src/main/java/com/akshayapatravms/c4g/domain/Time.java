package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.service.dto.TimeDTO;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "time")
public class Time extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "hours")
    private Integer hours;

    @Column(name = "minutes")
    private Integer minutes;

    public Time() {
    }

    public Time(TimeDTO timeDTO) {
        this.hours = timeDTO.getHours();
        this.minutes = timeDTO.getMinutes();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
