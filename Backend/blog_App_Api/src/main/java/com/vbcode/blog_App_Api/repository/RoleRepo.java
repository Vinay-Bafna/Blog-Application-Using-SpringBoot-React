package com.vbcode.blog_App_Api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vbcode.blog_App_Api.entity.Role;
public interface RoleRepo extends JpaRepository<Role,Integer> {

}
