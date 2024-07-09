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
                .authorizeHttpRequests(authorize -> 
                authorize
                    //Url everyone    
                    .requestMatchers("/laboratory/getAllLaboratories", "/login/", "/user/logIn", "/user/getRoleByEmail", "/user/getUserByEmail", "/labHorary/*").permitAll()
                    //Url Admin, Teacher, Managerial
                    .requestMatchers("/**").hasAnyAuthority("Admin", "Teacher", "Managerial")
                    //Url Admin, Teacher

                    //Url Admin


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
