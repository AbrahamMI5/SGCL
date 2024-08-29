package com.sgcl.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sgcl.demo.models.AnualDocVO;
import com.sgcl.demo.models.DatesVO;

public interface DatesRepository extends JpaRepository<DatesVO, Long>{
    @Query(value = "SELECT * FROM date_anual_doc WHERE id_anual_doc = ?", nativeQuery = true)
    List<DatesVO> getDatesByAnualDocumentId(Long anualId);
}
