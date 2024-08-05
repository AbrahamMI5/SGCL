package com.sgcl.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.SemesterVO;

@Repository
public interface SemesterRepository extends JpaRepository<SemesterVO, Long>{

    @Query(value = "SELECT * FROM `semester` WHERE is_active = 1", nativeQuery = true)
    Optional<SemesterVO> getActiveSemester();
}
