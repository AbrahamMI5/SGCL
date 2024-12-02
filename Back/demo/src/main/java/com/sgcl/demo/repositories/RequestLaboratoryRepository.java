package com.sgcl.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    // Número de peticiones por laboratorio por semestre
    @Query(value = "SELECT COUNT(*) FROM request_laboratory JOIN semester ON request_laboratory.semester_id_semester = semester.id_semester WHERE request_laboratory.laboratories_id_laboratories = :labId AND semester.id_semester = :semesterId", nativeQuery = true)
    Integer countPeticionesByLaboratoryAndSemester(@Param("labId") Long labId, @Param("semesterId") Long semesterId);

    // Horas de uso por laboratorio por semana
    @Query(value = "SELECT COUNT(*)*2 FROM lab_horary JOIN request_laboratory ON request_laboratory.id_request_laboratory = lab_horary.request_laboratory_id_request_laboratory WHERE request_laboratory.semester_id_semester = :semesterId AND request_laboratory.laboratories_id_laboratories = :labId AND lab_horary.deleted_at IS NULL", nativeQuery = true)
    Integer countHorasDeUsoByLaboratoryAndSemester(@Param("labId") Long labId, @Param("semesterId") Long semesterId);

    // Asistentes semestrales por laboratorio
    @Query(value = "SELECT SUM(request_laboratory.student_number) * CEIL(DATEDIFF(LEAST(IFNULL(lab_horary.deleted_at, semester.end_date), semester.end_date), GREATEST(lab_horary.create_at, semester.start_date)) / 7) AS Asistentes_Semestrales FROM lab_horary JOIN request_laboratory ON request_laboratory.id_request_laboratory = lab_horary.request_laboratory_id_request_laboratory JOIN semester ON request_laboratory.semester_id_semester = semester.id_semester WHERE request_laboratory.semester_id_semester = :semesterId AND request_laboratory.laboratories_id_laboratories = :labId AND lab_horary.create_at <= semester.end_date AND (lab_horary.deleted_at IS NULL OR lab_horary.deleted_at >= semester.start_date)", nativeQuery = true)
    Integer countAsistentesSemanalesByLaboratoryAndSemester(@Param("labId") Long labId,
            @Param("semesterId") Long semesterId);

    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM request_laboratory JOIN lab_horary ON request_laboratory.id_request_laboratory = lab_horary.request_laboratory_id_request_laboratory WHERE request_laboratory.id_request_laboratory = ? AND lab_horary.deleted_at IS NOT NULL", nativeQuery = true)
    Integer isDeleted(@Param("idRequestLaboratory") Long idRequestLaboratory);


}
