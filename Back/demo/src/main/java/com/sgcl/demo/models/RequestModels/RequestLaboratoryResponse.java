package com.sgcl.demo.models.RequestModels;

import java.sql.Time;

public class RequestLaboratoryResponse {
    private Long idRequestLaboratory;
    private Time startHorary;
    private Time endHorary;
    private String day;
    private String subject;
    private String groups;
    private int studentNumber;
    private String requiredSoftware;
    private Boolean status;
    private String rRejection;
    private int laboratoriesIdLaboratories;
    private int usersIdUsers;
    private Long semesterIdSemester;
    private Boolean deleted;
    
    public Long getIdRequestLaboratory() {
        return idRequestLaboratory;
    }
    public void setIdRequestLaboratory(Long idRequestLaboratory) {
        this.idRequestLaboratory = idRequestLaboratory;
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
    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getGroups() {
        return groups;
    }
    public void setGroups(String groups) {
        this.groups = groups;
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
    public Long getSemesterIdSemester() {
        return semesterIdSemester;
    }
    public void setSemesterIdSemester(Long semesterIdSemester) {
        this.semesterIdSemester = semesterIdSemester;
    }
    public Boolean getDeleted() {
        return deleted;
    }
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    

}
