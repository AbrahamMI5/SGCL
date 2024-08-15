package com.sgcl.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "documents")
public class DocumentVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDocuments;
    private String responsibleName;
    private String adminResponsibleName;
    private String enddate;
    @Column(nullable = true)
    private String month;
    private Integer year;

    public Long getIdDocuments() {
        return idDocuments;
    }
    public void setIdDocuments(Long idDocuments) {
        this.idDocuments = idDocuments;
    }
    public String getResponsibleName() {
        return responsibleName;
    }
    public void setResponsibleName(String responsibleName) {
        this.responsibleName = responsibleName;
    }
    public String getEnddate() {
        return enddate;
    }
    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }
    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public Integer getYear() {
        return year;
    }
    public void setYear(Integer year) {
        this.year = year;
    }
    public String getAdminResponsibleName() {
        return adminResponsibleName;
    }
    public void setAdminResponsibleName(String adminResponsibleName) {
        this.adminResponsibleName = adminResponsibleName;
    }
}
