package com.sgcl.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.NotificationVO;
import com.sgcl.demo.services.NotificationService;

@RestController
@RequestMapping("/notification")

@CrossOrigin(origins = "*")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/createNotification")
    public NotificationVO createNotificationByID(@RequestBody NotificationVO notification) {
        return this.notificationService.createNotification(notification);
    }

    @GetMapping("/getNotificationByID{id}")
    public Optional<NotificationVO> getNotificationById(@PathVariable long id){
        return this.notificationService.getNotificationById(id);
    }

    @GetMapping("/deleteNotificationById{id}")
    public String deleteNotificationById(@PathVariable long id){
        Boolean right = this.notificationService.deleteNotificationById(id);
        if (right){
            return "Notification "+ id+ " deleted";
        }else{
            return "Error to delete Notification "+ id;
        }
    }

    @GetMapping("/getNotificationByIdUser{id}")
    public List<NotificationVO> getNotificationByIdUser(@PathVariable long id){
        return this.notificationService.getNotificationByUserId(id);
    }

}
