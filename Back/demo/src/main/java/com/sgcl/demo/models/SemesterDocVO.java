package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "semester_document")
public class SemesterDocVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSemesterdoc;
    private String action;
    private String observation;
    private Long laboratoriesIdLaboratories;
    private Long documentsId;

    public Long getIdSemesterdoc() {
        return idSemesterdoc;
    }
    public void setIdSemesterdoc(Long idSemesterdoc) {
        this.idSemesterdoc = idSemesterdoc;
    }
    public String getAction() {
        return action;
    }
    public void setAction(String action) {
        this.action = action;
    }
    public String getObservation() {
        return observation;
    }
    public void setObservation(String observation) {
        this.observation = observation;
    }
    public Long getLaboratoriesIdLaboratories() {
        return laboratoriesIdLaboratories;
    }
    public void setLaboratoriesIdLaboratories(Long laboratoriesIdLaboratories) {
        this.laboratoriesIdLaboratories = laboratoriesIdLaboratories;
    }
    public Long getDocumentsId() {
        return documentsId;
    }
    public void setDocumentsId(Long documentsId) {
        this.documentsId = documentsId;
    }
}
