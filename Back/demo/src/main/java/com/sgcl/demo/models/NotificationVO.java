package com.sgcl.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class NotificationVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNotifications;
    private String notifyMenssage;
    private Boolean todelete;
    private Long requestLaboratoryIdRequestLaboratory;
    private Long usersIdUsers;

    public String getNotifyMenssage() {
        return notifyMenssage;
    }
    public void setNotifyMenssage(String notifyMenssage) {
        this.notifyMenssage = notifyMenssage;
    }
    public Boolean getTodelete() {
        return todelete;
    }
    public void setTodelete(Boolean delete) {
        this.todelete = delete;
    }
    public Long getRequestLaboratoryIdRequestLaboratory() {
        return requestLaboratoryIdRequestLaboratory;
    }
    public void setRequestLaboratoryIdRequestLaboratory(Long requestLaboratoryIdRequestLaboratory) {
        this.requestLaboratoryIdRequestLaboratory = requestLaboratoryIdRequestLaboratory;
    }
    public Long getUsersIdUsers() {
        return usersIdUsers;
    }
    public void setUsersIdUsers(Long usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }

}
