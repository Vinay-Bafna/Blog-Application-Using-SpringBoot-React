package com.vbcode.blog_App_Api.service.imple;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.vbcode.blog_App_Api.entity.Comments;
import com.vbcode.blog_App_Api.repository.CommentRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.vbcode.blog_App_Api.Pagination.PostResponse;
import com.vbcode.blog_App_Api.entity.Category;
import com.vbcode.blog_App_Api.entity.Post;
import com.vbcode.blog_App_Api.entity.User;
import com.vbcode.blog_App_Api.exception.ResourceNotFoundException;
import com.vbcode.blog_App_Api.payload.PostDto;
import com.vbcode.blog_App_Api.repository.CategoryRepo;
import com.vbcode.blog_App_Api.repository.PostRepo;
import com.vbcode.blog_App_Api.repository.UserRepo;
import com.vbcode.blog_App_Api.service.PostService;

import org.springframework.data.domain.Sort;

@Service
public class PostServiceImple implements PostService {

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CommentRepo commentRepo;
	@Override
	public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {

		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "Category Id", categoryId));
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));
		Post post = this.modelMapper.map(postDto, Post.class);
		post.setImageName(null);
		post.setAddedDate(new Date());
		post.setCategory(category);
		post.setUser(user);
		Post postcreated = this.postRepo.save(post);
		return this.modelMapper.map(postcreated, PostDto.class);
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer pid) {
		Post postToBeUpdate = this.postRepo.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "Post Id", pid));

		Category category = this.categoryRepo.findById(postDto.getCategory().getCategoryId()).get();
		postToBeUpdate.setTitle(postDto.getTitle());
		postToBeUpdate.setContent(postDto.getContent());
		postToBeUpdate.setImageName(postDto.getImageName());
		postToBeUpdate.setCategory(category);
		Post updatedPost = this.postRepo.save(postToBeUpdate);

		return this.modelMapper.map(updatedPost, PostDto.class);
	}

	@Override
	public void deletePost(Integer pid) {
		Post deletePost = this.postRepo.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "Post Id", pid));
		this.postRepo.delete(deletePost);
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

		Sort sort = null;

		// Using Ternary Operator In Java
		sort = (sortOrder.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		// Create a New Unsorted PageRequest.
		PageRequest p = PageRequest.of(pageNumber, pageSize, sort);

		// Returns a Page Of Entiries Metting The Paging Restriction Provided In The
		// Pageable Object.
		Page<Post> pagePost = this.postRepo.findAll(p);

		// Method Returns The Page Content As List.
		List<Post> pagePostContent = pagePost.getContent();
		List<PostDto> postToDto = pagePostContent.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());

		PostResponse pos = new PostResponse();
		pos.setContent(postToDto);
		pos.setPageNumber(pagePost.getNumber());
		pos.setPageSize(pagePost.getSize());
		pos.setTotoalElements(pagePost.getTotalElements());
		pos.setTotalPages(pagePost.getTotalPages());
		pos.setLastPage(pagePost.isLast());

		return pos;

//		List<Post> allpost = this.postRepo.findAll();
//		List<PostDto> postDtos = allpost.stream().map((post)->this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
//		return postDtos;

	}

	public PostDto postToDto(Post post) {
		return this.modelMapper.map(post, PostDto.class);
	}

	@Override
	public PostDto getPostById(Integer pid) {
		Post post = this.postRepo.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "Post ID", pid));
		return this.modelMapper.map(post, PostDto.class);
	}

	@Override
	public List<PostDto> getPostByCategory(Integer categoryId) {
		Category cats = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "Category Id", categoryId));
		List<Post> byCategory = this.postRepo.findByCategory(cats);
		List<PostDto> postDtos = byCategory.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public PageImpl<PostDto> getPostsByUser(Integer userId, Integer pageNumber, Integer pageSize, String sortBy,
			String sortOrder) {

		Sort sort = null;

		// Using Ternary Operator In Java
		sort = (sortOrder.equalsIgnoreCase("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

		User userdetails = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User ID", userId));

		List<Post> postsOfUser = this.postRepo.findByUser(userdetails);
		List<PostDto> collectPostsByUser = postsOfUser.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());

		PageRequest p = PageRequest.of(pageNumber, pageSize, sort);
		long total = collectPostsByUser.size();
		PageImpl<PostDto> pageImpl = new PageImpl<>(collectPostsByUser, p, total);
		return pageImpl;
//------------------------------------------------------------------------------------------------		
//		User userdetails = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "User ID", userId));
//		List<Post> findByUserDetails = this.postRepo.findByUser(userdetails);
//		List<PostDto> collectPostsByUser = findByUserDetails.stream().map((post)->this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
//		return collectPostsByUser;

	}

	@Override
	public List<PostDto> searchPost(String title) {
		List<Post> posts = this.postRepo.searchByKeyword("%" + title + "%");
		List<PostDto> collectpost = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		return collectpost;
	}

}
