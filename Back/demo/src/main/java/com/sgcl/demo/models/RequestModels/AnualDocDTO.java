package com.sgcl.demo.models.RequestModels;

import java.util.List;

import com.sgcl.demo.models.DatesVO;

public class AnualDocDTO {
    private Long idAnualdoc;
    private String labName;
    private List<DatesVO> dates;
    private Long documentsIdDocuments;
    
    public Long getIdAnualdoc() {
        return idAnualdoc;
    }
    public void setIdAnualdoc(Long idAnualdoc) {
        this.idAnualdoc = idAnualdoc;
    }
    public String getLabName() {
        return labName;
    }
    public void setLabName(String labName) {
        this.labName = labName;
    }
    public List<DatesVO> getDates() {
        return dates;
    }
    public void setDates(List<DatesVO> dates) {
        this.dates = dates;
    }
    public Long getDocumentsIdDocuments() {
        return documentsIdDocuments;
    }
    public void setDocumentsIdDocuments(Long documentsIdDocuments) {
        this.documentsIdDocuments = documentsIdDocuments;
    }
    
}
