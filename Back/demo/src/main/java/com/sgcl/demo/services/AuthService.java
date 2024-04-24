package com.sgcl.demo.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.UserVO;
import com.sgcl.demo.models.RequestModels.AuthResponse;
import com.sgcl.demo.models.RequestModels.LogInRequest;
import com.sgcl.demo.models.RequestModels.RegisterRequest;
import com.sgcl.demo.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LogInRequest request) {

        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        UserVO user = UserVO.builder()
                .userName(request.getUserName())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(request.getRole())
                .numberEmployee(request.getNumberEmployee())
                .idUsers(request.getIdUsers())
                .build();
        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}
