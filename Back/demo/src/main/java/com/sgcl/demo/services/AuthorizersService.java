package com.sgcl.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.AuthorizersVO;
import com.sgcl.demo.repositories.AuthorizersRepository;

@Service
public class AuthorizersService {
    @Autowired
    AuthorizersRepository authorizersRepository;
    //Agregar id desde front dependiendo del cargo para controlar las inserciones
    public AuthorizersVO createOrUpdate(AuthorizersVO authorizersVO){
        if(authorizersRepository.existsById(authorizersVO.getIdAuthorizers())){
            AuthorizersVO authorizersVO2 = authorizersRepository.findById(authorizersVO.getIdAuthorizers()).get();
            authorizersVO2.setName(authorizersVO.getName());
            authorizersVO2.setEmail(authorizersVO.getEmail());
            authorizersVO2.setArea(authorizersVO.getArea());
            authorizersVO2.setPosition(authorizersVO.getPosition());
            return authorizersRepository.save(authorizersVO2);
        }else{
            return authorizersRepository.save(authorizersVO);
        }
    }
    public List<AuthorizersVO> getAll() {
        return authorizersRepository.findAll();
    }
}
