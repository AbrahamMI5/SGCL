package com.sgcl.demo.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.RequestModels.HoraryGroupResponse;
import com.sgcl.demo.models.RequestModels.HoraryLaboratoryResponse;
import com.sgcl.demo.models.RequestModels.HoraryResponse;
import com.sgcl.demo.repositories.LabHoraryRepository;
import com.sgcl.demo.repositories.LaboratoryRepository;

@Service
public class LabHoraryService {

    @Autowired
    LabHoraryRepository labHoraryRepository;

    @Autowired
    LaboratoryService laboratoryService;

    public List<String> getClassrooms(){
        return (labHoraryRepository.getClassrooms());
    }

    public List<HoraryResponse> getHoraryByGroup(String group){
        List<Object[]> objectList = labHoraryRepository.getHoraryByGroup(group);
        List<HoraryResponse> response =  new ArrayList<>();;

        List<String> timeStrings = List.of("12:00:00", "14:00:00", "16:00:00", "18:00:00");
        
        List<Date> expectedTimes = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        for (String timeString : timeStrings) {
            try {
                Date time = sdf.parse(timeString);
                expectedTimes.add(time);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        for (String day : List.of("Lu", "Ma", "Mi", "Ju", "Vi")) {
            for (String timeString : timeStrings) {
                boolean found = false;
                HoraryResponse horaryGroupResponse= new HoraryResponse();
        
                for (Object[] row : objectList) {
                    Long laboratoriesId = (Long) row[0];
                    Date startHorary = (Date) row[1];
                    Date endHorary = (Date) row[2];
                    String subject = (String) row[3];
                    String rowDay = (String) row[4];
        
                    String startTimeString = sdf.format(startHorary);
        
                    if (timeString.equals(startTimeString) && day.equals(rowDay)) {
                        horaryGroupResponse.setHeader(laboratoryService.getLaboratoryById(laboratoriesId).get().getLabName());
                        horaryGroupResponse.setEnddate(endHorary);
                        horaryGroupResponse.setStartdate(startHorary);
                        horaryGroupResponse.setSubject(subject);
                        response.add(horaryGroupResponse);
                        found = true;
                        break;
                    }
                }
        
                if (!found) {
                    response.add(new HoraryResponse()); // Agregar un elemento en blanco
                }
            }
        }

        return response;
    }

    public List<HoraryResponse> getHoraryByLab(Long lab){
        List<Object[]> objectList = labHoraryRepository.getHoraryByLab(lab);
        List<HoraryResponse> response =  new ArrayList<>();;

        List<String> timeStrings = List.of("12:00:00", "14:00:00", "16:00:00", "18:00:00");
        
        List<Date> expectedTimes = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        for (String timeString : timeStrings) {
            try {
                Date time = sdf.parse(timeString);
                expectedTimes.add(time);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        for (String day : List.of("Lu", "Ma", "Mi", "Ju", "Vi")) {
            for (String timeString : timeStrings) {
                boolean found = false;
                HoraryResponse horaryGroupResponse= new HoraryResponse();
        
                for (Object[] row : objectList) {
                    String group = (String) row[0];
                    Date startHorary = (Date) row[1];
                    Date endHorary = (Date) row[2];
                    String subject = (String) row[3];
                    String rowDay = (String) row[4];
        
                    String startTimeString = sdf.format(startHorary);
        
                    if (timeString.equals(startTimeString) && day.equals(rowDay)) {
                        horaryGroupResponse.setHeader(group);
                        horaryGroupResponse.setEnddate(endHorary);
                        horaryGroupResponse.setStartdate(startHorary);
                        horaryGroupResponse.setSubject(subject);
                        response.add(horaryGroupResponse);
                        found = true;
                        break;
                    }
                }
        
                if (!found) {
                    response.add(new HoraryResponse()); // Agregar un elemento en blanco
                }
            }
        }

        return response;
    }
}
