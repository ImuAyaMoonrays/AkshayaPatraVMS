package com.akshayapatravms.c4g.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "corporate_subgroup")
public class CorporateSubgroup extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "subgroup_name")
    private String subgroupName;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "subgroup_email_pattern", joinColumns = @JoinColumn(name = "corporate_subgroup_id"))
    private Set<String> subgroupEmailPatterns;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubgroupName() {
        return subgroupName;
    }

    public void setSubgroupName(String subgroupName) {
        this.subgroupName = subgroupName;
    }

    public Set<String> getSubgroupEmailPatterns() {
        return subgroupEmailPatterns;
    }

    public void setSubgroupEmailPatterns(Set<String> subgroupEmailPatterns) {
        this.subgroupEmailPatterns = subgroupEmailPatterns;
    }

    @Override
    public String toString() {
        return subgroupName;
    }
}
