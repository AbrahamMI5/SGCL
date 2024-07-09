package com.sgcl.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sgcl.demo.models.LabHoraryVO;

public interface LabHoraryRepository extends JpaRepository<LabHoraryVO, Long>{
    @Query(value = "SELECT DISTINCT groups FROM lab_horary JOIN request_laboratory ON request_laboratory_id_request_laboratory = id_request_laboratory;", nativeQuery = true)
    List<String> getClassrooms();

    @Query(value = "SELECT DISTINCT laboratories_id_laboratories, start_horary, end_horary, subject, day FROM lab_horary JOIN request_laboratory ON request_laboratory_id_request_laboratory = id_request_laboratory WHERE groups = ?", nativeQuery = true)
    List<Object[]> getHoraryByGroup(String group);
    
    @Query(value = "SELECT DISTINCT groups, start_horary, end_horary, subject, day FROM lab_horary JOIN request_laboratory ON request_laboratory_id_request_laboratory = id_request_laboratory WHERE laboratories_id_laboratories = ?", nativeQuery = true)
    List<Object[]> getHoraryByLab(Long lab);
    
}
