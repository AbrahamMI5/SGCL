package com.sgcl.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgcl.demo.models.DocumentVO;

public interface DocumentRepository extends JpaRepository<DocumentVO, Long>{

}
