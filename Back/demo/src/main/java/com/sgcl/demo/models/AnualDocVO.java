package com.sgcl.demo.models;

import java.util.List;

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
    private String labName;
    private Long documentsIdDocuments;

    public Long getIdAnualdoc() {
        return idAnualdoc;
    }
    public void setIdAnualdoc(Long idAnualdoc) {
        this.idAnualdoc = idAnualdoc;
    }
    public Long getDocumentsIdDocuments() {
        return documentsIdDocuments;
    }
    public void setDocumentsIdDocuments(Long documentsIdDocuments) {
        this.documentsIdDocuments = documentsIdDocuments;
    }
    public String getLabName() {
        return labName;
    }
    public void setLabName(String labName) {
        this.labName = labName;
    }
}
