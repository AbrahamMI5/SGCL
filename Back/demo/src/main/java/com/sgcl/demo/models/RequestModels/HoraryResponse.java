package com.sgcl.demo.models.RequestModels;

import java.util.Date;

public class HoraryResponse {
    String header;
    Date startdate;
    Date enddate;
    String subject;

    public String getHeader() {
        return header;
    }
    public void setHeader(String header) {
        this.header = header;
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
