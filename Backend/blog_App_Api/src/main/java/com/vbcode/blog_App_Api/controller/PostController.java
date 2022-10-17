package com.vbcode.blog_App_Api.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import com.vbcode.blog_App_Api.Pagination.PostResponse;
import com.vbcode.blog_App_Api.configure.AppConstant;
import com.vbcode.blog_App_Api.exception.ApiResponse;
import com.vbcode.blog_App_Api.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.vbcode.blog_App_Api.payload.PostDto;
import com.vbcode.blog_App_Api.service.PostService;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/api/v1")
public class PostController {

	@Autowired
	private PostService postService;
	@Autowired
	private FileService fileService;
	@Value("${project.image}")
	private String path;

	// create
	@PostMapping("/user/{userId}/category/{postCategoryID}/posts")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto, @PathVariable(name="userId") Integer userId,
			@PathVariable(name="postCategoryID") Integer categoryId) {
		PostDto createPost = this.postService.createPost(postDto, userId, categoryId);
		return new ResponseEntity<PostDto>(createPost, HttpStatus.CREATED);
	}

	// update Post
	@PutMapping("/posts/{postId}")
	public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto, @PathVariable("postId") Integer pid) {
		PostDto updatePost = this.postService.updatePost(postDto, pid);
		return new ResponseEntity<PostDto>(updatePost, HttpStatus.OK);
	}

	// Delete Post by Id
	@DeleteMapping("/posts/{postId}")
	//@PreAuthorize("hasAuthority('ADMIN_USER')")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable("postId") Integer pid) {
		this.postService.deletePost(pid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Deleted Successfully!!!", true), HttpStatus.OK);
	}

	// getAllPost
	@GetMapping("/posts")
	public ResponseEntity<PostResponse> getAllPost(
			@RequestParam(name = "pagenumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(name = "pagesize", defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(name = "sortby", defaultValue = AppConstant.SORT_BY, required = false) String sortBy,
			@RequestParam(name = "sortorder", defaultValue = AppConstant.SORT_ORDER, required = false) String sortOrder
	) {
		PostResponse postResponse = this.postService.getAllPost(pageNumber, pageSize, sortBy, sortOrder);
		return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
	}

	// getPostById
	@GetMapping("/posts/{postId}")
	public ResponseEntity<PostDto> getPostById(@PathVariable("postId") Integer pid) {
		PostDto postById = this.postService.getPostById(pid);
		return new ResponseEntity<PostDto>(postById, HttpStatus.OK);
	}

	// getByUser
	@GetMapping("/user/{userId}/posts")
	public ResponseEntity<PageImpl<PostDto>> getPostByUser(
			@PathVariable("userId") Integer userId,
			@RequestParam(name = "pagenumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(name = "pagesize", defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(name = "sortby", defaultValue = AppConstant.SORT_BY, required = false) String sortBy,
			@RequestParam(name = "sortorder", defaultValue = AppConstant.SORT_ORDER, required = false) String sortOrder
	) {
		PageImpl<PostDto> postsByUser = this.postService.getPostsByUser(userId,pageNumber,pageSize,sortBy,sortOrder);
		return new ResponseEntity<PageImpl<PostDto>>(postsByUser, HttpStatus.OK);
	}

	// getByCategory
	@GetMapping("/category/{categoryId}/posts")
	public ResponseEntity<List<PostDto>> getPostByCategory(@PathVariable("categoryId") Integer cid) {
		List<PostDto> postByCategory = this.postService.getPostByCategory(cid);
		return new ResponseEntity<List<PostDto>>(postByCategory, HttpStatus.OK);
	}


	// get Search Post By Keyword
	@GetMapping("/posts/search/{title}")
	public ResponseEntity<List<PostDto>> searchPostByKeyword(@PathVariable("title") String title) {
		List<PostDto> searchPost = this.postService.searchPost(title);
		return new ResponseEntity<List<PostDto>>(searchPost, HttpStatus.OK);
	}
	//Post Image Upload
	@PostMapping("/posts/image/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostImage(
			@RequestParam(name="image")MultipartFile image,
			@PathVariable Integer postId
	) throws IOException {
		PostDto postDto =this.postService.getPostById(postId);
		String filename = this.fileService.uploadImage(path,image);
		postDto.setImageName(filename);
		PostDto updatedPost=this.postService.updatePost(postDto,postId);
		return new ResponseEntity<PostDto>(updatedPost,HttpStatus.OK);
	}
	@GetMapping(value = "/posts/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
	public void  downloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws IOException {
		InputStream resource=this.fileService.getResource(path,imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource,response.getOutputStream());
	}



}
