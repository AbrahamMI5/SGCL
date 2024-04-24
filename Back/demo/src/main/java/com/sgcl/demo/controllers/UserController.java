package com.sgcl.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.services.AuthService;
import com.sgcl.demo.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import com.sgcl.demo.models.UserVO;
import com.sgcl.demo.models.RequestModels.AuthResponse;
import com.sgcl.demo.models.RequestModels.EmailRequest;
import com.sgcl.demo.models.RequestModels.LogInRequest;
import com.sgcl.demo.models.RequestModels.RegisterRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor

@CrossOrigin(origins = "*")
public class UserController {

    private final AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("/getAllUser")
    public List<UserVO> getUser() {
        return this.userService.getUsers();
    }

    @PostMapping("/createUser")
    public ResponseEntity<AuthResponse> creaUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/getUser{id}")
    public Optional<UserVO> getUserByID(@PathVariable long id) {
        return this.userService.getUserByID(id);
    }

    @PutMapping("/updateUser{id}")
    public UserVO updateUserBYId(@RequestBody UserVO request, @PathVariable Long id) {
        return this.userService.updateUserById(request, id);
    }

    @PutMapping("/deleteUser{id}")
    public String deleteUserVO(@PathVariable Long id) {
        Boolean right = this.userService.deleteUser(id);
        if (right) {
            return "User " + id + " deleted";
        } else {
            return "Error to delete user " + id;
        }
    }

    @PostMapping("/logIn")
    public ResponseEntity<AuthResponse> login(@RequestBody LogInRequest request) {
        
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/getUserByEmail")
    public Optional<UserVO> getUserByEmail(@RequestBody EmailRequest email) {
        return this.userService.findByEmail(email);
    }

    @PostMapping("/getRoleByEmail")
    public Optional<String> getRoleByEmail(@RequestBody EmailRequest request) {
        return this.userService.getRoleByEmail(request);
    }
}
