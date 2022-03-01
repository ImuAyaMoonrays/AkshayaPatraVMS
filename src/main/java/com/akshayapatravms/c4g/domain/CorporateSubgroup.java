package com.akshayapatravms.c4g.domain;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "corporate_subgroup")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CorporateSubgroup extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    //    todo: add unique = true and then gen liquibase changelog
    @Size(max = 100)
    @Column(name = "subgroup_name", nullable = false)
    private String subgroupName;

    @ElementCollection
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

    public void setSubgroupName(String subgroup_name) {
        this.subgroupName = subgroup_name;
    }

    public Set<String> getSubgroupEmailPatterns() {
        return subgroupEmailPatterns;
    }

    public void setSubgroupEmailPatterns(Set<String> subgroupEmailPatterns) {
        this.subgroupEmailPatterns = subgroupEmailPatterns;
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }
}
