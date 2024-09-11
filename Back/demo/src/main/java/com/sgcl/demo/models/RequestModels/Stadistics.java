package com.sgcl.demo.models.RequestModels;

import java.util.List;

import com.sgcl.demo.models.SemesterVO;

public class Stadistics {
    private SemesterVO semester;
    private List<StadisticsLaboratory> laboratory;

    public SemesterVO getSemester() {
        return semester;
    }
    public void setSemester(SemesterVO semester) {
        this.semester = semester;
    }
    public List<StadisticsLaboratory> getLaboratory() {
        return laboratory;
    }
    public void setLaboratory(List<StadisticsLaboratory> laboratory) {
        this.laboratory = laboratory;
    }
}
