package com.sgcl.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.LaboratoryVO;
import com.sgcl.demo.repositories.LaboratoryRepository;

@Service
public class LaboratoryService {
    @Autowired
    LaboratoryRepository laboratoryRepository;

    public LaboratoryVO createLaboratory(LaboratoryVO laboratoryVO){
        return laboratoryRepository.save(laboratoryVO);
    }

    public List<LaboratoryVO> getLaboratories(){
        return (List<LaboratoryVO>) laboratoryRepository.findAll();
    }

    public Optional<LaboratoryVO> getLaboratoryById(long labId){
        return laboratoryRepository.findById(labId);
    }

    public LaboratoryVO updateLaboratoryById(LaboratoryVO request, Long labId){
        LaboratoryVO laboratory = laboratoryRepository.findById(labId).get();

        laboratory.setLabName(request.getLabName());

        return laboratoryRepository.save(laboratory);

    }

    public boolean deleteLaboratoryById(Long labId){
        try{
            laboratoryRepository.deleteById(labId);;
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

}
