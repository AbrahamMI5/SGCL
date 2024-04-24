package com.sgcl.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.LaboratoryVO;

@Repository
public interface LaboratoryRepository extends JpaRepository<LaboratoryVO, Long>{

}
