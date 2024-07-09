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

import com.sgcl.demo.models.LaboratoryVO;
import com.sgcl.demo.services.LaboratoryService;

@RestController
@RequestMapping("/laboratory")

@CrossOrigin(origins = "*")
public class LaboratoryController {
    @Autowired
    private LaboratoryService laboratoryService;

    @GetMapping("/getAllLaboratories")
    public List<LaboratoryVO> getLaboratories() {
        return this.laboratoryService.getLaboratories();
    }

    @GetMapping("/getLaboratory{id}")
    public Optional<LaboratoryVO> getLaboratoryById(@PathVariable long id) {
        return this.laboratoryService.getLaboratoryById(id);
    }

    @PutMapping("/deleteLaboratory{id}")
    public String deleteLaboratoryById(@PathVariable long id) {
        Boolean right = this.laboratoryService.deleteLaboratoryById(id);
        if (right){
            return "Laboratory "+ id+ " deleted";
        }else{
            return "Error to delete labortory "+ id;
        }
    }

    @PutMapping("/updateLaboratory{id}")
    public LaboratoryVO updateLaboratoryBYId(@RequestBody LaboratoryVO request,@PathVariable Long id){
        return this.laboratoryService.updateLaboratoryById(request, id);
    }

    @PostMapping("/createLaboratory")
    public LaboratoryVO creaLaboratory(@RequestBody LaboratoryVO laboratory){
        return this.laboratoryService.createLaboratory(laboratory);
    }
}