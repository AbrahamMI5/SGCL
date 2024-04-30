package com.sgcl.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.RequestServiceVO;
import com.sgcl.demo.repositories.RequestServiceRepository;


@Service
public class RequestServService {
    @Autowired
    RequestServiceRepository requestServiceRepository;

    public List<RequestServiceVO> getAllRequestService(){
        return requestServiceRepository.findAll();
    }

    public Optional<RequestServiceVO> getById(Long id){
        return requestServiceRepository.findById(id);
    }

    public RequestServiceVO createRequestServ(RequestServiceVO requestServiceVO){
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

}
