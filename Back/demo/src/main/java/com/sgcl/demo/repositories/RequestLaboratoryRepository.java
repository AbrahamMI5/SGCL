package com.sgcl.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.RequestLaboratoryVO;

@Repository
public interface RequestLaboratoryRepository extends JpaRepository<RequestLaboratoryVO, Long> {
    @Query(value = "SELECT * FROM request_laboratory WHERE status IS NULL AND users_id_users = ?", nativeQuery = true)
    Optional<List<RequestLaboratoryVO>> getRequestLabById(Long id);

    @Query(value = "SELECT * FROM request_laboratory WHERE status IS NULL", nativeQuery = true)
    Optional<List<RequestLaboratoryVO>> getRequestLabInProcess();

    @Query(value = "SELECT * FROM request_laboratory WHERE status IS NOT NULL", nativeQuery = true)
    Optional<List<RequestLaboratoryVO>> getRequestLabAnswered();
}
