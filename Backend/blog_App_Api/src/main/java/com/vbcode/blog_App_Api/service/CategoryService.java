package com.vbcode.blog_App_Api.service;

import java.util.List;

import com.vbcode.blog_App_Api.payload.CategoryDto;


public interface CategoryService {

	CategoryDto createCategory(CategoryDto categoryDto);
	CategoryDto updateCategory(CategoryDto categoryDto,Integer cid);
	void deleteCategory(Integer cid);
	CategoryDto getCategory(Integer cid);
	List<CategoryDto> getAllCategory();
}
