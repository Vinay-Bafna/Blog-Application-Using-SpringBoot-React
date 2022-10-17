package com.vbcode.blog_App_Api.service.imple;

import com.vbcode.blog_App_Api.entity.User;
import com.vbcode.blog_App_Api.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vbcode.blog_App_Api.entity.Comments;
import com.vbcode.blog_App_Api.entity.Post;
import com.vbcode.blog_App_Api.exception.ResourceNotFoundException;
import com.vbcode.blog_App_Api.payload.CommentDto;
import com.vbcode.blog_App_Api.repository.CommentRepo;
import com.vbcode.blog_App_Api.repository.PostRepo;
import com.vbcode.blog_App_Api.service.CommentService;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImple implements CommentService {

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CommentRepo commentRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer pid,Integer uid) {
		Post postfind = this.postRepo.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "Post_Id", pid));
		User user = this.userRepo.findById(uid).orElseThrow(() -> new ResourceNotFoundException("User", "UID", 404));
		Comments com = this.modelMapper.map(commentDto, Comments.class);
		com.setUser(user);
		com.setCommentPostDate(new Date());
		com.setPost(postfind);
		Comments saveCommentOnPost = this.commentRepo.save(com);
		return this.modelMapper.map(saveCommentOnPost, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer cid) {
		Comments deletecommentforuser = this.commentRepo.findById(cid)
				.orElseThrow(() -> new ResourceNotFoundException("Comment", "Comment_Id", cid));
		this.commentRepo.delete(deletecommentforuser);
		
	}



	@Override
	public List<CommentDto> getAllCommentByUser(Integer userid) {

		User user = this.userRepo.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User", "UserID", userid));
		List<Comments> allCommentWithUserID = this.commentRepo.findAllCommentWithUserID(user);
		List<CommentDto> collect = allCommentWithUserID.stream().map(comments -> this.modelMapper.map(comments, CommentDto.class)).collect(Collectors.toList());
		return collect;
	}


}
