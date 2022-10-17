package com.vbcode.blog_App_Api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vbcode.blog_App_Api.exception.ApiResponse;
import com.vbcode.blog_App_Api.payload.CategoryDto;
import com.vbcode.blog_App_Api.service.imple.CategoryServiceImple;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
	@Autowired
	private CategoryServiceImple catservice;

	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto){
		CategoryDto createCategory = this.catservice.createCategory(categoryDto);
		return new ResponseEntity<CategoryDto>(createCategory,HttpStatus.CREATED);
	}
	
	@PutMapping("/{categoryID}")
	public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto,@PathVariable("categoryID") Integer ID){
		CategoryDto updateCategory = this.catservice.updateCategory(categoryDto, ID);	
		return new ResponseEntity<CategoryDto>(updateCategory,HttpStatus.OK);
	}
	
	@DeleteMapping("/{cid}")
	@PreAuthorize("hasAuthority('ADMIN_USER')")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer cid){
		this.catservice.deleteCategory(cid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Deleted Successfully !!",true),HttpStatus.OK);
	}
	
	
	@GetMapping("/{cid}")
	public ResponseEntity<CategoryDto> getCategory(@PathVariable Integer cid){
		CategoryDto category = this.catservice.getCategory(cid);	 
		return new ResponseEntity<CategoryDto>(category,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> getAllCategory(){
		List<CategoryDto> allCategory = this.catservice.getAllCategory();
		return new ResponseEntity<List<CategoryDto>>(allCategory,HttpStatus.OK);
	}
	
}
