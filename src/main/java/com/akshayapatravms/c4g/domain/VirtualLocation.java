package com.akshayapatravms.c4g.domain;

import com.akshayapatravms.c4g.service.dto.VirtualLocationDTO;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "virtual_location")
public class VirtualLocation extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 1000)
    @Column(name = "url", length = 1000)
    private String url;

    @Size(max = 1000)
    @Column(name = "passcode", length = 1000)
    private String passcode;

    public VirtualLocation(){
    }

    public VirtualLocation(VirtualLocationDTO virtualLocationDTO){
        this.url = virtualLocationDTO.getUrl();
        this.passcode = virtualLocationDTO.getPasscode();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPasscode() {
        return passcode;
    }

    public void setPasscode(String passcord) {
        this.passcode = passcord;
    }
}
