package com.sgcl.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.NotificationVO;
import com.sgcl.demo.repositories.NotificationRepository;

@Service
public class NotificationService {
    @Autowired
    NotificationRepository notificationRepository;

    public NotificationVO createNotification(NotificationVO notificationVO){
        return notificationRepository.save(notificationVO);
    }

    public Optional<NotificationVO> getNotificationById(long id){
        return notificationRepository.findById(id);
    }

    public boolean deleteNotificationById(long id){
        try{
            notificationRepository.deleteById(id);;
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

    public List<NotificationVO> getNotificationByUserId(long id){
        return (List<NotificationVO>) notificationRepository.findByUsersIdUsers(id);
    }
}
     