package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "laboratories")
public class LaboratoryVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLaboratories ;

    private String labName;

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public Long getIdLaboratories() {
        return idLaboratories;
    }

    public void setIdLaboratories(Long idLaboratories) {
        this.idLaboratories = idLaboratories;
    }

    
}
