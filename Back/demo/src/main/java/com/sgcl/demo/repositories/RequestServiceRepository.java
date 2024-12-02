package com.sgcl.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.RequestServiceVO;

@Repository
public interface RequestServiceRepository extends JpaRepository<RequestServiceVO, Long> {
    @Query(value = "SELECT * FROM request_service WHERE users_id_users = ? AND laboratories_id_laboratories IS NULL", nativeQuery = true)
    List<RequestServiceVO> findComputerServiceById(Integer id);

    @Query(value = "SELECT * FROM request_service WHERE users_id_users = ? AND laboratories_id_laboratories IS NOT NULL", nativeQuery = true)
    List<RequestServiceVO> findTechnologyServiceById(Integer id);

    @Query(value = "SELECT * FROM request_service WHERE laboratories_id_laboratories IS NULL AND (request_service_status IS NULL OR request_service_status = 1 OR request_service_status = 0) AND semester_id_semester = ?", nativeQuery = true)
    List<RequestServiceVO> findComputerServiceWithoutStatus(Integer idSemester);
    
    @Query(value = "SELECT * FROM request_service WHERE laboratories_id_laboratories IS NULL AND (request_service_status = 2 OR request_service_status = 3) AND semester_id_semester = ?", nativeQuery = true)
    List<RequestServiceVO> findComputerServiceWithStatus(Integer idSemester);
    
    @Query(value = "SELECT * FROM request_service WHERE laboratories_id_laboratories IS NOT NULL AND (request_service_status IS NULL OR request_service_status = 1 OR request_service_status = 0) AND semester_id_semester = ?", nativeQuery = true)
    List<RequestServiceVO> findTechnologyServiceWithoutStatus(Integer idSemester);
    
    @Query(value = "SELECT * FROM request_service WHERE laboratories_id_laboratories IS NOT NULL AND (request_service_status = 2 OR request_service_status =  3) AND semester_id_semester = ?", nativeQuery = true)
    List<RequestServiceVO> findTechnologyServiceWithStatus(Integer idSemester);

}
