package com.sgcl.demo.models.RequestModels;

import java.util.Date;

import com.sgcl.demo.models.LaboratoryVO;

public class HoraryGroupResponse {
    private LaboratoryVO laboratoryVO;
    private Date startdate;
    private Date enddate;
    private String subject;

    public LaboratoryVO getLaboratoryVO() {
        return laboratoryVO;
    }
    public void setLaboratoryVO(LaboratoryVO laboratoryVO) {
        this.laboratoryVO = laboratoryVO;
    }
    public Date getStartdate() {
        return startdate;
    }
    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }
    public Date getEnddate() {
        return enddate;
    }
    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }

}
