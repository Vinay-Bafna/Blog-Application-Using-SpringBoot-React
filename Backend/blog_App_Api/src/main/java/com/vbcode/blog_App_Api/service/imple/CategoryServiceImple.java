package com.vbcode.blog_App_Api.service.imple;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbcode.blog_App_Api.entity.Category;
import com.vbcode.blog_App_Api.exception.ResourceNotFoundException;
import com.vbcode.blog_App_Api.payload.CategoryDto;
import com.vbcode.blog_App_Api.repository.CategoryRepo;
import com.vbcode.blog_App_Api.service.CategoryService;

@Service
public class CategoryServiceImple implements CategoryService {
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		Category categorysave = this.modelMapper.map(categoryDto,Category.class);
		Category saved = this.categoryRepo.save(categorysave);
		CategoryDto map = this.modelMapper.map(saved, CategoryDto.class);
		return map;
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer cid) {
		Category updatecategory = this.categoryRepo.findById(cid) .orElseThrow(()->new ResourceNotFoundException("Category", "Category-Id", cid));
		updatecategory.setTitle(categoryDto.getTitle());
		updatecategory.setDescription(categoryDto.getDescription());
		Category updated = this.categoryRepo.save(updatecategory);
		return this.modelMapper.map(updated, CategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer cid) {
		Category deletecategory = this.categoryRepo.findById(cid) .orElseThrow(()->new ResourceNotFoundException("Category", "Category-ID", cid));
		this.categoryRepo.delete(deletecategory);
	}

	@Override
	public CategoryDto getCategory(Integer cid) {
		Category foundcategory = this.categoryRepo.findById(cid) .orElseThrow(()->new ResourceNotFoundException("Category", "Category-ID", cid));
		return this.modelMapper.map(foundcategory, CategoryDto.class);
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> findAllCategory = this.categoryRepo.findAll();
		List<CategoryDto> categoryList = findAllCategory.stream().map(category->this.categoryToDto(category)).collect(Collectors.toList());
		return categoryList;
	}

	public CategoryDto categoryToDto(Category category) {
		return this.modelMapper.map(category, CategoryDto.class);
	}
}
