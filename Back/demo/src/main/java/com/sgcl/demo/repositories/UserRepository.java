package com.sgcl.demo.repositories;

import com.sgcl.demo.models.UserVO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserVO, Long>{
    Optional<UserVO> findByEmailAndPassword(String email, String password);

    @Query(value = "SELECT * FROM users WHERE email = ?", nativeQuery = true)
    Optional<UserVO> findByEmail(String email);

    @Query(value = "SELECT role FROM users WHERE email = ?", nativeQuery = true)
    Optional<String> getRoleByEmail(String email);
}
