package com.sgcl.demo.models.RequestModels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private Long idUsers ;
    private String userName;
    private int numberEmployee;
    private String email;
    private String password;
    private String role;
}
