package com.sgcl.demo.services;

import com.sgcl.demo.models.UserVO;
import com.sgcl.demo.models.RequestModels.EmailRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

import com.sgcl.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<UserVO> getUsers() {
        return (List<UserVO>) userRepository.findAll();
    }

    public UserVO createUser(UserVO teacherVO) {
        return userRepository.save(teacherVO);
    }

    public Optional<UserVO> getUserByID(long id) {
        return userRepository.findById(id);
    }

    public UserVO updateUserById(UserVO request, Long id) {
        UserVO teacher = userRepository.findById(id).get();

        teacher.setUserName(request.getUserName());
        teacher.setEmail(request.getEmail());
        teacher.setNumberEmployee(request.getNumberEmployee());
        if(request.getPassword().length() != 60){
            teacher.setPassword(passwordEncoder.encode(request.getPassword()));
        }else{
            teacher.setPassword(request.getPassword());
        }
        teacher.setRole(request.getRole());

        return userRepository.save(teacher);

    }

    public Boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public Optional<UserVO> getUserLogIn(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Optional<UserVO> findByEmail(EmailRequest email) {
        return userRepository.findByEmail(email.getEmail());
    }

    public Optional<String> getRoleByEmail(EmailRequest request) {
        System.out.print(request.getEmail());
        return userRepository.getRoleByEmail(request.getEmail());
    }

}
