package com.sgcl.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.SemesterVO;
import com.sgcl.demo.services.SemesterService;


@RestController
@RequestMapping("/semester")

@CrossOrigin(origins = "*")
public class SemesterController {

    @Autowired
    private SemesterService semesterService;

    @GetMapping("/getAll")
    public List<SemesterVO> getAllSemesters(){
        return semesterService.getAllSemesters();
    }

    @PostMapping("/create")
    public SemesterVO createSemester(@RequestBody SemesterVO semesterVO){
        return semesterService.createSemester(semesterVO);
    }

    @GetMapping("/delete{id}")
    public Boolean getMethodName(@PathVariable long id) {
        return semesterService.deleteSemester(id);
    }

    @PostMapping("/setActive")
    public SemesterVO setActive(@RequestBody SemesterVO semesterVO){
        return semesterService.setActive(semesterVO);
    }

    @PostMapping("/update")
    public SemesterVO updateSemester(@RequestBody SemesterVO semesterVO){
        return semesterService.updateSemester(semesterVO);
    }
    
    

}
