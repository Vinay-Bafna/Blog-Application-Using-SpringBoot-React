package com.vbcode.blog_App_Api.controller;

import com.vbcode.blog_App_Api.configure.AppConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.vbcode.blog_App_Api.exception.ApiResponse;
import com.vbcode.blog_App_Api.payload.CommentDto;
import com.vbcode.blog_App_Api.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

	@Autowired
	private CommentService commentservice;

	@PostMapping("/user/{userId}/post/{postId}/comment")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,
			@PathVariable("postId") Integer pid, @PathVariable("userId") Integer userId) {

		CommentDto createdComment = this.commentservice.createComment(commentDto, pid,userId);

		return new ResponseEntity<CommentDto>(createdComment, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/comment/{commentID}")
//	@PreAuthorize("hasAuthority('NORMAL_USER')")
	public ResponseEntity<ApiResponse> deleteComment(@PathVariable("commentID") Integer cid) {
		this.commentservice.deleteComment(cid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Delete Successfully", true), HttpStatus.OK);
	}

	@GetMapping("/comments/{userId}")
	public  ResponseEntity<List<CommentDto>> getAllCommentByUser(
			@PathVariable(name = "userId") Integer userId
		){
		List<CommentDto> commentslist = this.commentservice.getAllCommentByUser(userId);
		return new ResponseEntity<>( commentslist,HttpStatus.OK);
	}


}
