package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "anual_document")
public class AnualDocVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnualdoc;
    private String month1;
    private String days1;
    private String month2;
    private String days2;
    private Long laboratoriesIdLaboratories;
    private Long documentsIdDocuments;

    public Long getIdAnualdoc() {
        return idAnualdoc;
    }
    public void setIdAnualdoc(Long idAnualdoc) {
        this.idAnualdoc = idAnualdoc;
    }
    public String getMonth1() {
        return month1;
    }
    public void setMonth1(String month1) {
        this.month1 = month1;
    }
    public String getDays1() {
        return days1;
    }
    public void setDays1(String days1) {
        this.days1 = days1;
    }
    public String getMonth2() {
        return month2;
    }
    public void setMonth2(String month2) {
        this.month2 = month2;
    }
    public String getDays2() {
        return days2;
    }
    public void setDays2(String days2) {
        this.days2 = days2;
    }
    public Long getDocumentsIdDocuments() {
        return documentsIdDocuments;
    }
    public void setDocumentsIdDocuments(Long documentsIdDocuments) {
        this.documentsIdDocuments = documentsIdDocuments;
    }
    public Long getLaboratoriesIdLaboratories() {
        return laboratoriesIdLaboratories;
    }
    public void setLaboratoriesIdLaboratories(Long laboratoriesIdLaboratories) {
        this.laboratoriesIdLaboratories = laboratoriesIdLaboratories;
    }
}
