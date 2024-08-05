package com.sgcl.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.RequestLaboratoryVO;

@Repository
public interface RequestLaboratoryRepository extends JpaRepository<RequestLaboratoryVO, Long> {
    @Query(value = "SELECT * FROM request_laboratory WHERE status IS NULL AND users_id_users = ? AND semester_id_semester = ?", nativeQuery = true)
    Optional<List<RequestLaboratoryVO>> getRequestLabById(Long id, Long semesterId);

    @Query(value = "SELECT * FROM request_laboratory WHERE status IS NULL AND semester_id_semester = ?", nativeQuery = true)
    Optional<List<RequestLaboratoryVO>> getRequestLabInProcess(Long semesterId);

    @Query(value = "SELECT * FROM request_laboratory WHERE status IS NOT NULL AND semester_id_semester = ?", nativeQuery = true)
    Optional<List<RequestLaboratoryVO>> getRequestLabAnswered(Long semesterId);
}
