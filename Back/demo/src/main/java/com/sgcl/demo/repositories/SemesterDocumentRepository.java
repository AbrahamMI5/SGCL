package com.sgcl.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sgcl.demo.models.SemesterDocVO;

public interface SemesterDocumentRepository extends JpaRepository<SemesterDocVO, Long> {
@Query(value = "SELECT * FROM semester_document WHERE documents_id = ?", nativeQuery = true)
    List<SemesterDocVO> getSemesterDocVOByDocument(Long iddocument);
}
