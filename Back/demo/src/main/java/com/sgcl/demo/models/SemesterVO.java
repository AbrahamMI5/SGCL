package com.sgcl.demo.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "semester")
public class SemesterVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSemester;
    
    private String name;
    private Date startDate;
    private Date endDate;
    private Integer isActive;

    public Long getIdSemester() {
        return idSemester;
    }
    public Integer getIsActive() {
        return isActive;
    }
    public void setIsActive(Integer isActive) {
        this.isActive = isActive;
    }
    public void setIdSemester(Long idSemester) {
        this.idSemester = idSemester;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
