package com.sgcl.demo.models.RequestModels;

public class StadisticsLaboratory {
    private String labName;
    private Integer semanalHours;
    private Integer userRequest;
    private Integer attendants;

    public String getLabName() {
        return labName;
    }
    public void setLabName(String labName) {
        this.labName = labName;
    }
    public Integer getSemanalHours() {
        return semanalHours;
    }
    public void setSemanalHours(Integer semanalHours) {
        this.semanalHours = semanalHours;
    }
    public Integer getUserRequest() {
        return userRequest;
    }
    public void setUserRequest(Integer userRequest) {
        this.userRequest = userRequest;
    }
    public Integer getAttendants() {
        return attendants;
    }
    public void setAttendants(Integer attendants) {
        this.attendants = attendants;
    }
}
