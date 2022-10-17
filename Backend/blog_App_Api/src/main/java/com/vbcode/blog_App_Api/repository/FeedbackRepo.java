package com.vbcode.blog_App_Api.repository;

import com.vbcode.blog_App_Api.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepo extends JpaRepository<FeedBack,Integer> {

}
