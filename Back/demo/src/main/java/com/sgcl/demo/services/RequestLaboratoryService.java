package com.sgcl.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.LabHoraryVO;
import com.sgcl.demo.models.NotificationVO;
import com.sgcl.demo.models.RequestLaboratoryVO;
import com.sgcl.demo.repositories.RequestLaboratoryRepository;
import com.sgcl.demo.repositories.LabHoraryRepository;

@Service
public class RequestLaboratoryService {
    @Autowired
    RequestLaboratoryRepository requestLaboratoryRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private LabHoraryRepository labHoraryRepository;

    public List<RequestLaboratoryVO> getRequestLaboratories() {
        return (List<RequestLaboratoryVO>) requestLaboratoryRepository.findAll();
    }

    public RequestLaboratoryVO createRequestLaboratory(RequestLaboratoryVO requestLaboratoryVO) {
        return requestLaboratoryRepository.save(requestLaboratoryVO);
    }

    public Optional<RequestLaboratoryVO> getRequestLaboratoryByID(long id) {
        return requestLaboratoryRepository.findById(id);
    }

    public Boolean deleteRequest(Long id) {
        try {
            requestLaboratoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    // Se realiza automaticamente el registro de las notificaciones de solicitudes
    // aceptadas y rechazadas
    public RequestLaboratoryVO updateRequestById(RequestLaboratoryVO request, Long id) {
        RequestLaboratoryVO requestLab = requestLaboratoryRepository.findById(id).get();

        requestLab.setrRejection(request.getrRejection());
        requestLab.setStatus(request.getStatus());

        if (!request.getStatus()) {
            NotificationVO notification = new NotificationVO();
            notification.setNotifyMenssage("La solicitud de laboratorio ha sido rechazada.\n"+request.getrRejection());
            notification.setTodelete(false);
            notification.setRequestLaboratoryIdRequestLaboratory(requestLab.getIdRequestLaboratory());
            notification.setUsersIdUsers((long) requestLab.getUsersIdUsers());
            notificationService.createNotification(notification);
        } else {
            NotificationVO notification = new NotificationVO();
            notification.setNotifyMenssage("La solicitud de laboratorio ha sido aceptada.");
            notification.setTodelete(false);
            notification.setRequestLaboratoryIdRequestLaboratory(requestLab.getIdRequestLaboratory());
            notification.setUsersIdUsers((long) requestLab.getUsersIdUsers());
            notificationService.createNotification(notification);

            LabHoraryVO horary = new LabHoraryVO();
            horary.setRequestLaboratoryIdRequestLaboratory(id);
            horary.setSemesterIdSemester((long)1);
            labHoraryRepository.save(horary);
        }
        return requestLaboratoryRepository.save(requestLab);
    }

    public Optional<List<RequestLaboratoryVO>> getRequestLabByID(long id) {
        return requestLaboratoryRepository.getRequestLabById(id);
    }

    public Optional<List<RequestLaboratoryVO>> getRequestInProcess(){
        return requestLaboratoryRepository.getRequestLabInProcess();
    }

    public Optional<List<RequestLaboratoryVO>> getRequestAnswered(){
        return requestLaboratoryRepository.getRequestLabAnswered();
    }

}
