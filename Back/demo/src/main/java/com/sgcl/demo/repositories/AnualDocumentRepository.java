package com.sgcl.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sgcl.demo.models.AnualDocVO;

public interface AnualDocumentRepository extends JpaRepository<AnualDocVO, Long> {
    @Query(value = "SELECT * FROM anual_document WHERE documents_id_documents = ?", nativeQuery = true)
    List<AnualDocVO> getAnualDocVOByDocument(Long iddocument);
}
