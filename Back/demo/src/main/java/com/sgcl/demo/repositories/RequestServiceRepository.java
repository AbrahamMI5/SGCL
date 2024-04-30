package com.sgcl.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.RequestServiceVO;

@Repository
public interface RequestServiceRepository extends JpaRepository<RequestServiceVO, Long> {

}
