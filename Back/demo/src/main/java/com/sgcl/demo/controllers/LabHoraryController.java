package com.sgcl.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.RequestModels.HoraryResponse;
import com.sgcl.demo.services.LabHoraryService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/labHorary")

@CrossOrigin(origins = "*")
public class LabHoraryController {
    
    @Autowired
    LabHoraryService labHoraryService;

    @GetMapping("/getClassrooms")
    public List<String> getClassrooms(){
        return this.labHoraryService.getClassrooms();
    }

    @GetMapping("/getByGroup{group}")
    public List<HoraryResponse> getMethodName(@PathVariable String group) {
        return this.labHoraryService.getHoraryByGroup(group);
    }

    @GetMapping("/getByLab{lab}")
    public List<HoraryResponse> getMethodName(@PathVariable Long lab) {
        return this.labHoraryService.getHoraryByLab(lab);
    }
    
}