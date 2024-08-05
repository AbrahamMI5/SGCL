package com.sgcl.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Time;

@Entity
@Table(name = "requestLaboratory")
public class RequestLaboratoryVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRequestLaboratory;

    private Time startHorary;
    private Time endHorary;
    private String day;
    private String subject;
    private String groups;
    private int studentNumber;
    @Column(nullable = true)
    private String requiredSoftware;
    @Column(nullable = true)
    private Boolean status; //1= Aceptado 0= rechazado null=pendiente
    @Column(nullable = true)
    private String rRejection;
    private int laboratoriesIdLaboratories;
    private int usersIdUsers;
    private Long semesterIdSemester;
    
    public Long getIdRequestLaboratory() {
        return idRequestLaboratory;
    }
    public void setIdRequestLaboratory(Long idRequestLaboratory) {
        this.idRequestLaboratory = idRequestLaboratory;
    }
    public String getGroups() {
        return groups;
    }
    public void setGroups(String groups) {
        this.groups = groups;
    }
    public Long getSemesterIdSemester() {
        return semesterIdSemester;
    }
    public void setSemesterIdSemester(Long semesterIdSemester) {
        this.semesterIdSemester = semesterIdSemester;
    }
    public Time getStartHorary() {
        return startHorary;
    }
    public void setStartHorary(Time startHorary) {
        this.startHorary = startHorary;
    }
    public Time getEndHorary() {
        return endHorary;
    }
    public void setEndHorary(Time endHorary) {
        this.endHorary = endHorary;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public int getStudentNumber() {
        return studentNumber;
    }
    public void setStudentNumber(int studentNumber) {
        this.studentNumber = studentNumber;
    }
    public String getRequiredSoftware() {
        return requiredSoftware;
    }
    public void setRequiredSoftware(String requiredSoftware) {
        this.requiredSoftware = requiredSoftware;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }
    public String getrRejection() {
        return rRejection;
    }
    public void setrRejection(String rRejection) {
        this.rRejection = rRejection;
    }
    public int getLaboratoriesIdLaboratories() {
        return laboratoriesIdLaboratories;
    }
    public void setLaboratoriesIdLaboratories(int laboratoriesIdLaboratories) {
        this.laboratoriesIdLaboratories = laboratoriesIdLaboratories;
    }
    public int getUsersIdUsers() {
        return usersIdUsers;
    }
    public void setUsersIdUsers(int usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }
    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
    }


}
