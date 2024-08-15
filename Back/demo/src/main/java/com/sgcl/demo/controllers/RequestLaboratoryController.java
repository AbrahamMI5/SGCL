package com.sgcl.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.RequestLaboratoryVO;
import com.sgcl.demo.services.RequestLaboratoryService;


@RestController
@RequestMapping("/requestLaboratory")

@CrossOrigin(origins = "*")
public class RequestLaboratoryController {
    @Autowired
    private RequestLaboratoryService requestLaboratoryService;

    @GetMapping("/getAllRequestLaboratory")
    public List<RequestLaboratoryVO> getUser() {
        return this.requestLaboratoryService.getRequestLaboratories();
    }

    @PostMapping("/createRequestLaboratory")
    public RequestLaboratoryVO creaRequestLaboratory(@RequestBody RequestLaboratoryVO requestLaboratory){
        return this.requestLaboratoryService.createRequestLaboratory(requestLaboratory);
    }

    @GetMapping("/getRequest{id}")
    public Optional<RequestLaboratoryVO> getRequestLaboratoryByID(@PathVariable long id){
        return this.requestLaboratoryService.getRequestLaboratoryByID(id);
    }

    @PutMapping("/deleteRequest{id}")
    public String deleteRequestLaboratory(@PathVariable Long id){
        Boolean right = this.requestLaboratoryService.deleteRequest(id);
        if (right){
            return "RequestLaboratory "+ id+ " deleted";
        }else{
            return "Error to delete RequestLaboratory "+ id;
        }
    }

    @PutMapping("/updateRequestLab{id}")
    public RequestLaboratoryVO updateRequestLabBYId(@RequestBody RequestLaboratoryVO request, @PathVariable Long id) {
        return this.requestLaboratoryService.updateRequestById(request, id);
    }

    @GetMapping("/getRequestLabByID{id}")
    public Optional<List<RequestLaboratoryVO>> getRequestLabByID(@PathVariable Long id){
        return this.requestLaboratoryService.getRequestLabByID(id);
    }

    @GetMapping("/getRequestInProcess")
    public Optional<List<RequestLaboratoryVO>> getRequestInProcess() {
        return this.requestLaboratoryService.getRequestInProcess();
    }

    @GetMapping("/getRequestAnswered")
    public Optional<List<RequestLaboratoryVO>> getRequestAnswered() {
        return this.requestLaboratoryService.getRequestAnswered();
    }

    
}
