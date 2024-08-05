package com.sgcl.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.SemesterVO;
import com.sgcl.demo.repositories.SemesterRepository;

@Service
public class SemesterService {

    @Autowired
    SemesterRepository semesterRepository;

    public SemesterVO getActiveSemester() {
        return semesterRepository.getActiveSemester().get();
    }

    public SemesterVO createSemester(SemesterVO semesterVO) {
        return semesterRepository.save(semesterVO);
    }

    public SemesterVO updateSemester(SemesterVO semesterVO) {
        SemesterVO semester = semesterRepository.findById(semesterVO.getIdSemester()).get();

        semester.setName(semesterVO.getName());
        semester.setStartDate(semesterVO.getStartDate());
        semester.setEndDate(semesterVO.getEndDate());

        return semesterRepository.save(semester);
    }

    public Boolean deleteSemester(Long id) {
        try {
            semesterRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public List<SemesterVO> getAllSemesters() {
        return semesterRepository.findAll();
    }

    public SemesterVO setActive(SemesterVO semesterVO) {
        // Recupera todos los semestres
        List<SemesterVO> semesters = semesterRepository.findAll();

        // Busca el semestre a activar
        SemesterVO foundSemester = semesterRepository.findById(semesterVO.getIdSemester())
                .orElseThrow(
                        () -> new NoSuchElementException("No element found with id: " + semesterVO.getIdSemester()));

        // Logica para activar el semestre
        if (foundSemester.getName().equals(semesterVO.getName())) {
            for (SemesterVO semestre : semesters) {
                if (!semestre.getName().equals(semesterVO.getName())) { // Asegúrate de que esto funcione según tu implementación de
                                                    // equals()
                    semestre.setIsActive(0); // Desactivar otros semestres
                } else {
                    semestre.setIsActive(1); // Activar el semestre actual
                }
            }
        } else {
            throw new NoSuchElementException("No matching semester found for: " + semesterVO.getName());
        }

        // Guardar todos los cambios
        semesterRepository.saveAll(semesters);
        return semesterRepository.getActiveSemester().get();
    }
}
