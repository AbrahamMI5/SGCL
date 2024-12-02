package com.sgcl.demo.models;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "authorizers")
public class AuthorizersVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAuthorizers;
    private String name;
    private String email;
    private String area;
    private String position;

    public Long getIdAuthorizers() {
        return idAuthorizers;
    }
    public void setIdAuthorizers(Long idAuthorizers) {
        this.idAuthorizers = idAuthorizers;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }

    

}

