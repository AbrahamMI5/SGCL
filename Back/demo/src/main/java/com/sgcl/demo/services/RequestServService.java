package com.sgcl.demo.services;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.RequestServiceVO;
import com.sgcl.demo.models.RequestModels.ServiceResponse;
import com.sgcl.demo.repositories.LaboratoryRepository;
import com.sgcl.demo.repositories.RequestServiceRepository;
import com.sgcl.demo.repositories.UserRepository;

@Service
public class RequestServService {
    @Autowired
    RequestServiceRepository requestServiceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LaboratoryRepository laboratoryRepository;

    @Autowired
    SemesterService semesterService;

    public List<RequestServiceVO> getAllRequestService() {
        return requestServiceRepository.findAll();
    }

    public Optional<RequestServiceVO> getById(Long id) {
        return requestServiceRepository.findById(id);
    }

    public RequestServiceVO createRequestServ(RequestServiceVO requestServiceVO) {
        requestServiceVO.setRequestDate(new Date(System.currentTimeMillis()));
        requestServiceVO.setSemesterIdSemester(semesterService.getActiveSemester().getIdSemester());
        return requestServiceRepository.save(requestServiceVO);
    }

    public Boolean deleteRequestServ(Long id) {
        try {
            requestServiceRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public List<RequestServiceVO> findComputerServiceById(Integer id) {
        return requestServiceRepository.findComputerServiceById(id);
    }

    public List<RequestServiceVO> findTechnologyServiceById(Integer id) {
        return requestServiceRepository.findTechnologyServiceById(id);
    }

    public RequestServiceVO setStatus(Long id, Long status, String rejection, String authName, String authEmail, String authArea, String authPosition) {
        RequestServiceVO requestServiceVO = requestServiceRepository.findById(id).get();
        if (status == 1){
            requestServiceVO.setAnswerDate(new Date(System.currentTimeMillis()));
        }
        if (status == 2 || status == 3){
            if(requestServiceVO.getAnswerDate()==null){
                requestServiceVO.setAnswerDate(new Date(System.currentTimeMillis()));
            }
            requestServiceVO.setFinishDate(new Date(System.currentTimeMillis()));
        }
        requestServiceVO.setRequestServiceStatus(status);
        requestServiceVO.setRejection(rejection);
        requestServiceVO.setAuthorizedName(authName);
        requestServiceVO.setAuthorizedEmail(authEmail);
        requestServiceVO.setAuthorizedArea(authArea);
        requestServiceVO.setAuthorizedPosition(authPosition);

        return requestServiceRepository.save(requestServiceVO);
    }

    public List<ServiceResponse> findComputerServiceWithoutStatus(Integer idSemester) {
        List<RequestServiceVO> requestservice = new ArrayList<>();
        List<ServiceResponse> requestServiceresponse = new ArrayList<>();
        requestservice = requestServiceRepository.findComputerServiceWithoutStatus(idSemester);

        for (RequestServiceVO requestServiceVO : requestservice) {
            ServiceResponse serviceResponse = new ServiceResponse();
            serviceResponse.setApplicantArea(requestServiceVO.getApplicantArea());
            serviceResponse.setAuthorizedArea(requestServiceVO.getAuthorizedArea());
            serviceResponse.setAuthorizedEmail(requestServiceVO.getAuthorizedEmail());
            serviceResponse.setAuthorizedName(requestServiceVO.getAuthorizedName());
            serviceResponse.setAuthorizedPosition(requestServiceVO.getAuthorizedPosition());
            serviceResponse.setBasicFunction(requestServiceVO.getBasicFunction());
            serviceResponse.setIdRequestService(requestServiceVO.getIdRequestService());
            serviceResponse.setLabName(requestServiceVO.getLabName());
            if (requestServiceVO.getLaboratoriesIdLaboratories() != null) {
                serviceResponse.setLaboratoriesIdLaboratories(
                        laboratoryRepository.findById(requestServiceVO.getLaboratoriesIdLaboratories().longValue()));
            }
            serviceResponse.setObservations(requestServiceVO.getObservations());
            serviceResponse.setPosition(requestServiceVO.getPosition());
            serviceResponse.setReciverArea(requestServiceVO.getReciverArea());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverName(requestServiceVO.getReciverName());
            serviceResponse.setReciverPosition(requestServiceVO.getReciverPosition());
            serviceResponse.setRejection(requestServiceVO.getRejection());
            serviceResponse.setRequestServiceStatus(requestServiceVO.getRequestServiceStatus());
            serviceResponse.setSpecialFunction(requestServiceVO.getSpecialFunction());
            serviceResponse.setUsersIdUsers(userRepository.findById(requestServiceVO.getUsersIdUsers().longValue()));
            requestServiceresponse.add(serviceResponse);
        }

        return requestServiceresponse;
    }

    public List<ServiceResponse> findComputerServiceWithStatus(Integer idSemester) {
        List<RequestServiceVO> requestservice = new ArrayList<>();
        List<ServiceResponse> requestServiceresponse = new ArrayList<>();
        requestservice = requestServiceRepository.findComputerServiceWithStatus(idSemester);

        for (RequestServiceVO requestServiceVO : requestservice) {
            ServiceResponse serviceResponse = new ServiceResponse();
            serviceResponse.setApplicantArea(requestServiceVO.getApplicantArea());
            serviceResponse.setAuthorizedArea(requestServiceVO.getAuthorizedArea());
            serviceResponse.setAuthorizedEmail(requestServiceVO.getAuthorizedEmail());
            serviceResponse.setAuthorizedName(requestServiceVO.getAuthorizedName());
            serviceResponse.setAuthorizedPosition(requestServiceVO.getAuthorizedPosition());
            serviceResponse.setBasicFunction(requestServiceVO.getBasicFunction());
            serviceResponse.setIdRequestService(requestServiceVO.getIdRequestService());
            serviceResponse.setLabName(requestServiceVO.getLabName());
            if (requestServiceVO.getLaboratoriesIdLaboratories() != null) {
                serviceResponse.setLaboratoriesIdLaboratories(
                        laboratoryRepository.findById(requestServiceVO.getLaboratoriesIdLaboratories().longValue()));
            }
            serviceResponse.setObservations(requestServiceVO.getObservations());
            serviceResponse.setPosition(requestServiceVO.getPosition());
            serviceResponse.setReciverArea(requestServiceVO.getReciverArea());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverName(requestServiceVO.getReciverName());
            serviceResponse.setReciverPosition(requestServiceVO.getReciverPosition());
            serviceResponse.setRejection(requestServiceVO.getRejection());
            serviceResponse.setRequestServiceStatus(requestServiceVO.getRequestServiceStatus());
            serviceResponse.setSpecialFunction(requestServiceVO.getSpecialFunction());
            serviceResponse.setUsersIdUsers(userRepository.findById(requestServiceVO.getUsersIdUsers().longValue()));
            requestServiceresponse.add(serviceResponse);
        }

        return requestServiceresponse;
    }

    public List<ServiceResponse> findTechnologyServiceWithoutStatus(Integer idSemester) {
        List<RequestServiceVO> requestservice = new ArrayList<>();
        List<ServiceResponse> requestServiceresponse = new ArrayList<>();
        requestservice = requestServiceRepository.findTechnologyServiceWithoutStatus(idSemester);

        for (RequestServiceVO requestServiceVO : requestservice) {
            ServiceResponse serviceResponse = new ServiceResponse();
            serviceResponse.setApplicantArea(requestServiceVO.getApplicantArea());
            serviceResponse.setAuthorizedArea(requestServiceVO.getAuthorizedArea());
            serviceResponse.setAuthorizedEmail(requestServiceVO.getAuthorizedEmail());
            serviceResponse.setAuthorizedName(requestServiceVO.getAuthorizedName());
            serviceResponse.setAuthorizedPosition(requestServiceVO.getAuthorizedPosition());
            serviceResponse.setBasicFunction(requestServiceVO.getBasicFunction());
            serviceResponse.setIdRequestService(requestServiceVO.getIdRequestService());
            serviceResponse.setLabName(requestServiceVO.getLabName());
            if (requestServiceVO.getLaboratoriesIdLaboratories() != null) {
                serviceResponse.setLaboratoriesIdLaboratories(
                        laboratoryRepository.findById(requestServiceVO.getLaboratoriesIdLaboratories().longValue()));
            }
            serviceResponse.setObservations(requestServiceVO.getObservations());
            serviceResponse.setPosition(requestServiceVO.getPosition());
            serviceResponse.setReciverArea(requestServiceVO.getReciverArea());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverName(requestServiceVO.getReciverName());
            serviceResponse.setReciverPosition(requestServiceVO.getReciverPosition());
            serviceResponse.setRejection(requestServiceVO.getRejection());
            serviceResponse.setRequestServiceStatus(requestServiceVO.getRequestServiceStatus());
            serviceResponse.setSpecialFunction(requestServiceVO.getSpecialFunction());
            serviceResponse.setUsersIdUsers(userRepository.findById(requestServiceVO.getUsersIdUsers().longValue()));
            requestServiceresponse.add(serviceResponse);
        }

        return requestServiceresponse;
    }

    public List<ServiceResponse> findTechnologyServiceWithStatus(Integer idSemester) {
        List<RequestServiceVO> requestservice;
        List<ServiceResponse> requestServiceresponse = new ArrayList<>();
        requestservice = requestServiceRepository.findTechnologyServiceWithStatus(idSemester);

        for (RequestServiceVO requestServiceVO : requestservice) {
            ServiceResponse serviceResponse = new ServiceResponse();
            serviceResponse.setApplicantArea(requestServiceVO.getApplicantArea());
            serviceResponse.setAuthorizedArea(requestServiceVO.getAuthorizedArea());
            serviceResponse.setAuthorizedEmail(requestServiceVO.getAuthorizedEmail());
            serviceResponse.setAuthorizedName(requestServiceVO.getAuthorizedName());
            serviceResponse.setAuthorizedPosition(requestServiceVO.getAuthorizedPosition());
            serviceResponse.setBasicFunction(requestServiceVO.getBasicFunction());
            serviceResponse.setIdRequestService(requestServiceVO.getIdRequestService());
            serviceResponse.setLabName(requestServiceVO.getLabName());
            if (requestServiceVO.getLaboratoriesIdLaboratories() != null) {
                serviceResponse.setLaboratoriesIdLaboratories(
                        laboratoryRepository.findById(requestServiceVO.getLaboratoriesIdLaboratories().longValue()));
            }
            serviceResponse.setObservations(requestServiceVO.getObservations());
            serviceResponse.setPosition(requestServiceVO.getPosition());
            serviceResponse.setReciverArea(requestServiceVO.getReciverArea());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverEmail(requestServiceVO.getReciverEmail());
            serviceResponse.setReciverName(requestServiceVO.getReciverName());
            serviceResponse.setReciverPosition(requestServiceVO.getReciverPosition());
            serviceResponse.setRejection(requestServiceVO.getRejection());
            serviceResponse.setRequestServiceStatus(requestServiceVO.getRequestServiceStatus());
            serviceResponse.setSpecialFunction(requestServiceVO.getSpecialFunction());
            serviceResponse.setUsersIdUsers(userRepository.findById(requestServiceVO.getUsersIdUsers().longValue()));
            requestServiceresponse.add(serviceResponse);
        }

        return requestServiceresponse;
    }

}