package com.sgcl.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.RequestServiceVO;
import com.sgcl.demo.services.RequestServService;

@RestController
@RequestMapping("/requestService")

@CrossOrigin(origins = "*")
public class RequestServiceController {

    @Autowired
    private RequestServService requestServService;

    @GetMapping("/getAllRequestServ")
    public List<RequestServiceVO> getAll(){
        return requestServService.getAllRequestService();
    }

    @PostMapping("/createRequestServ")
    public RequestServiceVO creaRequestService(RequestServiceVO requestServiceVO){
        return requestServService.createRequestServ(requestServiceVO);
    }

    @GetMapping("/getRequestServById")
    public Optional<RequestServiceVO> getById(Long id){
        return requestServService.getById(id);
    }

    @GetMapping("/deleteRequestServ")
    public Boolean deleteRequestService(Long id){
        return requestServService.deleteRequestServ(id);
    }

}
