package com.sgcl.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sgcl.demo.models.NotificationVO;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationVO, Long> {
    @Query(value = "SELECT * FROM notifications WHERE users_id_users = ?1", nativeQuery = true)
    List<NotificationVO> findByUsersIdUsers(Long userId);
}
