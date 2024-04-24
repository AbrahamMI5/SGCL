package com.sgcl.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.RequestLaboratoryVO;
import com.sgcl.demo.repositories.RequestLaboratoryRepository;

@Service
public class RequestLaboratoryService {
    @Autowired
    RequestLaboratoryRepository requestLaboratoryRepository;

    public List<RequestLaboratoryVO> getRequestLaboratories(){
        return (List<RequestLaboratoryVO>) requestLaboratoryRepository.findAll();
    }

    public RequestLaboratoryVO createRequestLaboratory(RequestLaboratoryVO requestLaboratoryVO){
        return requestLaboratoryRepository.save(requestLaboratoryVO);
    }

    public Optional<RequestLaboratoryVO> getRequestLaboratoryByID(long id){
        return requestLaboratoryRepository.findById(id);
    }

    public Boolean deleteRequest(Long id){
        try{
            requestLaboratoryRepository.deleteById(id);;
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

    public RequestLaboratoryVO updateRequestById(RequestLaboratoryVO request, Long id) {
        RequestLaboratoryVO requestLab = requestLaboratoryRepository.findById(id).get();

        requestLab.setrRejection(request.getrRejection());
        requestLab.setStatus(request.getStatus());

        return requestLaboratoryRepository.save(requestLab);
    }

    public Optional<List<RequestLaboratoryVO>> getRequestLabByID(long id){
        return requestLaboratoryRepository.getRequestLabById(id);
    }

    
}
