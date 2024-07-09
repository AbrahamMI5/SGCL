package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "lab_horary")
public class LabHoraryVO {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLabHorary;
    private Long requestLaboratoryIdRequestLaboratory;
    private Long semesterIdSemester;
    
    public Long getIdLabHorary() {
        return idLabHorary;
    }
    public void setIdLabHorary(Long idLabHorary) {
        this.idLabHorary = idLabHorary;
    }
    public Long getRequestLaboratoryIdRequestLaboratory() {
        return requestLaboratoryIdRequestLaboratory;
    }
    public void setRequestLaboratoryIdRequestLaboratory(Long requestLaboratoryIdRequestLaboratory) {
        this.requestLaboratoryIdRequestLaboratory = requestLaboratoryIdRequestLaboratory;
    }
    public Long getSemesterIdSemester() {
        return semesterIdSemester;
    }
    public void setSemesterIdSemester(Long i) {
        this.semesterIdSemester = i;
    }
    

}
