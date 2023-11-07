package com.poly.application.repository;

import com.poly.application.entity.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelineRepository extends JpaRepository<TimeLine, Long> {
}
