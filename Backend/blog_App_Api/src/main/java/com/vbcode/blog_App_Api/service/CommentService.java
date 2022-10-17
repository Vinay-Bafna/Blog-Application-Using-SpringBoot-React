package com.vbcode.blog_App_Api.service;


import com.vbcode.blog_App_Api.payload.CommentDto;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public interface CommentService {

		CommentDto createComment(CommentDto commentDto, Integer pid,Integer uid);
		
		void deleteComment(Integer cid);

		List<CommentDto> getAllCommentByUser(Integer userid);
}
