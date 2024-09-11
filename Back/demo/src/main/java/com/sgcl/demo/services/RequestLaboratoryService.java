package com.sgcl.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.LabHoraryVO;
import com.sgcl.demo.models.LaboratoryVO;
import com.sgcl.demo.models.NotificationVO;
import com.sgcl.demo.models.RequestLaboratoryVO;
import com.sgcl.demo.models.RequestModels.Stadistics;
import com.sgcl.demo.models.RequestModels.StadisticsLaboratory;
import com.sgcl.demo.repositories.RequestLaboratoryRepository;
import com.sgcl.demo.repositories.LabHoraryRepository;
import com.sgcl.demo.repositories.LaboratoryRepository;
import com.sgcl.demo.repositories.SemesterRepository;;

@Service
public class RequestLaboratoryService {
    @Autowired
    RequestLaboratoryRepository requestLaboratoryRepository;

    @Autowired
    SemesterRepository semesterRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private LabHoraryRepository labHoraryRepository;

    @Autowired
    private LaboratoryRepository laboratoryRepository;

    public List<RequestLaboratoryVO> getRequestLaboratories() {
        return (List<RequestLaboratoryVO>) requestLaboratoryRepository.findAll();
    }

    public RequestLaboratoryVO createRequestLaboratory(RequestLaboratoryVO requestLaboratoryVO) {
        requestLaboratoryVO.setSemesterIdSemester(semesterRepository.getActiveSemester().get().getIdSemester());
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
            horary.setSemesterIdSemester(semesterRepository.getActiveSemester().get().getIdSemester());
            labHoraryRepository.save(horary);
        }
        return requestLaboratoryRepository.save(requestLab);
    }

    public Optional<List<RequestLaboratoryVO>> getRequestLabByID(long id) {
        return requestLaboratoryRepository.getRequestLabById(id, semesterRepository.getActiveSemester().get().getIdSemester());
    }

    public Optional<List<RequestLaboratoryVO>> getRequestInProcess(){
        return requestLaboratoryRepository.getRequestLabInProcess(semesterRepository.getActiveSemester().get().getIdSemester());
    }

    public Optional<List<RequestLaboratoryVO>> getRequestAnswered(){
        return requestLaboratoryRepository.getRequestLabAnswered(semesterRepository.getActiveSemester().get().getIdSemester());
    }

    public Integer countPeticionesByLaboratoryAndSemester(long idLaboratory, long idSemester){
        return requestLaboratoryRepository.countPeticionesByLaboratoryAndSemester(idLaboratory, idSemester);
    }

    public Integer countHorasDeUsoByLaboratoryAndSemester(long idLaboratory, long idSemester){
        return requestLaboratoryRepository.countHorasDeUsoByLaboratoryAndSemester(idLaboratory, idSemester);
    }

    public Integer countAsistentesSemanalesByLaboratoryAndSemester(long idLaboratory, long idSemester){
        return requestLaboratoryRepository.countAsistentesSemanalesByLaboratoryAndSemester(idLaboratory, idSemester);
    }

    public Stadistics getStadistics(long idSemester){
        Stadistics stadisticslab = new Stadistics();
        stadisticslab.setSemester(semesterRepository.findById(idSemester).get());
        List<LaboratoryVO> laboratoryList = laboratoryRepository.findAll();
        List<StadisticsLaboratory> stadisticsLaboratories = new ArrayList<>();
        for (LaboratoryVO lab : laboratoryList){
            StadisticsLaboratory stadisticsLaboratory = new StadisticsLaboratory();
            stadisticsLaboratory.setLabName(lab.getLabName());
            if(countAsistentesSemanalesByLaboratoryAndSemester(lab.getIdLaboratories(), idSemester) != null){
                stadisticsLaboratory.setAttendants(countAsistentesSemanalesByLaboratoryAndSemester(lab.getIdLaboratories(), idSemester));
            }else{
                stadisticsLaboratory.setAttendants(0);
            }
            stadisticsLaboratory.setSemanalHours(countHorasDeUsoByLaboratoryAndSemester(lab.getIdLaboratories(), idSemester));
            stadisticsLaboratory.setUserRequest(countPeticionesByLaboratoryAndSemester(lab.getIdLaboratories(), idSemester));
            stadisticsLaboratories.add(stadisticsLaboratory);
        }
        stadisticslab.setLaboratory(stadisticsLaboratories);
        return stadisticslab;
    }

}
