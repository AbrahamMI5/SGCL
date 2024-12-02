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

import com.sgcl.demo.models.RequestServiceVO;
import com.sgcl.demo.models.RequestModels.ServiceResponse;
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
    public RequestServiceVO creaRequestService(@RequestBody RequestServiceVO requestServiceVO){
        return requestServService.createRequestServ(requestServiceVO);
    }

    @GetMapping("/getRequestServById{id}")
    public Optional<RequestServiceVO> getById(@PathVariable Long id){
        return requestServService.getById(id);
    }

    @GetMapping("/deleteRequestServ{id}")
    public Boolean deleteRequestService(@PathVariable Long id){
        return requestServService.deleteRequestServ(id);
    }

    @GetMapping("/getComputerService{id}")
    public List<RequestServiceVO> findComputerServiceById(@PathVariable Integer id) {
        return requestServService.findComputerServiceById(id);
    }

    @GetMapping("/getTechnologyService{id}")
    public List<RequestServiceVO> findTechnologyServiceById(@PathVariable Integer id) {
        return requestServService.findTechnologyServiceById(id);
    }
    
    @PostMapping("/setStatus")
    public RequestServiceVO setStatus(@RequestBody RequestServiceVO requestServiceVO){
        return requestServService.setStatus(requestServiceVO.getIdRequestService(), requestServiceVO.getRequestServiceStatus(), requestServiceVO.getRejection(), requestServiceVO.getAuthorizedName(), requestServiceVO.getAuthorizedEmail(), requestServiceVO.getAuthorizedArea(), requestServiceVO.getAuthorizedPosition());
    }

    @GetMapping("/getComputerWithStatus{idSemester}")
    public List<ServiceResponse> getComputerWithStatus(@PathVariable Integer idSemester) {
        return requestServService.findComputerServiceWithStatus(idSemester);
    }

    @GetMapping("/getComputerWithoutStatus{idSemester}")
    public List<ServiceResponse> getComputerWithoutStatus(@PathVariable Integer idSemester) {
        return requestServService.findComputerServiceWithoutStatus(idSemester);
    }

    @GetMapping("/getTechnologyWithStatus{idSemester}")
    public List<ServiceResponse> getTechnologyWithStatus(@PathVariable Integer idSemester) {
        return requestServService.findTechnologyServiceWithStatus(idSemester);
    }

    @GetMapping("/getTechnologyWithoutStatus{idSemester}")
    public List<ServiceResponse> getTechnologyWithoutStatus(@PathVariable Integer idSemester) {
        return requestServService.findTechnologyServiceWithoutStatus(idSemester);
    }
    

}
