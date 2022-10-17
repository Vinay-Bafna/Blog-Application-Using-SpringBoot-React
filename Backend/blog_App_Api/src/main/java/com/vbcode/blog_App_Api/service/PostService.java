package com.vbcode.blog_App_Api.service;

import java.util.List;

import org.springframework.data.domain.PageImpl;

import com.vbcode.blog_App_Api.Pagination.PostResponse;
import com.vbcode.blog_App_Api.payload.PostDto;


public interface PostService {
	
	//create
	PostDto createPost(PostDto post,Integer userId,Integer categoryId);
	
	//update
	PostDto updatePost(PostDto post,Integer pid);
	
	//delete
	
	void deletePost(Integer pid);
	
	// GET ALL post 
	PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);
	
	//get postbyId
	PostDto getPostById(Integer pid);
	
	//get all post by category
	
	List<PostDto> getPostByCategory(Integer categoryId);
	
	//get all post by user
	PageImpl<PostDto> getPostsByUser(Integer userId,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);
	
	//Search Post
	List<PostDto> searchPost(String keyword);


	
}
