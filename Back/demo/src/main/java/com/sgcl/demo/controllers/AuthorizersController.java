package com.sgcl.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.AuthorizersVO;
import com.sgcl.demo.services.AuthorizersService;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/authorizers")

@CrossOrigin(origins = "*")
public class AuthorizersController {
    @Autowired
    private AuthorizersService authorizersService;

    @PostMapping("/createUpdate")
    public AuthorizersVO updateOrCreate(@RequestBody AuthorizersVO authorizersVO){
        return authorizersService.createOrUpdate(authorizersVO);
    }

    @GetMapping("/getAll")
    public List<AuthorizersVO> getAll(){
        return authorizersService.getAll();
    }
}
