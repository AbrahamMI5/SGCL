package com.sgcl.demo.models.RequestModels;

import java.util.Optional;

import com.sgcl.demo.models.LaboratoryVO;
import com.sgcl.demo.models.UserVO;

public class ServiceResponse {
    private Long idRequestService;
    private String applicantArea;
    private String position;
    private String reciverName;
    private String reciverEmail;
    private String reciverArea;
    private String reciverPosition;
    private String basicFunction;
    private String specialFunction;
    private String observations;
    private String authorizedName;
    private String authorizedEmail;
    private String authorizedArea;
    private String authorizedPosition;
    private String labName;
    private String rejection;
    private Long requestServiceStatus;
    private Optional<UserVO> usersIdUsers;
    private Optional<LaboratoryVO> laboratoriesIdLaboratories;

    public Long getIdRequestService() {
        return idRequestService;
    }
    public void setIdRequestService(Long idRequestService) {
        this.idRequestService = idRequestService;
    }
    public String getApplicantArea() {
        return applicantArea;
    }
    public void setApplicantArea(String applicantArea) {
        this.applicantArea = applicantArea;
    }
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }
    public String getReciverName() {
        return reciverName;
    }
    public void setReciverName(String reciverName) {
        this.reciverName = reciverName;
    }
    public String getReciverEmail() {
        return reciverEmail;
    }
    public void setReciverEmail(String reciverEmail) {
        this.reciverEmail = reciverEmail;
    }
    public String getReciverArea() {
        return reciverArea;
    }
    public void setReciverArea(String reciverArea) {
        this.reciverArea = reciverArea;
    }
    public String getReciverPosition() {
        return reciverPosition;
    }
    public void setReciverPosition(String reciverPosition) {
        this.reciverPosition = reciverPosition;
    }
    public String getBasicFunction() {
        return basicFunction;
    }
    public void setBasicFunction(String basicFunction) {
        this.basicFunction = basicFunction;
    }
    public String getSpecialFunction() {
        return specialFunction;
    }
    public void setSpecialFunction(String specialFunction) {
        this.specialFunction = specialFunction;
    }
    public String getObservations() {
        return observations;
    }
    public void setObservations(String observations) {
        this.observations = observations;
    }
    public String getAuthorizedName() {
        return authorizedName;
    }
    public void setAuthorizedName(String authorizedName) {
        this.authorizedName = authorizedName;
    }
    public String getAuthorizedEmail() {
        return authorizedEmail;
    }
    public void setAuthorizedEmail(String authorizedEmail) {
        this.authorizedEmail = authorizedEmail;
    }
    public String getAuthorizedArea() {
        return authorizedArea;
    }
    public void setAuthorizedArea(String authorizedArea) {
        this.authorizedArea = authorizedArea;
    }
    public String getAuthorizedPosition() {
        return authorizedPosition;
    }
    public void setAuthorizedPosition(String authorizedPosition) {
        this.authorizedPosition = authorizedPosition;
    }
    public String getLabName() {
        return labName;
    }
    public void setLabName(String labName) {
        this.labName = labName;
    }
    public String getRejection() {
        return rejection;
    }
    public void setRejection(String rejection) {
        this.rejection = rejection;
    }
    public Long getRequestServiceStatus() {
        return requestServiceStatus;
    }
    public void setRequestServiceStatus(Long requestServiceStatus) {
        this.requestServiceStatus = requestServiceStatus;
    }
    public Optional<UserVO> getUsersIdUsers() {
        return usersIdUsers;
    }
    public void setUsersIdUsers(Optional<UserVO> usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }
    public Optional<LaboratoryVO> getLaboratoriesIdLaboratories() {
        return laboratoriesIdLaboratories;
    }
    public void setLaboratoriesIdLaboratories(Optional<LaboratoryVO> laboratoriesIdLaboratories) {
        this.laboratoriesIdLaboratories = laboratoriesIdLaboratories;
    }
}
