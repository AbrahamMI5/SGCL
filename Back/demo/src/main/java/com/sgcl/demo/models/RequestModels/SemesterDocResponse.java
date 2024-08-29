package com.sgcl.demo.models.RequestModels;

import com.sgcl.demo.models.LaboratoryVO;

public class SemesterDocResponse {
    private Long idSemesterdoc;
    private String action;
    private String observation;
    private String labName;
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
    public String getLabName() {
        return labName;
    }
    public void setLabName(String labName) {
        this.labName = labName;
    }
    public Long getDocumentsId() {
        return documentsId;
    }
    public void setDocumentsId(Long documentsId) {
        this.documentsId = documentsId;
    }

    
}
