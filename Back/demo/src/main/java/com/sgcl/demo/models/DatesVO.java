package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "date_anual_doc")
public class DatesVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_date_anual_doc;
    
    private String month;
    private String days;
    private Long id_anual_doc;

    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public String getDays() {
        return days;
    }
    public void setDays(String days) {
        this.days = days;
    }
    public Long getId_date_anual_doc() {
        return id_date_anual_doc;
    }
    public void setId_date_anual_doc(Long id_date_anual_doc) {
        this.id_date_anual_doc = id_date_anual_doc;
    }
    public Long getId_anual_doc() {
        return id_anual_doc;
    }
    public void setId_anual_doc(Long id_anual_doc) {
        this.id_anual_doc = id_anual_doc;
    }
    
}
