package com.vbcode.blog_App_Api.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.vbcode.blog_App_Api.entity.Category;
import com.vbcode.blog_App_Api.entity.Post;
import com.vbcode.blog_App_Api.entity.User;

public interface PostRepo extends JpaRepository<Post, Integer> {

	
	//return list of post created by User
	List<Post> findByUser(User user);
	
	//return list of post for particular category
	List<Post> findByCategory(Category category);
	

	
	@Query("select p from Post p where p.title LIKE :key")
	List<Post> searchByKeyword(@Param("key") String title);
	
	
	
}
