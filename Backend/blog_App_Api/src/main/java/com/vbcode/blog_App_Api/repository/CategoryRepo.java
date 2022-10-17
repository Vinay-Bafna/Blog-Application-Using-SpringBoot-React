package com.vbcode.blog_App_Api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbcode.blog_App_Api.entity.Category;

public interface CategoryRepo extends JpaRepository<Category,Integer>{

}
