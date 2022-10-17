package com.vbcode.blog_App_Api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vbcode.blog_App_Api.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

		Optional<User> findByEmail(String Email);
		
}
