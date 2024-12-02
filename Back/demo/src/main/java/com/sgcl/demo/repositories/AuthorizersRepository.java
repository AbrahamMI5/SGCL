package com.sgcl.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgcl.demo.models.AuthorizersVO;

public interface AuthorizersRepository extends JpaRepository<AuthorizersVO, Long> {
}
