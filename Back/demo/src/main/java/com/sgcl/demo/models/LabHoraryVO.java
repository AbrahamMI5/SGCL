package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "lab_horary")
public class LabHoraryVO {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLabHorary;
    private Long requestLaboratoryIdRequestLaboratory;
    private Long semesterIdSemester;
    private Date created_at;
    private Date deleted_at;

    
    public Date getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
    public Date getDeleted_at() {
        return deleted_at;
    }
    public void setDeleted_at(Date deleted_at) {
        this.deleted_at = deleted_at;
    }
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
