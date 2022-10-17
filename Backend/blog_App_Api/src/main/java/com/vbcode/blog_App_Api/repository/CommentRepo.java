package com.vbcode.blog_App_Api.repository;

import com.vbcode.blog_App_Api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vbcode.blog_App_Api.entity.Comments;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comments, Integer> {
    @Query("select c from Comments c where c.user LIKE :key")
    List<Comments> findAllCommentWithUserID(@Param("key") User user);

}
