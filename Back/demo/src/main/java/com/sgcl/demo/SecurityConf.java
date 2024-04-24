package com.sgcl.demo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sgcl.demo.JWT.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConf {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) 
    {
        try{
            return http
                .csrf(csrf -> 
                    csrf
                    .disable())
                .authorizeHttpRequests(authRequest -> 
                    authRequest
                    //Url everyone    
                    .requestMatchers("/laboratory/getAllLaboratories", "/login/", "/user/logIn", "/user/getRoleByEmail", "/user/getUserByEmail").permitAll()
                        //url admin
                         .requestMatchers("/**").hasAuthority("Admin")
                        //url teacher
                        .requestMatchers("/laboratory/getNotificationByIdUser{id}", "/notification/deleteNotificationById{id}",
                         "/requestLaboratory/createRequestLaboratory", "/requestLaboratory/deleteRequest{id}", "/requestLaboratory/getRequestLabByID{id}").hasAuthority("Teacher")
                        //url managerial
                        
                        .anyRequest().authenticated()
                        )
                .sessionManagement(sessionManagement ->
                sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
        }catch (Exception e){
            throw new RuntimeException("Error al construir el filtro de seguridad", e);
        }
        
    }
}
