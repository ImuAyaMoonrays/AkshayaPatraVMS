package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.service.dto.CauseDTO;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "cause")
public class Cause extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "cause_name", length = 100, nullable = false, unique = true)
    private String causeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cause() {}

    public Cause(String name) {
        this.causeName = name;
    }

    public Cause(CauseDTO causeDTO) {
        this.causeName = causeDTO.getCauseName();
        this.id = causeDTO.getId();
    }

    public String getCauseName() {
        return causeName;
    }

    public void setCauseName(String causeName) {
        this.causeName = causeName;
    }

    @Override
    public String toString() {
        return causeName;
    }
}
